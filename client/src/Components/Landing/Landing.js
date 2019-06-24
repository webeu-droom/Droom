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
  html {
    min-height: 100%;
  }

  body {
    min-height: 100%;
  }
`;

export default Landing;
