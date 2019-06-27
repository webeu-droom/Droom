import React, { useState } from "react";
import styled from "styled-components";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { firestoreConnect, firebaseConnect } from "react-redux-firebase";
import MatchHeader from "./MatchHeader";
import MatchCard from "./MatchCard";
import ComponentLoader from "../../~reusables/components/ComponentLoader";
import { black } from "../../~reusables/variables/colors";
import { source_sans_pro } from "../../~reusables/variables/font-family";

const MatchBody = props => {
  const [filteredUsers, setFilteredUsers] = useState("");
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

  let companyJobListings;
  let matches;
  if (props.matches) {
    matches = Object.values(props.matches);
    if (props.company && props.jobListings) {
      companyJobListings = fetchedJobListings.filter(listing => listing.companyId === userOrCompId);

      matches = props.matches.filter(match => {
        let foundListing = companyJobListings.find(listing => {
          return listing.id === match.jobListingId;
        });

        if (foundListing) {
          return match.jobListingId === foundListing.id;
        }
      });
    } else if (props.user) {
      matches = props.matches.filter(match => match.userId === userOrCompId);
    }
  }

  let users = [];
  let listings = [];

  // If I'm a company, pull the corresponding user's data that matches one of my listings
  if (props.company && props.matches && fetchedUsers && companyJobListings) {
    matches.forEach(match => {
      let foundUser = fetchedUsers.find(user => user.id === match.userId);
      foundUser.likedJobListings.forEach(likedListing => {
        let matchedUser = companyJobListings.find(companyListing => companyListing.id === likedListing);
        if (matchedUser) {
          users = [...users, { user: foundUser, matchId: match.id }];
        }
      });
    });
  }

  // If I'm a user, check the job listing data to see if I'm a liked user
  if (props.user && props.matches && fetchedCompanies && fetchedJobListings) {
    matches.forEach(match => {
      fetchedJobListings.forEach(listing => {
        let matchedListing = listing.likedUser.find(user => user === userOrCompId);
        if (matchedListing) {
          let foundCompany = fetchedCompanies.find(company => company.id === listing.companyId);
          listings = [
            ...listings,
            {
              listing: listing,
              matchId: match.id,
              associatedCompany: foundCompany
            }
          ];
        }
      });
    });
  }

  const filterJobListings = listingId => {
    if (listingId === "all-listings") {
      setFilteredUsers("");
    } else {
      setFilteredUsers([]);
      matches.forEach(match => {
        if (users) {
          let foundUser = users.find(user => user.user.id === match.userId);
          if (foundUser) {
            foundUser.user.likedJobListings.forEach(likedListing => {
              let matchedUser = likedListing === listingId;
              if (matchedUser) {
                setFilteredUsers([...filteredUsers, { foundUser }]);
              }
            });
          }
        }
      });
    }
  };

  return (
    <StyledMatchBody>
<<<<<<< HEAD
      <MatchHeader company={props.company} companyListings={companyJobListings} />
=======
      <MatchHeader
        company={props.company}
        companyListings={companyJobListings}
        filterJobListings={filterJobListings}
      />
>>>>>>> 612b8c1669f1d778ca97ca2069f8b6c513027d85

      <div className="match-cards">
        {props.company && filteredUsers
          ? filteredUsers.map((user, idx) => {
              return (
                <MatchCard
                  key={idx}
                  matchesId={user.matchId}
                  name={user.foundUser.user.name}
                  message={user.foundUser.user.biography}
                  title={user.foundUser.user.position}
                  location={user.foundUser.user.location}
                />
              );
            })
          : users.map((user, idx) => {
              return (
                <MatchCard
                  key={idx}
                  matchesId={user.matchId}
                  name={user.user.name}
                  message={user.user.biography}
                  title={user.user.position}
                  location={user.user.location}
                />
              );
            })}
        {props.user &&
          listings.map((listing, idx) => {
            return (
              <MatchCard
                key={idx}
                matchesId={listing.matchId}
                name={listing.associatedCompany.name}
                message={listing.associatedCompany.companyDescription}
                title={listing.listing.position}
                location={listing.listing.location}
              />
            );
          })}
        {(!props.user && !props.company) || (!fetchedJobListings || !fetchedUsers) ? <ComponentLoader /> : null}
        {(props.user && listings.length < 1 && fetchedJobListings) ||
        (props.company && users.length < 1 && fetchedUsers) ? (
          <div className="filler-message">
            <h3>Nothing to see here - yet</h3>
            <p>From interviews to job offers and a whole lot more, this is where the magic happens.</p>
          </div>
        ) : null}
        {/* <MatchCard
        matchesId="123"
        image="https://randomuser.me/api/portraits/men/86.jpg"
        name="Felix Hawke"
        message="We're a group of highly-motivated individuals making the tech industry more accessible by providing educational opportunities to underserved individuals."
        title="Full Stack Developer"
        location="Dublin, Ireland"
      />
      <MatchCard
        matchesId="123"
        image="https://randomuser.me/api/portraits/men/86.jpg"
        name="Felix Hawke"
        message="We're a group of highly-motivated individuals making the tech industry more accessible by providing educational opportunities to underserved individuals."
        title="Full Stack Developer"
        location="Dublin, Ireland"
      /> */}
      </div>
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
  .filler-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    h3, p {
      color: ${black}
      font-family: ${source_sans_pro};
    }
  }
`;

const mapStateToProps = state => {
  return {
    matches: state.firestore.ordered.matches,
    user: state.firestore.ordered.currentUser ? state.firestore.ordered.currentUser[0] : "",
    company: state.firestore.ordered.currentCompany ? state.firestore.ordered.currentCompany[0] : "",
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
