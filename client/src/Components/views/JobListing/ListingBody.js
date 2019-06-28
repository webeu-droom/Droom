import React from "react";
import styled from "styled-components";
import ListingHeader from "./ListingHeader";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isEmpty, isLoaded } from "react-redux-firebase";
import { withRouter } from "react-router-dom";
import DescriptionList from "./DescriptionList";
import RequitementList from "./RequitementList";
import { medium_space_1, small_space, medium_space_2, medium_space_3 } from "../../~reusables/variables/spacing";
import { source_sans_pro } from "../../~reusables/variables/font-family";
import { body_1 } from "../../~reusables/variables/font-sizes";
import { black, slate_grey } from "../../~reusables/variables/colors";
import { tablet_max_width } from "../../~reusables/variables/media-queries";
import { Input } from "../../~reusables/atoms/Inputs";
import { ButtonSecondary, ButtonPrimary } from "../../~reusables/atoms/Buttons";

class ListingBody extends React.Component {
  state = {
    isEditing: "",
    position: "",
    description: [],
    location: "",
    requirements: []
  };
  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentDidMount() {
    if (isLoaded(this.props.listing) && !isEmpty(this.props.listing)) {
      this.setState({ listing: this.props.listing });
    }
  }
  updateListing = e => {
    // e.preventDefault();
    // let item = {
    //   requirements: this.state.requirements,
    //   location: this.state.location,
    //   position: this.state.position,
    //   description: this.state.description
    // };
    let ref = this.props.firestore.collection("jobListings").doc(this.props.listing.id);
    ref
      .update({
        requirements: this.state.requirements,
        location: this.state.location,
        position: this.state.position,
        description: this.state.description
      })
      .then(() => {
        this.setState({ isEditing: false });
      })
      // .then(() => {
      //   this.props.clearFirestore();
      // })
      .catch(err => {
        console.log("This is the error:", err);
      });
    // this.props.history.push("/profile");
  };

  editProfile = e => {
    e.preventDefault();
    let { location, description, requirements, position } = this.props.listing;
    this.setState({
      location,
      description,
      requirements,
      position,
      isEditing: true
    });
  };
  editArray = e => {
    let newArray = [...this.state[e.target.name]];
    newArray[e.target.id] = e.target.value;
    this.setState({ [e.target.name]: newArray });
  };
  render() {
    if (!isLoaded(this.props.listing) || isEmpty(this.props.listing)) {
      return <h1>Loading...</h1>;
    } else if (isLoaded(this.props.listing) && isEmpty(this.props.listing)) {
      return <h1>404 Not found</h1>;
    }
    console.log(this.props.listing);
    return (
      <StyledListingBody>
        <ListingHeader position={this.state.position} />
        <div className="body">
          <section>
            <p className="label">Position</p>
            {!this.state.isEditing ? (
              <p className="divider">{this.props.listing.position}</p>
            ) : (
              <Input
                // defaultValue={this.props.listing.position}
                value={this.state.position}
                onChange={this.onChangeHandler}
                name="position"
                placeholder="Position"
              />
            )}
            {this.props.listing.description.map((desc, idx) => (
              <DescriptionList
                key={idx}
                desc={desc}
                id={idx}
                stateDesc={this.state.description}
                isEditing={this.state.isEditing}
                editDescription={this.editArray}
              />
            ))}
          </section>
          <section className="right">
            <p className="label">Location</p>
            {!this.state.isEditing ? (
              <p className="divider">{this.props.listing.location}</p>
            ) : (
              <Input
                value={this.props.listing.location}
                onChange={this.onChangeHandler}
                name="location"
                placeholder="Location"
              />
            )}
            {this.props.listing.requirements.map((req, idx) => (
              <RequitementList
                key={idx}
                req={req}
                id={idx}
                stateReq={this.state.requirements}
                isEditing={this.state.isEditing}
                editRequirements={this.editArray}
              />
            ))}
            <ButtonSecondary className="edit" onClick={this.editProfile}>
              Edit
            </ButtonSecondary>
            <ButtonPrimary onClick={this.updateListing}>Save</ButtonPrimary>
          </section>
        </div>
      </StyledListingBody>
    );
  }
}

const StyledListingBody = styled.div`
  min-height: 100vh;
  background: white;
  width: 100%;

  .body {
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

    .text-button {
      margin-bottom: ${medium_space_1};
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
      margin-bottom: ${small_space};
      line-height: 0;
      color: ${slate_grey};
      font-size: ${body_1};
    }

    @media only screen and (max-width: ${tablet_max_width}) {
      .logout-button-mobile {
        display: block;
        margin-top: ${small_space};
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
  }
`;

const mapStateToProps = state => {
  return {
    listing: state.firestore.ordered.currentListing ? state.firestore.ordered.currentListing[0] : ""
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    clearFirestore: () => dispatch({ type: "@@reduxFirestore/CLEAR_DATA" })
  });
};

export default withRouter(
  compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    firestoreConnect(props => {
      return [
        {
          collection: "jobListings",
          doc: `${props.id}`,
          storeAs: "currentListing"
        }
      ];
    })
  )(ListingBody)
);
