import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import hero from "../~reusables/assets/hero.png";
import { ButtonPrimary, ButtonSecondary } from "../~reusables/atoms/Buttons";
import { source_sans_pro } from "../~reusables/variables/font-family";
import { heading_1, body_hero, heading_3, body_1, heading_2 } from "../~reusables/variables/font-sizes";
import { tablet_max_width } from "../~reusables/variables/media-queries";
import {
  extra_small_space,
  small_space,
  medium_space_1
} from "../~reusables/variables/spacing";

const LandingBody = () => {
  return (
    <StyledBody>
      <div className="text">
        <h1>The Best Way to Find Your Dream Job</h1>
        <p>
          Droom matches candidates and companies based on a simple swipe
          right/swipe left mechanic.
        </p>
        <div className="buttons-container">
          <Link to="/login">
            <ButtonSecondary>Login</ButtonSecondary>
          </Link>
          <Link to="/register">
            <ButtonPrimary className="last-button">Sign Up</ButtonPrimary>
          </Link>
        </div>
      </div>
      <div className="image">
        <img src={hero} alt="Screenshots of product" />
      </div>
    </StyledBody>
  );
};

const StyledBody = styled.div`
  min-height: 76vh;
  margin: 0 auto;
  max-width: 1280px;
  padding: 0 ${small_space};
  display: flex;
  align-items: center;

  .text {
    width: 45%;
  }

  .image {
    width: 55%;
    img {
      width: 100%;
    }
  }

  .buttons-container {
      display: flex;
      justify-content: space-evenly;
    }

  h1,
  p {
    font-family: ${source_sans_pro};
  }

  h1 {
    font-weight: 600;
    font-size: ${heading_1};
  }

  p {
    font-size: ${body_hero};
  }

  @media only screen and (max-width: ${tablet_max_width}) {
    flex-direction: column;

    .text {
      width: 90%;
      margin-bottom: ${medium_space_1};

      h1 {
        font-size: ${heading_2};
      }

      p {
        font-size: ${body_hero}
      }
    }

    .buttons-container {
      flex-wrap: wrap;
      justify-content: flex-start;
      button {
        margin-bottom: ${small_space};
        margin-right: ${small_space};
      }
    }
    
    .image {
      width: 90%;
    }
  }
`;

export default LandingBody;
