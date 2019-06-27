import React from "react";
import { compose } from "redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { connect } from "react-redux";
import DiscoverTop from "./DiscoverTop";
import CompanyDiscoverContent from "./CompanyDiscoverContent";

class CompanyDiscover extends React.Component {
  state = {
    currentJob: 0
  };

  changeJoblisting = e => {
    this.setState({ currentDiscover: e.target.value });
  };
  render() {
    return (
      <div>
        <DiscoverTop jobListings={this.props.jobListings} />
        {isLoaded(this.props.jobListings) && (
          <CompanyDiscoverContent jobListing={this.props.jobListings[this.state.currentJob]} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    jobListings: state.firestore.ordered.jobListings ? state.firestore.ordered.jobListings : []
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
