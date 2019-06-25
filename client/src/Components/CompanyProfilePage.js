import React, { Component } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

class CompanyProfilePage extends Component {
  state = {
    editingProfile: false,
    name: this.props.company.name,
    description: this.props.company.description
  };
  componentDidMount() {
    if (!this.props.company.description) {
      this.setState({ editingProfile: true });
    }
  }
  render() {
    console.log(this.props.company);
    return (
      <div>
        {!this.state.editingProfile ? (
          <p>{this.props.company.name}</p>
        ) : (
          <input value={this.state.name} onChange={this.onChangeHandler} />
        )}
        {this.state.editingProfile ? (
          <p>{this.props.company.description}</p>
        ) : (
          <input value={this.state.description} onChange={this.onChangeHandler} />
        )}
        <p>Listings</p>
        {"Hello"}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    jobListing: state.firestore.ordered.jobListing ? state.firestore.ordered.jobListing : ""
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
  firestoreConnect()
);
