import React from "react";
import styled from "styled-components";
import ListingHeader from "./ListingHeader";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isEmpty, isLoaded } from "react-redux-firebase";
import DescriptionList from "./DescriptionList";

class ListingBody extends React.Component {
  state = {
    isEditing: false,
    description: this.props.listing.description,
    location: this.props.listing.location,
    position: this.props.listing.position
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  editDescription = e => {
    let newArray = this.state.description;
    newArray[e.target.id] = e.target.value;
    this.setState({ description: newArray });
  };
  render() {
    return (
      <StyledListingBody>
        <ListingHeader position={this.props.listing.position} />
        {!this.state.isEditing ? (
          <p>{this.props.listing.position}</p>
        ) : (
          <input value={this.state.position} onChange={this.onChangeHandler} name="position" placeholder="Position" />
        )}
        {!this.state.isEditing ? (
          <p>{this.props.listing.location}</p>
        ) : (
          <input value={this.state.location} onChange={this.onChangeHandler} name="location" placeholder="Location" />
        )}
        {/* {!this.state.isEditing &&
          this.props.listing.description.map((desc, idx) => (
            <DescriptionList isEditing={this.state.isEditing} desc={desc} id={idx} key={idx} />
          ))} */}
        {/* {this.state.isEditing &&
          this.state.description.map((desc, idx) => (
            <DescriptionList isEditing={this.state.isEditing} desc={desc} id={idx} key={idx} />
          ))} */}
        <button onClick={() => this.setState({ isEditing: true })}>Edit</button>
      </StyledListingBody>
    );
  }
}

const StyledListingBody = styled.div`
  min-height: 100vh;
  background: white;
  width: 100%;
`;

const mapStateToProps = state => {
  return {
    listing: state.firestore.ordered.currentListing ? state.firestore.ordered.currentListing[0] : ""
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    clearFirestore: () => dispatch({ type: "@@reduxFirestore/CLEAR_DATA" })
  });
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => {
    return [
      {
        collection: "jobListings",
        doc: `${props.id}`,
        storeAs: "currentListing"
      }
    ];
  })
)(ListingBody);
