import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  medium_space_1,
  small_space,
  extra_small_space
} from "../../~reusables/variables/spacing";
import { slate_grey, black } from "../../~reusables/variables/colors";
import { source_sans_pro } from "../../~reusables/variables/font-family";
import { body_1 } from "../../~reusables/variables/font-sizes";

const ListingSummary = ({ title, listingId }) => {
  return (
    <StyledListingSummary>
      <Link to={`/profile/listing/${listingId}`}>
        <div>{title}</div>
      </Link>
      <div>
        <i className="material-icons">delete</i>
      </div>
    </StyledListingSummary>
  );
};

const StyledListingSummary = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${medium_space_1};

  a {
    flex: 1 1 250px;
    text-decoration: none;
    color: ${black};
    div {
      font-family: ${source_sans_pro};
      font-size: ${body_1};
      border: 1px solid ${slate_grey};
      border-radius: 4px;
      padding: ${extra_small_space} ${small_space};
      display: flex;
      align-items: center;
      cursor: pointer;
      margin-right: ${extra_small_space};
    }
  }

  > div {
    margin-left: ${extra_small_space};
    border-radius: 50%;
    border: 1px solid ${slate_grey};
    padding: ${extra_small_space};
    cursor: pointer;

    i {
      font-size: ${body_1};
    }
  }
`;

export default ListingSummary;
