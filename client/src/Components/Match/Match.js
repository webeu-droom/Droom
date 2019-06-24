import React from "react";
import styled from "styled-components";
import LayoutBody from "./MatchBody";
import LayoutSidebar from "../~reusables/components/Sidebar";
import {candSidebarIcons, candSidebarTexts} from "../data/sidebar"

const Match = () => {
  return (
    <StyledMatch>
      <LayoutSidebar icons={candSidebarIcons} texts={candSidebarTexts} />
      <LayoutBody>
        Page Specific Content
      </LayoutBody>
    </StyledMatch>
  );
};

const StyledMatch = styled.div`
    display: flex;
`

export default Match;
