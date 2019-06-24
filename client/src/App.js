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

class App extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/login" render={props => <Login {...props} />} />
        <Route exact path="/register" render={props => <Register {...props} />} />
        <Route exact path="/home" render={props => <Home {...props} />} />
        <Route exact path="/profile" render={props => <ProfilePage />} />
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
