import React from "react";
import styled from "styled-components";
import ListingHeader from "./ListingHeader";

const ListingBody = () => {
  return (
    <StyledListingBody>
      <ListingHeader />
      {/* CODE HERE */}
    </StyledListingBody>
  );
};

const StyledListingBody = styled.div`
  min-height: 100vh;
  background: white;
  width: 100%;
`;

export default ListingBody;
