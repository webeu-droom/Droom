import React from "react";
import styled from "styled-components";
import { light_grey, black } from "../~reusables/variables/colors";
import { medium_space_3 } from "../~reusables/variables/spacing";
import { ButtonTertiary } from "../~reusables/atoms/Buttons";
import { tablet_max_width } from "../~reusables/variables/media-queries";

const ProfileHeader = ({handleLogout}) => {
  return (
    <StyleMH>
      <h1>Profile</h1>
      <ButtonTertiary onClick={handleLogout}>
        Sign Out
      </ButtonTertiary>
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

  button {
    margin-right: ${medium_space_3};
  }

  background-color: ${light_grey};

  @media only screen and (max-width: ${tablet_max_width}) {
    display: none;
  }
`;

export default ProfileHeader;
