import React from "react";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import { firebaseConnect, withFirestore, isEmpty } from "react-redux-firebase";
import styled from "styled-components";
import uuid from "uuid";
import PropTypes from "prop-types";
import { heading_2 } from "./~reusables/variables/font-sizes";
import { source_sans_pro } from "./~reusables/variables/font-family";
import { medium_space_1 } from "./~reusables/variables/spacing";
import LandingHeader from "./~reusables/components/LandingHeader";
import LandingFooter from "./~reusables/components/LandingFooter";
import { Input } from "./~reusables/atoms/Inputs";
import { ButtonPrimary } from "./~reusables/atoms/Buttons";
import { RadioButton } from "./~reusables/atoms/RadioButton";

class Register extends React.Component {
  static propTypes = {
    auth: PropTypes.object,
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired
    })
  };

  state = {
    email: "",
    password: "",
    name: "",
    createCompany: false,
    createUser: false
  };

  onClickHandler = event => {
    if (event.target.id === "company") {
      this.setState({ createUser: false });
      this.setState(st => ({ createCompany: !st.createCompany }));
    } else {
      this.setState({ createCompany: false });
      this.setState(st => ({ createUser: !st.createUser }));
    }
  };

  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  saveUserToDatabase = res => {
    let userId = uuid();
    if (this.state.createUser) {
      console.log(res);
      this.props.firestore
        .collection("users")
        .doc(userId)
        .set({
          name: this.state.name,
          userEmail: res.user.user.email,
          title: "",
          experience: [],
          location: "",
          biography: "",
          education: "",
          imgUrl: ""
        })
        .then(() => {
          console.log("account was created");
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.props.firestore
        .collection("companies")
        .doc(userId)
        .set({
          name: this.state.name,
          companyEmail: res.user.user.email,
          companyDescription: "",
          imgUrl: ""
        })
        .then(() => {
          console.log("account was created");
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  handleRegister = event => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const INITIAL_STATE = {
      email: "",
      password: "",
      name: "",
      createCompany: false,
      createUser: false
    };
    this.props.firebase.createUser({ email, password }, { name, email }).then(() => {
      this.props.firebase.login({ email, password }).then(res => {
        this.saveUserToDatabase(res);
      });
    });
  };
  render() {
    if (!isEmpty(this.props.auth)) {
      this.props.history.push("/home");
    }
    return (
      <StyledRegister>
        <LandingHeader />
        <form onSubmit={this.handleRegister}>
          <h1>Register for your Account</h1>

          <Input
            placeholder="Name"
            name="name"
            value={this.state.fullName}
            onChange={this.onChangeHandler}
          />
          <Input
            placeholder="Email"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.onChangeHandler}
          />

          <Input
            placeholder="Password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.onChangeHandler}
          />
          <RadioButton>
            <div>
              <input
                type="radio"
                id="company"
                name="type Account"
                onChange={this.onClickHandler}
                checked={this.state.createCompany}
              />
              <label htmlFor="company">Company</label>
            </div>
            <div>
              <input
                type="radio"
                id="user"
                name="type Account"
                onChange={this.onClickHandler}
                checked={this.state.createUser}
              />
              <label htmlFor="user">User</label>
            </div>
          </RadioButton>
          <ButtonPrimary onClick={this.handleRegister}>Register</ButtonPrimary>
        </form>
        <LandingFooter />
      </StyledRegister>
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
)(Register);

const StyledRegister = styled.div`
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
