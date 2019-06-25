import React from "react";
import styled from "styled-components";
import ProfileBody from "./ProfileBody";
import LayoutSidebar from "../~reusables/components/Sidebar";
import { sidebarIcons, sidebarTexts } from "../data/sidebar";
import MobileNavbar from "../~reusables/components/MobileNavbar";
import { tablet_max_width } from "../~reusables/variables/media-queries";

const Profile = () => {
  return (
    <StyledMatch>
      <LayoutSidebar icons={sidebarIcons} texts={sidebarTexts} />
      <MobileNavbar icons={sidebarIcons} texts={sidebarTexts} />
      <ProfileBody>Page Specific Content</ProfileBody>
    </StyledMatch>
  );
};

const StyledMatch = styled.div`
  display: flex;
  @media only screen and (max-width: ${tablet_max_width}) {
    flex-direction: column;
  }
`;

export default Profile;
