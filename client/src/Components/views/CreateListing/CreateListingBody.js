import React from "react";
import styled from "styled-components";
import CreateListingHeader from "./CreateListingHeader";
import { withRouter } from "react-router-dom";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, firebaseConnect } from "react-redux-firebase";
import uuid from "uuid";
import { ButtonPrimary, TextButton } from "../../~reusables/atoms/Buttons";
import {
  medium_space_1,
  small_space,
  medium_space_2,
  medium_space_3
} from "../../~reusables/variables/spacing";
import { source_sans_pro } from "../../~reusables/variables/font-family";
import { body_1 } from "../../~reusables/variables/font-sizes";
import { black, slate_grey } from "../../~reusables/variables/colors";
import { tablet_max_width } from "../../~reusables/variables/media-queries";
import { Input } from "../../~reusables/atoms/Inputs";

class CreateListingBody extends React.Component {
  state = {
    position: "",
    location: "",
    description: ["None"],
    requirements: ["None"]
  };
  addDescription = () => {
    this.setState(st => ({
      description: [...st.description, "None other description"]
    }));
  };
  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  arrayChange = e => {
    let newArray = this.state[e.target.name];
    newArray[e.target.id] = e.target.value;
    this.setState({ [e.target.name]: newArray });
  };

  addRequirements = () => {
    this.setState(st => ({
      requirements: [...st.requirements, "None other requirements"]
    }));
  };

  createListing = e => {
    e.preventDefault();
    let id = uuid();
    let ref = this.props.firestore.collection("jobListings").doc(id);
    ref
      .set({
        position: this.state.position,
        location: this.state.location,
        description: this.state.description,
        companyId: this.props.company.id,
        requirements: this.state.requirements,
        likedUser: [],
        dislikedUser: []
      })
      .then(() => {
        console.log("It is working");
      });
    this.props.history.push("/profile");
  };

  render() {
    return (
      <StyledMatchBody>
        <CreateListingHeader />
        <div className="body">
          <section>
            <p className="label">Position</p>
            <Input
              name="position"
              onChange={this.onChangeHandler}
              placeholder="Position"
            />
            {this.state.description.map((desc, idx) => (
              <>
                <p className="label">Description {idx + 1}</p>
                <Input
                  key={idx}
                  name="description"
                  value={desc}
                  id={idx}
                  onChange={this.arrayChange}
                  placeholder="Description"
                />
              </>
            ))}
            <TextButton onClick={this.addDescription}>
              Add description
            </TextButton>
          </section>
          <section className="right">
            <p className="label">Location</p>
            <Input
              name="location"
              onChange={this.onChangeHandler}
              placeholder="Location"
            />
            {this.state.requirements.map((req, idx) => (
              <>
                <p className="label">Requirement {idx + 1}</p>
                <Input
                  key={idx}
                  name="requirements"
                  value={req}
                  id={idx}
                  onChange={this.arrayChange}
                  placeholder="Requirements"
                />
              </>
            ))}
            <TextButton onClick={this.addRequirements}>
              Add Requirements
            </TextButton>
            <div className="listing-button">
              <ButtonPrimary onClick={this.createListing}>
                Create Listing
              </ButtonPrimary>
            </div>
          </section>
        </div>
      </StyledMatchBody>
    );
  }
}

const StyledMatchBody = styled.div`
  min-height: 100vh;
  background: white;
  width: 100%;

  .body {
    margin: ${medium_space_1};
    display: flex;
    justify-content: space-between;

    section {
      width: 50%;
      flex-grow: 1;
      margin-right: ${small_space};
    }

    p.divider {
      padding-bottom: ${small_space};
      border-bottom: 1px solid #eaeaea;
    }

    .right {
      margin-left: ${medium_space_3};
    }

    .edit {
      margin-right: ${small_space};
      margin-bottom: ${small_space};
    }

    .text-button {
      margin-bottom: ${medium_space_1};
    }

    .listing-button {
      margin-top: ${medium_space_1};
    }

    .logout-button-mobile {
      display: none;
    }

    p {
      line-height: ${medium_space_1};
      font-family: ${source_sans_pro};
      font-size: ${body_1};
      color: ${black};
    }

    .label {
      margin-bottom: ${small_space};
      line-height: 0;
      color: ${slate_grey};
      font-size: ${body_1};
    }

    @media only screen and (max-width: ${tablet_max_width}) {
      .logout-button-mobile {
        display: block;
        margin-top: ${small_space};
      }
    }

    @media only screen and (max-width: 600px) {
      flex-direction: column;

      section {
        width: 95%;
      }

      .right {
        margin-left: 0;
      }
    }
  }
`;

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    company: state.firestore.ordered.currentCompany
      ? state.firestore.ordered.currentCompany[0]
      : ""
  };
};

const dispatchStateToProps = dispatch => {
  return bindActionCreators({
    clearFirestore: () => dispatch({ type: "@@reduxFirestore/CLEAR_DATA" })
  });
};

export default withRouter(
  compose(
    connect(
      mapStateToProps,
      dispatchStateToProps
    ),
    firebaseConnect(),
    firestoreConnect(props => {
      return [
        {
          collection: "companies",
          where: ["companyEmail", "==", `${props.auth.email}`],
          storeAs: "currentCompany"
        }
      ];
    })
  )(CreateListingBody)
);
