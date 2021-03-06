import React from "react";
import { isEmpty, firestoreConnect, withFirestore } from "react-redux-firebase";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";
import Popup from "../../~reusables/components/Popup";
import ExperienceField from "./ExperienceField";
import {
  medium_space_1,
  medium_space_3,
  small_space,
} from "../../~reusables/variables/spacing";
import {
  ButtonSecondary,
  ButtonPrimary,
  TextButton,
  ButtonTertiary
} from "../../~reusables/atoms/Buttons";
import { Input } from "../../~reusables/atoms/Inputs";
import { source_sans_pro } from "../../~reusables/variables/font-family";
import { body_1 } from "../../~reusables/variables/font-sizes";
import { black, slate_grey } from "../../~reusables/variables/colors";
import { tablet_max_width } from "../../~reusables/variables/media-queries";

class UserProfilePage extends React.Component {
  state = {
    showPopup: false,
    editingProfile: false,
    name: this.props.user.name,
    title: this.props.user.title,
    experience:
      this.props.user.experience.length > 0
        ? this.props.user.experience
        : ["None"],
    location: this.props.user.location,
    biography: this.props.user.biography,
    education: this.props.user.education
  };
  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };

  componentDidMount() {
    if (isEmpty(this.props.user.title)) {
      this.setState({ editingProfile: true });
    }
  }

  changeExperienceField = e => {};

  updateHandler = e => {
    if (
      this.state.name &&
      this.state.title &&
      (this.state.experience.length > 0 &&
        this.state.location &&
        this.state.biography &&
        this.state.education)
    ) {
      const ref = this.props.firestore
        .collection("users")
        .doc(this.props.user.id);
      ref
        .update({
          name: this.state.name,
          title: this.state.title,
          experience: this.state.experience,
          location: this.state.location,
          biography: this.state.biography,
          education: this.state.education
        })
        .then(() => this.setState({ editingProfile: false }));
    } else {
      this.setState({ error: "Please fill out everything" });
      this.togglePopup();
    }
  };

  addExperience = () => {
    this.setState(st => ({ experience: [...st.experience, "None"] }));
  };

  saveExperience = e => {
    let oldArray = this.state.experience;
    oldArray[e.target.id] = e.target.value;
    this.setState({ experience: oldArray });
  };
  render() {
    return (
      <StyledCandidate>
        <section>
          <p className="label">Name</p>
          {!this.state.editingProfile ? (
            <p className="divider">{this.props.user.name}</p>
          ) : (
            <Input
              value={this.state.name}
              onChange={this.onChangeHandler}
              placeholder="Your name"
              name="name"
            />
          )}
          <p className="label">Title</p>
          {!this.state.editingProfile ? (
            <p className="divider">{this.props.user.title}</p>
          ) : (
            <Input
              value={this.state.title}
              onChange={this.onChangeHandler}
              placeholder="Your title"
              name="title"
            />
          )}
          {this.state.experience.map((ex, idx) => (
            <>
              <p className="label">Experience {idx + 1}</p>
              <ExperienceField
                editingProfile={this.state.editingProfile}
                ex={ex}
                key={idx}
                id={idx}
                saveExperience={this.saveExperience}
              />
            </>
          ))}
          <TextButton className="text-button" onClick={this.addExperience}>
            Add Experience
          </TextButton>
        </section>
        {this.state.showPopup ? (
          <Popup text={this.state.error} closePopup={this.togglePopup} />
        ) : null}
        <section className="right">
          <p className="label">Location</p>
          {!this.state.editingProfile ? (
            <p className="divider">{this.props.user.location}</p>
          ) : (
            <Input
              value={this.state.location}
              onChange={this.onChangeHandler}
              placeholder="Your location"
              name="location"
            />
          )}
          <p className="label">Biography</p>
          {!this.state.editingProfile ? (
            <p className="divider">{this.props.user.biography}</p>
          ) : (
            <Input
              value={this.state.biography}
              onChange={this.onChangeHandler}
              placeholder="Your biography"
              name="biography"
            />
          )}
          <p className="label">Education</p>
          {!this.state.editingProfile ? (
            <p className="divider">{this.props.user.education}</p>
          ) : (
            <Input
              value={this.state.education}
              onChange={this.onChangeHandler}
              placeholder="Your education"
              name="education"
            />
          )}
          <ButtonSecondary
            className="edit"
            onClick={() => this.setState({ editingProfile: true })}
          >
            Edit
          </ButtonSecondary>
          <ButtonPrimary onClick={this.updateHandler}>
            Save changes
          </ButtonPrimary>
          <ButtonTertiary
            className="logout-button-mobile"
            onClick={this.props.handleLogout}
          >
            Log out
          </ButtonTertiary>
        </section>
      </StyledCandidate>
    );
  }
}

const mapStateToProps = state => {
  return {
    jobListings: state.firestore.ordered.jobListings
      ? state.firestore.ordered.jobListings
      : ""
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

export default compose(
  withFirestore,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect()
)(UserProfilePage);

const StyledCandidate = styled.div`
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
    margin-bottom: ${small_space};
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
`;
