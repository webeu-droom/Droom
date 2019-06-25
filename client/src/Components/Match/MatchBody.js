import React from "react";
import styled from "styled-components";
import MatchHeader from "./MatchHeader";

const MatchBody = () => {
  return (
    <StyledMatchBody>
      <MatchHeader />

      {/* If Employee, Render Employee Body Components */}

      {/* If Company, Render Employee Body Components */}

    </StyledMatchBody>
  );
};

const StyledMatchBody = styled.div`
  min-height: 100vh;
  background: white;
  width: 100%;
`;

export default MatchBody;
