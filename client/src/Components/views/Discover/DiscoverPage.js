import React from "react";
import styled from "styled-components";
import DiscoverContent from './DiscoverContent';
import LayoutSidebar from "../../~reusables/components/Sidebar";
import { sidebarIcons, sidebarTexts } from "../../data/sidebar";
import MobileNavbar from "../../~reusables/components/MobileNavbar";
import { tablet_max_width } from "../../~reusables/variables/media-queries";

const DiscoverPage = (props) => {
  return (
    <StyledMatch>
      <LayoutSidebar icons={sidebarIcons} texts={sidebarTexts} />
      <MobileNavbar icons={sidebarIcons} texts={sidebarTexts} />
      <DiscoverContent props={props}/>
    </StyledMatch>
  );
};

const StyledMatch = styled.div`
  display: flex;
  @media only screen and (max-width: ${tablet_max_width}) {
    flex-direction: column;
  }
`;

export default DiscoverPage;
