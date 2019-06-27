import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect, firestoreConnect } from "react-redux-firebase";
import CompanyDiscover from "./CompanyDiscover";
import UserDiscover from "./UserDiscover";

class Discover extends React.Component {
  render() {
    return (
      <div>
        {this.props.company && <CompanyDiscover company={this.props.company} />}
        {this.props.user && <UserDiscover user={this.props.user} />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    company: state.firestore.ordered.company ? state.firestore.ordered.company : "",
    user: state.firestore.ordered.user ? state.firetore.ordered.user : ""
  };
};

export default compose(
  connect(
    mapStateToProps,
    {}
  ),
  firebaseConnect(),
  firestoreConnect(props => {
    return [
      {
        collection: "users",
        where: ["userEmail", "==", `${props.auth.email}`],
        storeAs: "users"
      },
      {
        collection: "companies",
        where: ["companyEmail", "==", `${props.auth.email}`]
      }
    ];
  })
)(Discover);
