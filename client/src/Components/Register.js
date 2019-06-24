import React from "react";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import { firebaseConnect, withFirestore } from "react-redux-firebase";
import uuid from "uuid";
import PropTypes from "prop-types";

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
          name: this.props.user.name,
          userEmail: res.user.user.email,
          title: "",
          experience: [],
          location: "",
          biography: "",
          education: ""
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
          jobListings: [],
          companyDescription: ""
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
    return (
      <div>
        <input name="email" value={this.state.email} onChange={this.onChangeHandler} />
        <input name="password" type="password" value={this.state.password} onChange={this.onChangeHandler} />
        <input name="name" value={this.state.fullName} onChange={this.onChangeHandler} />
        <fieldset>
          <input
            type="radio"
            id="company"
            name="type Account"
            onClick={this.onClickHandler}
            checked={this.state.createCompany}
          />
          <label htmlFor="company">Company</label>
          <input
            type="radio"
            id="user"
            name="type Account"
            onClick={this.onClickHandler}
            checked={this.state.createUser}
          />
          <label htmlFor="user">User</label>
        </fieldset>
        <button onClick={this.handleRegister}>Register</button>
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
)(Register);
