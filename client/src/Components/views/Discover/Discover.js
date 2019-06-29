import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect, firestoreConnect, isLoaded } from "react-redux-firebase";
import CompanyDiscover from "./CompanyDiscover";
import UserDiscover from "./UserDiscover";

class Discover extends React.Component {
  render() {
    if (!isLoaded(this.props.company) && this.props.user) {
      return <h1>Loading</h1>;
    }
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
    company: state.firestore.ordered.company ? state.firestore.ordered.company[0] : "",
    user: state.firestore.ordered.user ? state.firestore.ordered.user[0] : ""
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
        storeAs: "user"
      },
      {
        collection: "companies",
        where: ["companyEmail", "==", `${props.auth.email}`],
        storeAs: "company"
      }
    ];
  })
)(Discover);
