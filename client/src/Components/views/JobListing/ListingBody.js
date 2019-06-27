import React from "react";
import styled from "styled-components";
import ListingHeader from "./ListingHeader";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isEmpty, isLoaded } from "react-redux-firebase";
import DescriptionList from "../../JobListing/DescriptionList";
import RequitementList from "../../JobListing/RequitementList";

class ListingBody extends React.Component {
  state = {
    isEditing: "",
    position: "",
    description: [],
    location: "",
    requirements: ""
  };
  onChangeHandler = e => {
    if (!this.state.location) {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
  componentDidMount() {
    if (isLoaded(this.props.listing) && !isEmpty(this.props.listing)) {
      this.setState({ listing: this.props.listing });
    }
  }
  updateListing = e => {
    let item = {
      requirements: this.state.requirements,
      location: this.state.location,
      position: this.state.position,
      description: this.state.description
    };
    let ref = this.props.firestore.collection("jobListings").doc(this.props.listing.id);
    ref
      .update({
        item
      })
      .then(() => {
        this.setState({ isEditing: false });
      });
  };

  editProfile = e => {
    e.preventDefault();
    let { location, description, requirements, position } = this.props.listing;
    this.setState({ location, description, requirements, position, isEditing: true });
  };
  editArray = e => {
    let newArray = this.state[e.target.name];
    newArray[e.target.id] = e.target.value;
    console.log(newArray);
    this.setState({ [e.target.name]: newArray });
  };
  render() {
    if (!isLoaded(this.props.listing) || isEmpty(this.props.listing)) {
      return <h1>Loading...</h1>;
    } else if (isLoaded(this.props.listing) && isEmpty(this.props.listing)) {
      return <h1>404 Not found</h1>;
    }
    return (
      <StyledListingBody>
        <ListingHeader position={this.state.position} />
        {!this.state.isEditing ? (
          <p>{this.props.listing.position}</p>
        ) : (
          <input
            // defaultValue={this.props.listing.position}
            value={this.state.position}
            onChange={this.onChangeHandler}
            name="position"
            placeholder="Position"
          />
        )}
        {!this.state.isEditing ? (
          <p>{this.props.listing.location}</p>
        ) : (
          <input
            value={this.props.listing.location}
            onChange={this.onChangeHandler}
            name="location"
            placeholder="Location"
          />
        )}
        {this.props.listing.description.map((desc, idx) => (
          <DescriptionList
            desc={desc}
            id={idx}
            stateDesc={this.state.description}
            isEditing={this.state.isEditing}
            editDescription={this.editArray}
          />
        ))}
        {this.props.listing.requirements.map((req, idx) => (
          <RequitementList
            req={req}
            id={idx}
            stateReq={this.state.requirements}
            isEditing={this.state.isEditing}
            editRequirements={this.editArray}
          />
        ))}
        <button onClick={this.editProfile}>Edit</button>
        <button onClick={this.updateListing}>Save</button>
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
