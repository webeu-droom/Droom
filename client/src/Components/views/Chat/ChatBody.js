import React from "react";
import styled from "styled-components";
import ChatHeader from "./ChatHeader";
import { slate_grey } from "../../~reusables/variables/colors";
import { medium_space_1 } from "../../~reusables/variables/spacing";

const ChatBody = () => {
  return (
    <StyledListingBody>
      <ChatHeader />
      <div className="chat-window">

      </div>
      
    </StyledListingBody>
  );
};

const StyledListingBody = styled.div`
  min-height: 100vh;
  background: white;
  width: 100%;

  .chat-window {
    height: 600px;
    border: 1px solid ${slate_grey};
    border-radius: 8px;
    margin: ${medium_space_1};
  }
`;

export default ChatBody;
