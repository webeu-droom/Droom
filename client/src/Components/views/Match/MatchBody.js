import React from "react";
import styled from "styled-components";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { firestoreConnect, firebaseConnect } from "react-redux-firebase";
import MatchHeader from "./MatchHeader";
import MatchCard from "./MatchCard";

const MatchBody = props => {
  console.log(props);
  let fetchedCompanies, fetchedJobListings, fetchedUsers;
  if (props.companies) {
    fetchedCompanies = Object.values(props.companies);
  }
  if (props.jobListings) {
    fetchedJobListings = Object.values(props.jobListings);
  }
  if (props.users) {
    fetchedUsers = Object.values(props.users);
  }

  let userOrCompId;
  if (props.company) {
    userOrCompId = props.company.id;
  } else if (props.user) {
    userOrCompId = props.user.id;
  }

  let matches;
  if (props.matches) {
    matches = Object.values(props.matches);
    if (props.company) {
      matches = props.matches.filter(match => match.companyId === userOrCompId);
    } else if (props.user) {
      matches = props.matches.filter(match => match.userId === userOrCompId);
    }
  }

  let users = [];
  let listings = [];

  // If I'm a company, pull the corresponding user's data that matches one of my listings
  if (props.company && props.matches && fetchedUsers) {
    let companyListings = fetchedJobListings.filter(listing => listing.companyId === userOrCompId);

    matches.forEach(match => {
      let foundUser = fetchedUsers.find(user => user.id === match.userId);

      foundUser.likedJobListings.forEach(likedListing => {
        let matchedUser = companyListings.find(companyListing => companyListing.id === likedListing)
        if(matchedUser) {
          users = [...users, { user: foundUser, matchId: match.id }];
        }
      })
    });
  }

  // If I'm a user, check the company's listing data to see if I'm a liked user
  if(props.user && props.matches && fetchedCompanies && fetchedJobListings) {
    matches.forEach(match => {
      let foundCompany = fetchedCompanies.find(company => company.id === match.companyId);
      let foundListings = fetchedJobListings.filter(listing => listing.companyId === foundCompany.id);
       foundListings.forEach(listing => {
         let matchedListing = listing.likedUser.find(user => user === userOrCompId);
         if(matchedListing) {
           listings = [...listings, {listing: listing, matchId: match.id, associatedCompany: foundCompany}]
         }
       })
    })
  }

  return (
    <StyledMatchBody>
      <MatchHeader />

      {/* If Employee, Render Employee Body Components */}
      <div className="match-cards">
        {props.company &&
          users.map(user => {
            return (
              <MatchCard
                matchesId={user.matchId}
                name={user.user.name}
                message={user.user.biography}
                title={user.user.position}
                location={user.user.location}
              />
            );
          })}
          {props.user && listings.map(listing => {
            return (
              <MatchCard 
                matchesId={listing.matchId}
                name={listing.associatedCompany.name}
                message={listing.associatedCompany.companyDescription}
                title={listing.listing.position}
                location={listing.listing.location}
              />
            )
          })}
        {/* <MatchCard
        matchesId="123"
        image="https://randomuser.me/api/portraits/men/86.jpg"
        name="Felix Hawke"
        message="We're a group of highly-motivated individuals making the tech industry more accessible by providing educational opportunities to underserved individuals."
        title="Full Stack Developer"
        location="Dublin, Ireland"
      />
      <MatchCard
        matchesId="2"
        image="https://randomuser.me/api/portraits/men/86.jpg"
        name="Felix Hawke"
        message="Accessible by providing educational opportunities to underserved individuals."
        title="Full Stack Developer"
        location="Dublin, Ireland"
      />
      <MatchCard
        matchesId="3"
        image="https://randomuser.me/api/portraits/men/86.jpg"
        name="Felix Hawke"
        message="We're a group of highly-motivated individuals making the tech industry more accessible by providing educational opportunities to underserved individuals."
        title="Full Stack Developer"
        location="Dublin, Ireland"
      />
      <MatchCard
        matchesId="4"
        image="https://randomuser.me/api/portraits/men/86.jpg"
        name="Felix Hawke"
        message="Individuals making the tech industry more accessible by providing educational opportunities to underserved individuals."
        title="Full Stack Developer"
        location="Dublin, Ireland"
      /> */}
      </div>
      {/* If Company, Render Employee Body Components */}
    </StyledMatchBody>
  );
};

const StyledMatchBody = styled.div`
  min-height: 100vh;
  background: white;
  width: 100%;
  .match-cards {
    display: flex;
    flex-wrap: wrap;
  }
`;

const mapStateToProps = state => {
  return {
    matches: state.firestore.ordered.matches,
    user: state.firestore.ordered.currentUser
      ? state.firestore.ordered.currentUser[0]
      : "",
    company: state.firestore.ordered.currentCompany
      ? state.firestore.ordered.currentCompany[0]
      : "",
    users: state.firestore.ordered.users,
    companies: state.firestore.ordered.companies,
    jobListings: state.firestore.ordered.jobListings,
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

export default withRouter(
  compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    firebaseConnect(),
    firestoreConnect(props => {
      return [
        {
          collection: "matches",
          storeAs: "matches"
        },
        {
          collection: "users"
        },
        {
          collection: "companies"
        },
        {
          collection: "jobListings"
        },
        {
          collection: "users",
          where: ["userEmail", "==", `${props.auth.email}`],
          storeAs: "currentUser"
        },
        {
          collection: "companies",
          where: ["companyEmail", "==", `${props.auth.email}`],
          storeAs: "currentCompany"
        }
      ];
    })
  )(MatchBody)
);
