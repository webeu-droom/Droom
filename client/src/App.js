import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import { firebaseConnect, withFirestore } from "react-redux-firebase";
import Login from "./Components/views/Login/Login";
import Register from "./Components/views/Register/Register";
import Home from "./Components/Home";
import Profile from "./Components/views/Profile/Profile"

import DiscoverPage from "./Components/views/Discover/DiscoverPage";

<<<<<<< HEAD
import Match from "./Components/Match/Match";
import Chat from "./Components/Chat/Chat";
import Landing from "./Components/Landing/Landing";
import Listing from "./Components/JobListing/Listing";
import CreateListing from "./Components/JobListing/CreateListing";
=======
import Match from "./Components/views/Match/Match";
import Chat from "./Components/views/Chat/Chat";
import Landing from "./Components/views/Landing/Landing";
import Listing from "./Components/views/JobListing/Listing";
>>>>>>> f4f6ca60ba6b70c0efaf509e7d86a6d90ebe1107

class App extends React.Component {
  render() {
    return (
      <div>
        <Route
          exact
          path="/discover/:type?"
          render={props => <DiscoverPage {...props} />}
        />

        <Route exact path="/" render={props => <Landing {...props} />} />
        <Route exact path="/login" render={props => <Login {...props} />} />
        <Route
          exact
          path="/register"
          render={props => <Register {...props} />}
        />
        <Route exact path="/home" render={props => <Home {...props} />} />
        <Route exact path="/profile" render={props => <Profile {...props} />} />
        <Route exact path="/match" render={props => <Match {...props} />} />
<<<<<<< HEAD
        <Route exact path="/match/chat/:id" render={props => <Chat {...props} />} />
        <Route exact path="/profile/listing/:id" render={props => <Listing {...props} />} />
        <Route exact path="/profile/createListing" render={props => <CreateListing {...props} />} />
=======
        <Route
          exact
          path="/match/chat/:id"
          render={props => <Chat {...props} />}
        />
        <Route
          exact
          path="/profile/listing/:id"
          render={props => <Listing {...props} />}
        />
>>>>>>> f4f6ca60ba6b70c0efaf509e7d86a6d90ebe1107
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
