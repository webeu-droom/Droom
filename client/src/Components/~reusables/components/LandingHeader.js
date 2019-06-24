import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ButtonPrimary, ButtonSecondary } from '../atoms/Buttons'
import { small_space, large_space } from '../variables/spacing'
import { slate_grey } from '../variables/colors'
import logo from "../assets/logo.png";

const LandingHeader = props => {
  return (
    <StyledHeader>
      <nav>
        <div>
          <div className="LogoIcon">
            <img src={logo} alt="Droom Logo" />
          </div>
        </div>
        <ul className="links">
          <Link to="/login"><ButtonSecondary>Login</ButtonSecondary></Link>
          <Link to="/register"><ButtonPrimary className="last-button">Sign Up</ButtonPrimary></Link>
        </ul>
      </nav>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  border-bottom: 1px solid ${slate_grey};

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

    .last-button{
        margin-left: ${large_space};
    }

    .LogoIcon {
        height: 60px;
        margin-right: 16px;
        padding-right: 16px;

        img {
        height: inherit;
        }

        @media only screen and (max-width: 700px) {
            border: none;
        }
    }
  }
`;

export default LandingHeader;
