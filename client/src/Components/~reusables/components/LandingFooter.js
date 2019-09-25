import React from "react";
import styled from "styled-components";
import { small_space } from "../variables/spacing";
import { black, blue } from "../variables/colors";
import { body_1 } from "../variables/font-sizes";

const Footer = () => {
  return (
    <StyledFooter>
      <footer>
        <p>
          Made with{" "}
          <span role="img" aria-label="coffee">
            ☕️
          </span>{" "}
          and{" "}
          <span role="img" aria-label="love">
            🤘🏼️
          </span>{" "}
          by <a href="https://github.com/ThorbenBender">Thorben</a>,{" "}
          <a href="https://github.com/IsaacAderogba">Isaac</a> and{" "}
          <a href="https://github.com/PascalUlor">Pascal</a>
        </p>
      </footer>
    </StyledFooter>
  );
};

const StyledFooter = styled.div`
  border-top: 1px solid #eaeaea;

  footer {
    height: 12vh;
    min-height: 60px;
    max-height: 90px;
    margin: 0 auto;
    max-width: 1280px;
    display: flex;
    align-items: center;
    padding: 0 ${small_space};

    p {
      font-size: ${body_1};
      color: ${black};
    }

    a {
      text-decoration: none;
      color: ${blue};
      cursor: pointer;
      transition-duration: 0.3s;
    }

    a:hover {
      opacity: 0.8;
      transition: color 0.3s ease-in-out;
    }
  }
`;

export default Footer;
