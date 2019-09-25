import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect, isEmpty, isLoaded } from "react-redux-firebase";

class Home extends React.Component {
  handleLogout = () => {
    this.props.firebase.logout().then(() => {
      this.props.clearFirestore();
    });
  };
  render() {
    if (isLoaded(this.props.auth) && isEmpty(this.props.auth)) {
      this.props.history.push("/login");
    }
    return (
      <div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearFirestore: () => dispatch({ type: "@@reduxFirestore/CLEAR_DATA" })
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firebaseConnect()
)(Home);
