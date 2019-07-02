import React from "react";
import styled from "styled-components";
import { light_grey, black } from "../../~reusables/variables/colors";
import { medium_space_3 } from "../../~reusables/variables/spacing";
import { Dropdown } from "../../~reusables/atoms/Dropdowns";
import { tablet_max_width } from "../../~reusables/variables/media-queries";

const DiscoverHeader = ({ props, getFilteredUsers, sortedCoy }) => {
  console.log(props);
  const listType = props.location.pathname;
  const Title = listType === "/discover/jobs" ? "Companies" : "Candidates";
  const dropDownHandler = input => {
    getFilteredUsers(input.target.value);
  };
  return listType === "/discover/jobs" ? (
    <StyleMH>
      <h1>{Title}</h1>
    </StyleMH>
  ) : (
    <StyleMH>
      <h1>{Title}</h1>
      <Dropdown onChange={dropDownHandler}>
        {sortedCoy
          ? sortedCoy.map((job, index) => {
              return (
                <option key={index} value={job.id}>
                  {job.position}
                </option>
              );
            })
          : null}
      </Dropdown>
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

export default DiscoverHeader;
