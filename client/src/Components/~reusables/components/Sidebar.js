import React from "react";
import styled from "styled-components";
import ProfileImage from "./ProfileImage";
import SideNavItem from './SideNavItem'
import { tablet_max_width } from "../variables/media-queries";
import { faded_blue } from "../variables/colors";

const SidebarContainer = ({icons, texts}) => {
  return (
    <StyledSidebar>
      <ProfileImage
        name="Felix Hawke"
        image="https://randomuser.me/api/portraits/men/86.jpg"
      />
      <div className="nav-items">
        <SideNavItem icon={icons.search} text={texts.search}  />
        <SideNavItem icon={icons.match} text={texts.match}  />
        <SideNavItem icon={icons.settings} text={texts.settings} />
      </div>
      <div className="empty-div" />
    </StyledSidebar>
  );
};

const StyledSidebar = styled.aside`
  min-height: 100vh;
  width: 180px;

  display: flex;
  flex-direction: column;
  background-color: ${faded_blue};

  .empty-div {
    flex-grow: 1;
  }

  @media only screen and (max-width: ${tablet_max_width}) {
    display: none;
  }
`;

export default SidebarContainer;
