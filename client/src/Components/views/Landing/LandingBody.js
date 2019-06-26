import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import hero from "../../~reusables/assets/hero.png";
import { ButtonPrimary, ButtonSecondary } from "../../~reusables/atoms/Buttons";
import { source_sans_pro } from "../../~reusables/variables/font-family";
import {
  heading_1,
  body_hero,
  heading_2,
  body_1
} from "../../~reusables/variables/font-sizes";
import { tablet_max_width } from "../../~reusables/variables/media-queries";
import {
  small_space,
  medium_space_1,
  medium_space_2
} from "../../~reusables/variables/spacing";
import { black } from "../../~reusables/variables/colors";

const LandingBody = () => {
  return (
    <StyledBody>
      <div className="text">
        <h1>The Best Way to Find Your Dream Job</h1>
        <p>
          Droom matches candidates and companies based on a simple swipe
          gestures.
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
    width: 40%;
    padding: 0 2.5%;
  }

  .image {
    padding: ${small_space} 0;
    width: 55%;
    img {
      width: 100%;
    }
  }

  .buttons-container {
    display: flex;
    button {
      margin-bottom: ${small_space};
      margin-right: ${small_space};
    }
  }

  h1,
  p {
    font-family: ${source_sans_pro};
    color: ${black};
  }

  h1 {
    font-weight: 600;
    font-size: ${heading_1};
  }

  p {
    font-size: ${body_hero};
    margin-bottom: ${medium_space_2};
  }

  @media only screen and (max-width: ${tablet_max_width}) {
    flex-direction: column;

    .text {
      width: 90%;
      padding-bottom: ${medium_space_1};

      h1 {
        font-size: ${heading_2};
      }
    }

    .buttons-container {
      flex-wrap: wrap;
      justify-content: flex-start;
    }

    .image {
      padding: 0 0 ${small_space} 0;
      width: 90%;
    }
  }
`;

export default LandingBody;
