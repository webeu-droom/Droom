import React from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, firebaseConnect } from "react-redux-firebase";
import uuid from "uuid";

class CreateListing extends React.Component {
  state = {
    position: "",
    location: "",
    description: ["None"]
  };
  addDescription = () => {
    this.setState(st => ({ description: [...st.description, "None"] }));
  };
  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  descriptionChange = e => {
    let newArray = this.state.description;
    console.log(newArray);
    newArray[e.target.id] = e.target.value;
    this.setState({ description: newArray });
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
        likedCandidates: [],
        notlikedCandidates: []
      })
      .then(() => {
        console.log("It is working");
      });
  };
  render() {
    console.log(this.state.description);
    return (
      <div>
        <input name="position" onChange={this.onChangeHandler} placeholder="Position" />
        <input name="location" onChange={this.onChangeHandler} placeholder="Location" />
        {this.state.description.map((desc, idx) => (
          <input
            key={idx}
            name="description"
            value={desc}
            id={idx}
            onChange={this.descriptionChange}
            placeholder="Description"
          />
        ))}
        <button onClick={this.addDescription}>Add description</button>
        <button onClick={this.createListing}>Create Listing</button>
      </div>
    );
  }
}

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
)(CreateListing);
