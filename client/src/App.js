import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import { firebaseConnect, withFirestore } from "react-redux-firebase";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import ProfilePage from "./Components/ProfilePage";
import Profile from "./Components/Profile/Profile"

import { Discover } from "./Components/Discover";

import Match from "./Components/Match/Match";
import Chat from "./Components/Chat/Chat";
import Landing from "./Components/Landing/Landing";
import Listing from "./Components/JobListing/Listing";

class App extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/discover/:type" render={props => <Discover {...props} />} />
        <Route exact path="/" render={props => <Landing {...props} />} />
        <Route exact path="/login" render={props => <Login {...props} />} />
        <Route exact path="/register" render={props => <Register {...props} />} />
        <Route exact path="/home" render={props => <Home {...props} />} />
        <Route exact path="/profile" render={props => <Profile {...props} />} />
        <Route exact path="/match" render={props => <Match {...props} />} />
        <Route exact path="/match/chat/:id" render={props => <Chat {...props} />} />
        <Route exact path="/profile/listing/:id" render={props => <Listing {...props} />} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    test: state.firestore.ordered.test ? state.firestore.ordered.test[0] : []
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
  withFirestore,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firebaseConnect()
)(App);
