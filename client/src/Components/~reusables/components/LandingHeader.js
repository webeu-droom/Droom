import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ButtonPrimary, ButtonSecondary } from "../atoms/Buttons";
import { small_space, large_space } from "../variables/spacing";
import logo from "../assets/logo.png";
import { tablet_max_width } from "../variables/media-queries";

const LandingHeader = props => {
  return (
    <StyledHeader>
      <nav>
        <div>
          <Link to="/">
            <div className="LogoIcon">
              <img src={logo} alt="Droom Logo" />
            </div>
          </Link>
        </div>
        <ul className="links">
          <Link to="/login">
            <ButtonSecondary>Login</ButtonSecondary>
          </Link>
          <Link to="/register">
            <ButtonPrimary className="last-button">Sign Up</ButtonPrimary>
          </Link>
        </ul>
      </nav>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  border-bottom: 1px solid #eaeaea;

  nav {
    display: flex;
    height: 12vh;
    min-height: 60px;
    max-height: 90px;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 ${small_space};
    justify-content: space-between;
    align-items: center;

    .last-button {
      margin-left: ${large_space};
    }

    .LogoIcon {
      height: 50px;
      margin-right: 16px;
      padding-right: 16px;

      img {
        height: inherit;
      }
    }

    @media only screen and (max-width: ${tablet_max_width}) {
      button {
        display: none;
      }
    }
  }
`;

export default LandingHeader;
