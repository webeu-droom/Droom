import React from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";

class ProfilePage extends React.Component {
  render() {
    console.log(this.props.auth);
    return (
      <div>
        <p>Hello</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    user: state.firestore.ordered.currentUser ? state.firestore.ordered.currentUser[0] : ""
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
  firebaseConnect(props => {
    return ["users"];
  })
)(ProfilePage);
