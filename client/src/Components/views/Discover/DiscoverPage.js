import React, { useEffect } from "react";
import styled from "styled-components";

import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { firestoreConnect, firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";

import DiscoverContent from "./DiscoverContent";
import LayoutSidebar from "../../~reusables/components/Sidebar";
import { sidebarIcons, sidebarTexts } from "../../data/sidebar";
import MobileNavbar from "../../~reusables/components/MobileNavbar";
import { tablet_max_width } from "../../~reusables/variables/media-queries";

export const DiscoverPage = props => {
  if (isLoaded(props.auth) && isEmpty(props.auth)) {
    props.history.push("/login");
  }
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
      <DiscoverContent props={props} />
    </StyledMatch>
  );
};

const StyledMatch = styled.div`
  display: flex;
  @media only screen and (max-width: ${tablet_max_width}) {
    flex-direction: column;
  }
`;

// export default DiscoverPage;

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    user: state.firestore.ordered.currentUser ? state.firestore.ordered.currentUser[0] : "",
    company: state.firestore.ordered.currentCompany ? state.firestore.ordered.currentCompany[0] : "",
    matches: state.firestore.ordered.matches ? state.firestore.ordered.matches : []
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
        }
      ];
    })
  )(DiscoverPage)
);
