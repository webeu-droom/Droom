import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { small_space } from "../variables/spacing";
import { blue, slate_grey } from "../variables/colors";

const MobileNavItem = ({ icon, text, path }) => {
  return (
    <StyledNavItem>
      <NavLink to={path} activeClassName="active-nav">
        <i className="material-icons">{icon}</i>
      </NavLink>
      <NavLink to={path} activeClassName="active-nav">
        <span>{text}</span>
      </NavLink>
    </StyledNavItem>
  );
};

const StyledNavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
      text-decoration: none;
      color: ${slate_grey};
  }



  .active-nav {
    color: ${blue};
  }

  margin-top: ${small_space};
`;

export default MobileNavItem;
