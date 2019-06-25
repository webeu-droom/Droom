import React from "react";
import styled from "styled-components";
import ListingHeader from "./ListingHeader";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

class ListingBody extends React.Component {
  render() {
    console.log(this.props);
    return (
      <StyledListingBody>
        <ListingHeader />
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
