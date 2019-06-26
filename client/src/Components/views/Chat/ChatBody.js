import React from "react";
import styled from "styled-components";
import ChatHeader from "./ChatHeader";
import { slate_grey, black, blue, white } from "../../~reusables/variables/colors";
import {
  medium_space_1,
  small_space,
  extra_small_space
} from "../../~reusables/variables/spacing";
import { body_1, button_text, body_hero } from "../../~reusables/variables/font-sizes";
import { source_sans_pro } from "../../~reusables/variables/font-family";

const ChatBody = () => {
  return (
    <StyledListingBody>
      <ChatHeader />
      <div className="chat-window">
        <div className="messages" />
        <div className="message-input">
          <input placeholder="Type your message here..." />
          <div>
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
    height: 600px;
    border: 1px solid ${slate_grey};
    border-radius: 8px;
    margin: ${medium_space_1};
  }

  .messages {
    height: 540px;
  }

  .message-input {
    height: 60px;
    margin: 0 ${small_space};
    border-top: 1px solid ${slate_grey};

    display: flex;
    align-items: center;

    input {
      font-size: ${button_text};
      font-family: ${source_sans_pro};
      height: 40px;
      width: 100%;
      font-size: 16px;
      color: ${slate_grey};
      border: none;
    }

    > div {
      margin-left: ${extra_small_space};
      box-shadow: 0px 1px 5px rgba(151, 162, 185, 0.2), 0px 3px 4px rgba(151, 162, 185, 0.12), 0px 2px 4px rgba(151, 162, 185, 0.14);
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
`;

export default ChatBody;
