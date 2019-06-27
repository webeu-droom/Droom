import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  medium_space_1,
  small_space,
  extra_small_space
} from "../../~reusables/variables/spacing";
import { slate_grey, white, black } from "../../~reusables/variables/colors";
import { source_sans_pro } from "../../~reusables/variables/font-family";
import {
  heading_4,
  body_1,
  body_2
} from "../../~reusables/variables/font-sizes";
import { useSpring, animated } from "react-spring";

const MatchCard = ({ image, message, name, title, location, matchesId }) => {
  const [hovered, setHovered] = useState(false);
  const hoverEffect = useSpring({
    to: {
      transform: `scale(${hovered ? 1.05 : 1})`,
      boxShadow: hovered
        ? "-1px 8px 8px 0px rgba(0, 0, 0, 0.3)"
        : "0px 0px 0px 0px rgba(0, 0, 0, 0.2)"
    }
  });

  return (
    <StyledMatchCard
      style={hoverEffect}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <Link to={`/match/chat/${matchesId}`}>
        <div className="img">
          <img src={image} alt="" />
        </div>
        <div className="content">
          <div className="header">
            <h4>{name}</h4>
            <p>{title}</p>
            <p className="location">{location}</p>
          </div>
          <p className="message">{message}</p>
        </div>
      </Link>
    </StyledMatchCard>
  );
};

const StyledMatchCard = styled(animated.div)`
  flex: 1 1 500px;
  border: 1px solid ${slate_grey};
  border-radius: 2px;
  margin: ${medium_space_1} ${medium_space_1} 0 ${medium_space_1};
  padding: ${small_space};

  a {
    text-decoration: none;
    color: ${black};
    display: flex;
    align-items: center;
    cursor: pointer;
  }

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
    background-color: ${slate_grey};

    img {
      border-radius: inherit;
      width: inherit;
      height: inherit;
    }
  }

  .content {
    width: 100%;
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

  @media only screen and (max-width: 500px) {
    margin: ${small_space} ${extra_small_space} 0 ${extra_small_space};
    .content {
      p {
        font-size: ${body_2};
      }
      .message {
        max-width: 60vw;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .header {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;

        .location {
          display: none;
        }
      }
    }
  }
`;

export default MatchCard;
