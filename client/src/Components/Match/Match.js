import React from "react";
import styled from "styled-components";
import LayoutBody from "./MatchBody";
import LayoutSidebar from "../~reusables/components/Sidebar";
import { candSidebarIcons, candSidebarTexts } from "../data/sidebar";
import MobileNavbar from "../~reusables/components/MobileNavbar";
import { tablet_max_width } from "../~reusables/variables/media-queries";

const Match = () => {
  return (
    <StyledMatch>
      <LayoutSidebar icons={candSidebarIcons} texts={candSidebarTexts} />
      <MobileNavbar icons={candSidebarIcons} texts={candSidebarTexts} />
      <LayoutBody>Page Specific Content</LayoutBody>
    </StyledMatch>
  );
};

const StyledMatch = styled.div`
  display: flex;
  @media only screen and (max-width: ${tablet_max_width}) {
    flex-direction: column;
  }
`;

export default Match;
