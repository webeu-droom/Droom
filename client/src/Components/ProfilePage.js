import React from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, firebaseConnect, isEmpty, isLoaded } from "react-redux-firebase";
import styled from "styled-components";
import UserProfilePage from "./UserProfilePage";
import CompanyProfilePage from "./CompanyProfilePage";

class ProfilePage extends React.Component {
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
    } else {
      this.setState({
        name: this.props.user.name,
        description: this.props.user.companyDescription,
        listings: this.props.jobListings
      });
    }
  }
  handleLogout = () => {
    console.log("hello");
    this.props.firebase.logout().then(() => {
      this.props.clearFirestore();
    });
  };
  render() {
    if (isLoaded(this.props.auth) && isEmpty(this.props.auth)) {
      this.props.history.push("/login");
    }
    console.log(isEmpty(this.props.auth));
    return (
      <div>
        <StyledProfileTopBar>
          <p>Profile</p>
          <button onClick={this.handleLogout}>Logout</button>
        </StyledProfileTopBar>
        {this.props.user && <UserProfilePage user={this.props.user} />}
        {this.props.company && <CompanyProfilePage company={this.props.company} />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    user: state.firestore.ordered.currentUser ? state.firestore.ordered.currentUser[0] : "",
    company: state.firestore.ordered.currentCompany ? state.firestore.ordered.currentCompany[0] : "",
    matches: state.firestore.ordered.matches ? state.firestore.ordered.matches : []
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

export default compose(
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
      },
      {
        collection: "matches",
        where: ["userId", "==", `${props.user.id}`]
      }
    ];
  })
)(ProfilePage);

const StyledProfileTopBar = styled.div``;
