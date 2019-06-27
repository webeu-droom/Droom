import React from "react";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";

class CompanyDiscover extends React.Component {
  render() {
    return (
      <div>
        <p>CompanyDiscoverTop</p>
        <p>CompanyDiscoverContent</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    jobListing: state.firestore.ordered.jobListings ? state.firestore.ordered.jobListings : []
  };
};

export default compose(
  connect(
    mapStateToProps,
    {}
  ),
  firestoreConnect(props => {
    return [
      { collection: "jobListings", where: ["companyId", "==", `${this.props.company.id}`], storeAs: "jobListings" }
    ];
  })
)(CompanyDiscover);
