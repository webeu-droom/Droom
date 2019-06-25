import React from "react";
import styled from "styled-components";
import ListingBody from "./ListingBody";
import LayoutSidebar from "../~reusables/components/Sidebar";
import { sidebarIcons, sidebarTexts } from "../data/sidebar";
import MobileNavbar from "../~reusables/components/MobileNavbar";
import { tablet_max_width } from "../~reusables/variables/media-queries";

const Listing = props => {
  return (
    <StyledListing>
      <LayoutSidebar icons={sidebarIcons} texts={sidebarTexts} />
      <MobileNavbar icons={sidebarIcons} texts={sidebarTexts} />
      <ListingBody id={props.match.params.id}>Page Specific Content</ListingBody>
    </StyledListing>
  );
};

const StyledListing = styled.div`
  display: flex;
  @media only screen and (max-width: ${tablet_max_width}) {
    flex-direction: column;
  }
`;

export default Listing;
