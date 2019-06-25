import React from "react";
import { isEmpty, firestoreConnect, withFirestore } from "react-redux-firebase";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";
import ExperienceField from "./ExperienceField";
import { medium_space_1 } from "../~reusables/variables/spacing";
import { ButtonSecondary, ButtonPrimary, TextButton } from "../~reusables/atoms/Buttons";

class UserProfilePage extends React.Component {
  state = {
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
          location: this.state.location,
          biography: this.state.biography,
          education: this.state.education
        })
        .then(() => this.setState({ editingProfile: false }));
    } else {
      this.setState({ error: "Please fill out everything" });
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
        {!this.state.editingProfile ? (
          <p>{this.props.user.name}</p>
        ) : (
          <input
            value={this.state.name}
            onChange={this.onChangeHandler}
            placeholder="Your name"
            name="name"
          />
        )}
        {!this.state.editingProfile ? (
          <p>{this.props.user.title}</p>
        ) : (
          <input
            value={this.state.title}
            onChange={this.onChangeHandler}
            placeholder="Your title"
            name="title"
          />
        )}
        {this.state.experience.map((ex, idx) => (
          <ExperienceField
            editingProfile={this.state.editingProfile}
            ex={ex}
            key={idx}
            id={idx}
            saveExperience={this.saveExperience}
          />
        ))}
        <TextButton onClick={this.addExperience}>Add Experience</TextButton>
        {!this.state.editingProfile ? (
          <p>{this.props.user.location}</p>
        ) : (
          <input
            value={this.state.location}
            onChange={this.onChangeHandler}
            placeholder="Your location"
            name="location"
          />
        )}
        {!this.state.editingProfile ? (
          <p>{this.props.user.biography}</p>
        ) : (
          <input
            value={this.state.biography}
            onChange={this.onChangeHandler}
            placeholder="Your biography"
            name="biography"
          />
        )}
        {!this.state.editingProfile ? (
          <p>{this.props.user.education}</p>
        ) : (
          <input
            value={this.state.education}
            onChange={this.onChangeHandler}
            placeholder="Your education"
            name="education"
          />
        )}
        <ButtonSecondary onClick={() => this.setState({ editingProfile: true })}>
          Edit
        </ButtonSecondary>
        <ButtonPrimary onClick={this.updateHandler}>Save changes</ButtonPrimary>
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
`;
