import React, { Component } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isEmpty } from "react-redux-firebase";
import { NONAME } from "dns";

class CompanyProfilePage extends Component {
  state = {
    editingProfile: false,
    name: this.props.company.name ? this.props.company.name : "None",
    description: !isEmpty(this.props.company.description) ? this.props.company.description : "None",
    error: null
  };
  componentDidMount() {
    if (isEmpty(this.props.company.companyDescription)) {
      this.setState({ editingProfile: true });
    }
  }
  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  updateHandler = e => {
    if (this.state.name && this.state.description) {
      const ref = this.props.firestore.collection("companies").doc(this.props.company.id);
      ref
        .update({
          name: this.state.name,
          companyDescription: this.state.description
        })
        .then(() => this.setState({ editingProfile: false }));
    } else {
      this.setState({ error: "Please fill out everything" });
    }
  };
  render() {
    console.log(this.props.company);
    return (
      <div>
        {!this.state.editingProfile ? (
          <p>{this.props.company.name}</p>
        ) : (
          <input value={this.state.name} onChange={this.onChangeHandler} name="name" />
        )}
        {!this.state.editingProfile ? (
          <p>{this.props.company.companyDescription}</p>
        ) : (
          <input value={this.state.description} onChange={this.onChangeHandler} name="description" />
        )}
        <p>Job Listings</p>
        {this.props.jobListing && this.props.jobListing.map(job => <div>{job}</div>)}
        <button onClick={this.updateHandler}>Save</button>
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
  firestoreConnect(props => {
    return [
      {
        collection: "jobListing",
        where: ["companyId", "==", `${props.company.id}`],
        storeAs: "jobListing"
      }
    ];
  })
)(CompanyProfilePage);
