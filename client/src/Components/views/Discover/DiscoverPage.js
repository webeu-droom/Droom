import React, { useEffect } from "react";
import styled from "styled-components";

import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { firestoreConnect, firebaseConnect } from "react-redux-firebase";

// import DiscoverContent from "./DiscoverContent";
import CompanyDiscover from "./CompanyDiscover";
import UserDiscover from "./UserDiscover";
import LayoutSidebar from "../../~reusables/components/Sidebar";
import { sidebarIcons, sidebarTexts } from "../../data/sidebar";
import MobileNavbar from "../../~reusables/components/MobileNavbar";
import { tablet_max_width } from "../../~reusables/variables/media-queries";

export const DiscoverPage = props => {
  const { company, user, history } = props;

  useEffect(() => {
    if (user !== undefined) {
      history.push("/discover/jobs");
    } else if (company !== undefined) {
      history.push("/discover/candidates");
    }
  }, [company, user, history]);
  return (
    <StyledMatch>
      <LayoutSidebar icons={sidebarIcons} texts={sidebarTexts} />
      <MobileNavbar icons={sidebarIcons} texts={sidebarTexts} />
      {/* <DiscoverContent props={props} /> */}
      {company && <CompanyDiscover props={props} />}
      {user && <UserDiscover props={props} />}
    </StyledMatch>
  );
};

const StyledMatch = styled.div`
  display: flex;
  @media only screen and (max-width: ${tablet_max_width}) {
    flex-direction: column;
  }
`;

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    user: state.firestore.ordered.currentUser
      ? state.firestore.ordered.currentUser[0]
      : "",
    company: state.firestore.ordered.currentCompany
      ? state.firestore.ordered.currentCompany[0]
      : "",
    matches: state.firestore.ordered.matches
      ? state.firestore.ordered.matches
      : [],
    jobs: state.firestore.ordered.jobs ? state.firestore.ordered.jobs : [],
    candidates: state.firestore.ordered.candidates
      ? state.firestore.ordered.candidates
      : [],
    companies: state.firestore.ordered.companies
      ? state.firestore.ordered.companies
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
          collection: "users",
          where: ["userEmail", "==", `${props.auth.email}`],
          storeAs: "currentUser"
        },
        {
          collection: "companies",
          where: ["companyEmail", "==", `${props.auth.email}`],
          storeAs: "currentCompany"
        },
        {
          collection: "jobListings",
          storeAs: "jobs"
        },
        {
          collection: "users",
          storeAs: "candidates"
        },
        {
          collection: "companies",
          storeAs: "companies"
        }
      ];
    })
  )(DiscoverPage)
);
