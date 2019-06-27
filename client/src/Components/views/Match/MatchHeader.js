import React from "react";
import styled from "styled-components";
import { light_grey, black } from "../../~reusables/variables/colors";
import { medium_space_3 } from "../../~reusables/variables/spacing";
import { Dropdown } from "../../~reusables/atoms/Dropdowns";
import { tablet_max_width } from "../../~reusables/variables/media-queries";

const MatchHeader = ({ company, companyListings }) => {
  console.log(company, companyListings)
  return (
    <StyleMH>
      <h1>Matches</h1>
      {company && (
        <Dropdown>
          <option value="">All Listings</option>
        </Dropdown>
      )}
    </StyleMH>
  );
};

const StyleMH = styled.div`
  width: 100%;
  min-height: 100px;
  max-height: 200px;
  height: 20vh;
  color: ${black};

  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    margin: auto 0;
    padding-left: ${medium_space_3};
  }

  select {
    margin-right: ${medium_space_3};
  }

  background-color: ${light_grey};

  @media only screen and (max-width: ${tablet_max_width}) {
    display: none;
  }
`;

export default MatchHeader;
