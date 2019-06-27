import React from "react";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import DiscoverTop from "./CompanyDiscoverTop";

class CompanyDiscover extends React.Component {
  render() {
    return (
      <div>
        <CompanyDiscoverTop />
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
    return [{ collection: "jobListings", where: ["companyId", "==", `${props.company.id}`], storeAs: "jobListings" }];
  })
)(CompanyDiscover);
