import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import { firebaseConnect, withFirestore, isEmpty } from "react-redux-firebase";
import CreatedByBar from "../ReusableComponents/CreatedByBar";
import CompanyBar from "../ReusableComponents/CompanyBar";

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
        <CompanyBar />
        <StyledLoginForm onSubmit={this.handleLogin}>
          <StyledLoginInput name="email" value={this.state.email} onChange={this.onChangeHandler} />
          <StyledLoginInput name="password" value={this.state.password} onChange={this.onChangeHandler} />
          <StyledButton onClick={this.handleLogin}>Login</StyledButton>
        </StyledLoginForm>
        <CreatedByBar />
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
`;

const StyledLoginInput = styled.input`
  width: 50%;
`;

const StyledButton = styled.button`
  background: #0076ff;
  color: white;
  border: none;
`;
