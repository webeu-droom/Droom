import React, { Component } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isEmpty } from "react-redux-firebase";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Popup from "../../~reusables/components/Popup";
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
import { black, slate_grey, blue } from "../../~reusables/variables/colors";
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
    error: null,
    showPopup: false
  };
  componentDidMount() {
    if (isEmpty(this.props.company.companyDescription)) {
      this.setState({ editingProfile: true });
    }
  }

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };

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
      this.setState({ error: "Please fill out your profile" });
      this.togglePopup();
    }
  };
  render() {
    let jobListings = [];
    if (this.props.company) {
      jobListings = this.props.jobListings.filter(
        listing => listing.companyId === this.props.company.id
      );
    }
    return (
      <StyledCompany>
        <section>
          <p className="label">Company Name</p>
          {!this.state.editingProfile ? (
            <p className="divider">{this.props.company.name}</p>
          ) : (
            <Input
              placeholder="Company Name"
              value={this.state.name}
              onChange={this.onChangeHandler}
              name="name"
            />
          )}
          <p className="label">Company Description</p>
          {!this.state.editingProfile ? (
            <p className="divider">{this.props.company.companyDescription}</p>
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
          <ButtonPrimary className="save" onClick={this.updateHandler}>
            Save
          </ButtonPrimary>
        </section>
        {this.state.showPopup ? (
          <Popup text={this.state.error} closePopup={this.togglePopup} />
        ) : null}
        <section className="right">
          <p className="label">Job Listings</p>

          {this.props.jobListings.length > 0
            ? jobListings.map(listing => {
                return (
                  <ListingSummary
                    key={listing.id}
                    listingId={listing.id}
                    title={listing.position}
                  />
                );
              })
            : null}
          {this.props.jobListing &&
            this.props.jobListing.map(job => <div>{job}</div>)}
          <Link to="/profile/listing">
            <TextButton className="text-button">Add Job Listing</TextButton>
          </Link>
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
    jobListings: state.firestore.ordered.jobListings
      ? state.firestore.ordered.jobListings
      : []
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
        collection: "jobListings",
        where: ["companyId", "==", `${props.company.id}`],
        storeAs: "jobListings"
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

  p.divider {
    padding-bottom: ${small_space};
    border-bottom: 1px solid #eaeaea;
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

  a {
    text-decoration: none;
    color: ${black};
  }
  .text-button {
    margin-bottom: ${small_space};
    color: ${blue};
  }

  .logout-button-mobile {
    display: none;
  }

  p {
    line-height: ${medium_space_1};
    font-family: ${source_sans_pro};
    font-size: ${body_1};
    color: ${black};
  }

  .label {
    margin-bottom: ${medium_space_1};
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
