import React from "react";
import styled from "styled-components";
import MatchHeader from "./MatchHeader";

const MatchBody = () => {
  return (
    <StyledMatchBody>
      <MatchHeader />
      {/* CODE HERE */}
    </StyledMatchBody>
  );
};

const StyledMatchBody = styled.div`
  min-height: 100vh;
  background: white;
  width: 100%;
`;

export default MatchBody;
