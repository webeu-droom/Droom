import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import { firebaseConnect, withFirestore, isEmpty } from "react-redux-firebase";
import LandingHeader from "./~reusables/components/LandingHeader";
import LandingFooter from "./~reusables/components/LandingFooter";
import { ButtonPrimary } from "./~reusables/atoms/Buttons";
import { heading_2 } from "./~reusables/variables/font-sizes";
import { source_sans_pro } from "./~reusables/variables/font-family";
import { Input } from "./~reusables/atoms/Inputs";
import { medium_space_1 } from "./~reusables/variables/spacing";

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
      <StyledLogin>
        <LandingHeader />
        <form onSubmit={this.handleLogin}>
          <h1>Login to your Account</h1>
          <Input
            placeholder="Email"
            name="email"
            value={this.state.email}
            onChange={this.onChangeHandler}
          />
          <Input
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.onChangeHandler}
          />
          <ButtonPrimary onClick={this.handleLogin}>Login</ButtonPrimary>
        </form>
        <LandingFooter />
      </StyledLogin>
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

const StyledLogin = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h1 {
    font-size: ${heading_2};
    font-family: ${source_sans_pro};
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding: 0 ${medium_space_1};
  }
`;
