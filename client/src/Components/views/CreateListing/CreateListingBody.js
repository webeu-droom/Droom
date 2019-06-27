import React from "react";
import styled from "styled-components";
import CreateListingHeader from "./CreateListingHeader";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, firebaseConnect } from "react-redux-firebase";
import uuid from "uuid";

class CreateListingBody extends React.Component {
  state = {
    position: "",
    location: "",
    description: ["None"],
    requirements: ["None"]
  };
  addDescription = () => {
    this.setState(st => ({ description: [...st.description, "None other description"] }));
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
    this.setState(st => ({ requirements: [...st.requirements, "None other requirements"] }));
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
        likedCandidates: [],
        notlikedCandidates: []
      })
      .then(() => {
        console.log("It is working");
      });
  };

  render() {
    return (
      <StyledMatchBody>
        <CreateListingHeader />
        <div>
          <input name="position" onChange={this.onChangeHandler} placeholder="Position" />
          <input name="location" onChange={this.onChangeHandler} placeholder="Location" />
          {this.state.description.map((desc, idx) => (
            <input
              key={idx}
              name="description"
              value={desc}
              id={idx}
              onChange={this.arrayChange}
              placeholder="Description"
            />
          ))}
          <button onClick={this.addDescription}>Add description</button>
          {this.state.requirements.map((req, idx) => (
            <input
              key={idx}
              name="requirements"
              value={req}
              id={idx}
              onChange={this.arrayChange}
              placeholder="Requirements"
            />
          ))}
          <button onClick={this.addRequirements}>Add Requirements</button>
          <button onClick={this.createListing}>Create Listing</button>
        </div>
      </StyledMatchBody>
    );
  }
}

const StyledMatchBody = styled.div`
  min-height: 100vh;
  background: white;
  width: 100%;
`;

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    company: state.firestore.ordered.currentCompany ? state.firestore.ordered.currentCompany[0] : ""
  };
};

const dispatchStateToProps = dispatch => {
  return bindActionCreators({
    clearFirestore: () => dispatch({ type: "@@reduxFirestore/CLEAR_DATA" })
  });
};

export default compose(
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
)(CreateListingBody);
