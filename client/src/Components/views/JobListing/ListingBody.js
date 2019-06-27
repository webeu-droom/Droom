import React from "react";
import styled from "styled-components";
import ListingHeader from "./ListingHeader";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isEmpty, isLoaded } from "react-redux-firebase";
import DescriptionList from "../../JobListing/DescriptionList";

class ListingBody extends React.Component {
  state = {
    isEditing: false
  };
  onChangeHandler = e => {
    if (!this.state.location) {
      this.setState({ [e.target.name]: e.target.value });
    }

    // this.setState({ [e.target.name]: item });
  };
  componentDidMount() {
    if (isLoaded(this.props.listing) && !isEmpty(this.props.listing)) {
      this.setState({ listing: this.props.listing });
    }
  }
  editDescription = e => {
    console.log(e.target);
  };
  render() {
    if (!isLoaded(this.props.listing) || isEmpty(this.props.listing)) {
      return <h1>Loading...</h1>;
    } else if (isLoaded(this.props.listing) && isEmpty(this.props.listing)) {
      return <h1>404 Not found</h1>;
    }
    let list = [];
    for (let i = 0; i < this.props.listing.description.length; i++) {}
    console.log(list);
    return (
      <StyledListingBody>
        <ListingHeader position={this.state.position} />
        {!this.state.isEditing ? (
          <p>{this.props.listing.position}</p>
        ) : (
          <input
            defaultValue={this.props.listing.position}
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
            stateDesc={this.state.description[idx].value}
            isEditing={this.state.isEditing}
            editDescription={this.editDescription}
          />
        ))}
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
