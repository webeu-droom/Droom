import React, { Component } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isEmpty } from "react-redux-firebase";
import styled from "styled-components";
import ListingSummary from "./ListingSummary";
import {
  ButtonSecondary,
  ButtonPrimary,
  TextButton,
  ButtonTertiary
} from "../../~reusables/atoms/Buttons";
import { Input } from "../../~reusables/atoms/Inputs";
import { source_sans_pro } from "../../~reusables/variables/font-family";
import { body_1 } from "../../~reusables/variables/font-sizes";
import { black, slate_grey } from "../../~reusables/variables/colors";
import { tablet_max_width } from "../../~reusables/variables/media-queries";
import {
  medium_space_1,
  medium_space_3,
  small_space
} from "../../~reusables/variables/spacing";

class CompanyProfilePage extends Component {
  state = {
    editingProfile: false,
    name: this.props.company.name ? this.props.company.name : "None",
    description: !isEmpty(this.props.company.description)
      ? this.props.company.description
      : "None",
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
      const ref = this.props.firestore
        .collection("companies")
        .doc(this.props.company.id);
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
      <StyledCompany>
        <section>
          {!this.state.editingProfile ? (
            <>
              <p className="label">Company Name</p>
              <p>{this.props.company.name}</p>
            </>
          ) : (
            <Input
              placeholder="Company Name"
              value={this.state.name}
              onChange={this.onChangeHandler}
              name="name"
            />
          )}
          {!this.state.editingProfile ? (
            <>
              <p className="label">Company Description</p>
              <p>{this.props.company.companyDescription}</p>
            </>
          ) : (
            <Input
              placeholder="Company Description"
              value={this.state.description}
              onChange={this.onChangeHandler}
              name="description"
            />
          )}
          <ButtonSecondary
            className="edit"
            onClick={() => this.setState({ editingProfile: true })}
          >
            Edit
          </ButtonSecondary>
          <ButtonPrimary className="save" onClick={this.updateHandler}>Save</ButtonPrimary>
        </section>
        <section className="right">
          <p className="label">Job Listings</p>

          {/* // Listing Summary Array */}
          <ListingSummary title="Full Stack Software Developer" listingId="1" />
          <ListingSummary title="Front-End Developer" listingId="2" />
          <ListingSummary title="Back-End Developer" listingId="3" />

          {/* // Listing Summary Array */}

          {this.props.jobListing &&
            this.props.jobListing.map(job => <div>{job}</div>)}
          <TextButton className="text-button">Add Job Listing</TextButton>
          <ButtonTertiary
            className="logout-button-mobile"
            onClick={this.props.handleLogout}
          >
            Log out
          </ButtonTertiary>
        </section>
      </StyledCompany>
    );
  }
}

const mapStateToProps = state => {
  return {
    jobListing: state.firestore.ordered.jobListing
      ? state.firestore.ordered.jobListing
      : ""
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

const StyledCompany = styled.div`
  margin: ${medium_space_1};
  display: flex;
  justify-content: space-between;

  section {
    width: 50%;
    flex-grow: 1;
    margin-right: ${small_space};
  }

  .right {
    margin-left: ${medium_space_3};
  }

  .edit {
    margin-right: ${small_space};
    margin-bottom: ${small_space};
  }

  .save {
    margin-bottom: ${small_space};
  }

  .text-button {
    margin-bottom: ${small_space};
  }

  .logout-button-mobile {
    display: none;
  }

  p {
    margin-bottom: ${medium_space_3};
    font-family: ${source_sans_pro};
    font-size: ${body_1};
    color: ${black};
  }

  .label {
    margin-bottom: 16px;
    line-height: 0;
    color: ${slate_grey};
    font-size: ${body_1};
  }

  @media only screen and (max-width: ${tablet_max_width}) {
    .logout-button-mobile {
      display: block;
      margin: ${small_space} 0;
    }
  }

  @media only screen and (max-width: 600px) {
    flex-direction: column;

    section {
      width: 95%;
    }

    .right {
      margin-left: 0;
    }
  }
`;
