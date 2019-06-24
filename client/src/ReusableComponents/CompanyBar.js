import React from "react";
import CompanyLogo from "../Icons/clear_all_24px_outlined.svg";
import styled from "styled-components";

export default function CompanyBar() {
  return (
    <StyledCompanyBar>
      <StyledCompanyBarNameContainer>
        <StyledCompanyBarName>Droom</StyledCompanyBarName>
        <StyledCompanyBarLogo src={CompanyLogo} alt="Company Logo" />
      </StyledCompanyBarNameContainer>
    </StyledCompanyBar>
  );
}

const StyledCompanyBar = styled.div`
  display: flex;
  align-items: center;
`;

const StyledCompanyBarNameContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledCompanyBarName = styled.p`
  font-size: 1.5rem;
  color: #0076ff;
`;

const StyledCompanyBarLogo = styled.img``;
