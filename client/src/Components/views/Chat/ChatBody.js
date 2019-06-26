import React, { useState } from "react";
import styled from "styled-components";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { firestoreConnect, firebaseConnect } from "react-redux-firebase";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import {
  slate_grey,
  black,
  blue,
  white
} from "../../~reusables/variables/colors";
import {
  medium_space_1,
  small_space,
  extra_small_space
} from "../../~reusables/variables/spacing";
import { button_text, body_hero } from "../../~reusables/variables/font-sizes";
import { source_sans_pro } from "../../~reusables/variables/font-family";

const ChatBody = props => {
  const [textMessage, setTextMessage] = useState("");
  // props passed from firestore and route
  const matchId = props.match.params.id;
  let messages;

  if (props.messages) {
    messages = Object.values(props.messages);
    messages.sort((x, y) => {
      return x.createdAt.seconds - y.createdAt.seconds;
    });
  }

  let userOrCompId;
  if (props.company) {
    userOrCompId = props.company.id;
  } else if (props.user) {
    userOrCompId = props.user.id;
  }

  const sendMessage = () => {
    if (textMessage) {
      const ref = props.firestore.collection("messages");
      ref.add({
        createdAt: new Date(),
        createdById: userOrCompId,
        matchId: matchId,
        messageBody: textMessage
      });
    }
  };

  return (
    <StyledListingBody>
      <ChatHeader />
      <div className="chat-window">
        <div className="messages">
          {props.messages &&
            messages.map((message, idx) => {
              return (
                <ChatMessage
                  key={idx}
                  isUser={message.createdById === userOrCompId}
                  message={message.messageBody}
                />
              );
            })}
        </div>
        <div
          className="message-input"
          value={textMessage}
          onChange={e => setTextMessage(e.target.value)}
        >
          <input placeholder="Type your message here..." />
          <div onClick={sendMessage}>
            <i className="material-icons">send</i>
          </div>
        </div>
      </div>
    </StyledListingBody>
  );
};

const StyledListingBody = styled.div`
  min-height: 100vh;
  background: white;
  width: 100%;

  .chat-window {
    height: 75vh;
    border: 1px solid ${slate_grey};
    border-radius: 8px;
    margin: ${medium_space_1};
  }

  .messages {
    height: 80%;
    padding: ${small_space};
    overflow: scroll;
  }

  .message-input {
    height: 12%;
    margin: 0 ${small_space} 0 ${small_space};
    border-top: 1px solid ${slate_grey};
    display: flex;
    align-items: center;

    input {
      outline: none;
      font-size: ${button_text};
      font-family: ${source_sans_pro};
      height: 40px;
      width: 100%;
      font-size: 16px;
      color: ${black};
      border: none;
      background: transparent;
    }

    > div {
      margin-left: ${extra_small_space};
      box-shadow: 0px 1px 5px rgba(151, 162, 185, 0.2),
        0px 3px 4px rgba(151, 162, 185, 0.12),
        0px 2px 4px rgba(151, 162, 185, 0.14);
      border-radius: 50%;
      background-color: ${blue};
      padding: ${extra_small_space};
      cursor: pointer;

      i {
        font-size: ${body_hero};
        color: ${white};
        vertical-align: -15%;
        text-align: center;
      }
    }
  }

  @media only screen and (max-width: 500px) {
    .chat-window {
      border: none;
      margin: ${extra_small_space};
    }

    .messages {
      height: 95%;
      padding: ${extra_small_space};
    }

    .message-input {
      background-color: ${white};
      bottom: 0;
      position: fixed;
      width: 95%;
      margin: 0;
      z-index: 10;
    }
  }
`;

const mapStateToProps = state => {
  return {
    messages: state.firestore.ordered.messages,
    user: state.firestore.ordered.currentUser
      ? state.firestore.ordered.currentUser[0]
      : "",
    company: state.firestore.ordered.currentCompany
      ? state.firestore.ordered.currentCompany[0]
      : "",
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      clearFirestore: () => dispatch({ type: "@@reduxFirestore/CLEAR_DATA" })
    },
    dispatch
  );
};

export default withRouter(
  compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    firebaseConnect(),
    firestoreConnect(props => {
      return [
        {
          collection: "messages",
          where: ["matchId", "==", `${props.match.params.id}`],
          storeAs: "messages"
        },
        {
          collection: "users",
          where: ["userEmail", "==", `${props.auth.email}`],
          storeAs: "currentUser"
        },
        {
          collection: "companies",
          where: ["companyEmail", "==", `${props.auth.email}`],
          storeAs: "currentCompany"
        }
      ];
    })
  )(ChatBody)
);
