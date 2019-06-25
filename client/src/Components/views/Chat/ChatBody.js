import React from "react";
import styled from "styled-components";
import ChatHeader from "./ChatHeader";

const ChatBody = () => {
  return (
    <StyledListingBody>
      <ChatHeader />
      {/* CODE HERE */}
    </StyledListingBody>
  );
};

const StyledListingBody = styled.div`
  min-height: 100vh;
  background: white;
  width: 100%;
`;

export default ChatBody;
