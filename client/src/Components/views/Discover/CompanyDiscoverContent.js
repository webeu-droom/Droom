import React from "react";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";

class CompanyDiscoverContent extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <p>Thorben</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // users: state.firestore.ordered.userChoices ? state.firestore.ordered.userChoices : ""
  };
};

export default compose(
  connect(
    mapStateToProps,
    {}
  ),
  firestoreConnect(props => {
    console.log("firestore", props);
    return [
      {
        collection: "users",
        where: ["position", "==", props.jobListing.position],
        storeAs: "userChoices"
      }
    ];
  })
)(CompanyDiscoverContent);
