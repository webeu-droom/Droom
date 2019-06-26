import React from "react";
import styled from "styled-components";
import ChatBody from "./ChatBody";
import LayoutSidebar from "../../~reusables/components/Sidebar";
import { sidebarIcons, sidebarTexts } from "../../data/sidebar";
import MobileNavbar from "../../~reusables/components/MobileNavbar";
import { tablet_max_width } from "../../~reusables/variables/media-queries";

const Chat = () => {
  return (
    <StyledChat>
      <LayoutSidebar icons={sidebarIcons} texts={sidebarTexts} />
      <MobileNavbar icons={sidebarIcons} texts={sidebarTexts} />
      <ChatBody></ChatBody>
    </StyledChat>
  );
};

const StyledChat = styled.div`
  display: flex;
  @media only screen and (max-width: ${tablet_max_width}) {
    flex-direction: column;
  }
`;

export default Chat;
