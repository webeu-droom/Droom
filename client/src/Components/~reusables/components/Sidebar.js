import React from "react";
import styled from "styled-components";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import {
  firestoreConnect,
  firebaseConnect,
  isEmpty,
  isLoaded
} from "react-redux-firebase";
import ProfileImage from "./ProfileImage";
import SideNavItem from "./SideNavItem";
import { tablet_max_width } from "../variables/media-queries";
import { faded_blue } from "../variables/colors";
import { medium_space_1 } from "../variables/spacing";
import logo from "../assets/grey-logo.png";

const SidebarContainer = ({ icons, texts, sidebarUser, sidebarCompany }) => {
  let name = '';
  if (sidebarUser) {
    name = sidebarUser.name;
  } else if (sidebarCompany) {
    name = sidebarCompany.name;
  }
  return (
    <StyledSidebar>
      <ProfileImage name={name} />
      <div className="nav-items">
        <SideNavItem icon={icons.search} text={texts.search} path="/discover" />
        <SideNavItem icon={icons.match} text={texts.match} path="/match" />
        <SideNavItem
          icon={icons.settings}
          text={texts.settings}
          path="/profile"
        />
      </div>
      <div className="empty-div" />
      <div className="grey-logo">
        <img src={logo} alt="" />
      </div>
    </StyledSidebar>
  );
};

const StyledSidebar = styled.aside`
  min-height: 90vh;
  width: 180px;
  padding: ${medium_space_1} ${medium_space_1};

  display: flex;
  flex-direction: column;
  background-color: ${faded_blue};

  .nav-items {
    padding: ${medium_space_1} 0;
  }

  .empty-div {
    flex-grow: 1;
  }

  .grey-logo {
    margin: 0 auto;
    width: 70%;

    img {
      width: 100%;
    }
  }

  @media only screen and (max-width: ${tablet_max_width}) {
    display: none;
  }
`;

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    sidebarUser: state.firestore.ordered.sidebarUser
      ? state.firestore.ordered.sidebarUser[0]
      : "",
    sidebarCompany: state.firestore.ordered.sidebarCompany
      ? state.firestore.ordered.sidebarCompany[0]
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
          storeAs: "sidebarUser"
        },
        {
          collection: "companies",
          where: ["companyEmail", "==", `${props.auth.email}`],
          storeAs: "sidebarCompany"
        }
      ];
    })
  )(SidebarContainer)
);
