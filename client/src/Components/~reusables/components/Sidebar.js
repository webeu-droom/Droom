import React from "react";
import styled from "styled-components";
import ProfileImage from "./ProfileImage";
import SideNavItem from "./SideNavItem";
import { tablet_max_width } from "../variables/media-queries";
import { faded_blue } from "../variables/colors";
import { medium_space_1 } from "../variables/spacing";
import logo from "../assets/grey-logo.png";

/*
Replace hardcoded name and image with that of the user/company
Icons and icon text are decided by the parent component i.e. Match/Discover etc
*/

const SidebarContainer = ({ icons, texts }) => {
  return (
    <StyledSidebar>
      <ProfileImage
        name="Felix Hawke"
        image="https://randomuser.me/api/portraits/men/86.jpg"
      />
      <div className="nav-items">
        <SideNavItem icon={icons.search} text={texts.search} path="/discover" />
        <SideNavItem icon={icons.match} text={texts.match} path="/match" />
        <SideNavItem icon={icons.settings} text={texts.settings} path="/profile" />
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

export default SidebarContainer;
