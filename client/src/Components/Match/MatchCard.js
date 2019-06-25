import React from "react";
import styled from "styled-components";
import {
  medium_space_1,
  small_space,
  extra_small_space
} from "../~reusables/variables/spacing";
import { slate_grey, white } from "../~reusables/variables/colors";
import { source_sans_pro } from "../~reusables/variables/font-family";
import { heading_4, body_1 } from "../~reusables/variables/font-sizes";

const MatchCard = ({ image, message, name, title, location }) => {
  return (
    <StyledMatchCard>
      <div className="img">
        <img src={image} alt="" />
      </div>
      <div className="content">
        <div className="header">
          <h4>{name}</h4>
          <p>{title}</p>
          <p>{location}</p>
        </div>
        <p className="message">{message}</p>
      </div>
    </StyledMatchCard>
  );
};

const StyledMatchCard = styled.div`
  border: 1px solid ${slate_grey};
  border-radius: 2px;
  margin: ${medium_space_1};
  padding: ${small_space};
  display: flex;
  align-items: center;
  cursor: pointer;

  h4,
  p {
    font-family: ${source_sans_pro};
    margin: 0;
    padding: 0;
  }

  h4 {
    font-size: ${heading_4};
  }

  .img {
    border-radius: 50%;
    border: 3px solid ${white};
    width: 64px;
    height: 64px;
    margin-right: ${extra_small_space};

    img {
      border-radius: inherit;
      width: inherit;
      height: inherit;
    }
  }

  .content {
    .message {
      font-size: ${body_1};
      margin-top: ${extra_small_space};
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      p {
        font-size: ${body_1};
        margin-top: 0;
        color: ${slate_grey};
      }
    }
  }
`;

export default MatchCard;
