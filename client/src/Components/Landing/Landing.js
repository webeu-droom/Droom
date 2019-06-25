import React from "react";
import styled from "styled-components";
import LandingHeader from "../~reusables/components/LandingHeader";
import LandingFooter from "../~reusables/components/LandingFooter";
import LandingBody from "./LandingBody";

const Landing = () => {
  return (
    <StyledLanding>
      <LandingHeader />
      <LandingBody />
      <LandingFooter />
    </StyledLanding>
  );
};

const StyledLanding = styled.div`
    min-height: 100%;
`;

export default Landing;
