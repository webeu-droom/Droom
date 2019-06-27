import React from "react";
import styled from "styled-components";
import ProfileHeader from "./ProfileHeader";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import {
  firestoreConnect,
  firebaseConnect,
  isEmpty,
  isLoaded
} from "react-redux-firebase";
import UserProfilePage from "./UserProfilePage";
import CompanyProfilePage from "./CompanyProfilePage";
import ComponentLoader from "../../~reusables/components/ComponentLoader";

class ProfileBody extends React.Component {
  componentDidMount() {
    if (this.props.user) {
      this.setState({
        name: this.props.user.name,
        title: this.props.user.title,
        experience: this.props.user.pastExperience,
        location: this.props.user.location,
        biography: this.props.user.biography,
        education: this.props.user.education
      });
    } else if (this.props.company) {
      this.setState({
        name: this.props.company.name,
        description: this.props.company.companyDescription,
        listings: this.props.jobListings
      });
    }
  }
  handleLogout = () => {
    console.log("hello");
    this.props.firebase.logout().then(() => {
      this.props.clearFirestore();
      this.props.history.push("/login");
    });
  };

  render() {
    // if (isLoaded(this.props.auth) && isEmpty(this.props.auth)) {
    //   this.props.history.push("/login");
    // }
    console.log(isEmpty(this.props.auth));

    return (
      <StyledMatchBody>
        <ProfileHeader handleLogout={this.handleLogout} />
        <div>
          {this.props.user && (
            <UserProfilePage
              user={this.props.user}
              handleLogout={this.handleLogout}
            />
          )}
          {this.props.company && (
            <CompanyProfilePage
              company={this.props.company}
              handleLogout={this.handleLogout}
            />
          )}
          {!this.props.user && !this.props.company ? <ComponentLoader /> : null}
        </div>
      </StyledMatchBody>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    user: state.firestore.ordered.currentUser
      ? state.firestore.ordered.currentUser[0]
      : "",
    company: state.firestore.ordered.currentCompany
      ? state.firestore.ordered.currentCompany[0]
      : "",
    matches: state.firestore.ordered.matches
      ? state.firestore.ordered.matches
      : []
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      clearFirestore: () => dispatch({ type: "@@reduxFirestore/CLEAR_DATA" })
    },
    dispatch
  );
};

export default withRouter(
  compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    firebaseConnect(),
    firestoreConnect(props => {
      return [
        {
          collection: "users",
          where: ["userEmail", "==", `${props.auth.email}`],
          storeAs: "currentUser"
        },
        {
          collection: "companies",
          where: ["companyEmail", "==", `${props.auth.email}`],
          storeAs: "currentCompany"
        }
      ];
    })
  )(ProfileBody)
);

const StyledMatchBody = styled.div`
  min-height: 100vh;
  background: white;
  width: 100%;
`;
