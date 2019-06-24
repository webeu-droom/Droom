import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import { firebaseConnect, withFirestore, isEmpty } from "react-redux-firebase";
import CreatedByBar from "../ReusableComponents/CreatedByBar";

class Login extends React.Component {
  static propTypes = {
    auth: PropTypes.object,
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired
    })
  };
  state = {
    email: "",
    password: ""
  };

  handleLogin = e => {
    e.preventDefault();
    this.props.firebase
      .login({
        email: this.state.email,
        password: this.state.password
      })
      .then(() => {
        this.props.history.push("/home");
      });
  };

  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    if (!isEmpty(this.props.auth)) {
      this.props.history.push("/home");
    }
    return (
      <div>
        <input name="email" value={this.state.email} onChange={this.onChangeHandler} />
        <input name="password" value={this.state.password} onChange={this.onChangeHandler} />
        <button onClick={this.handleLogin}>Login</button>
        <CreatedByBar />
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
)(Login);
