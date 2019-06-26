import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { small_space, medium_space_2 } from '../variables/spacing';
import { black, blue } from '../variables/colors'

const SideNavItem = ({icon, text, path}) => {
    return (
        <StyledNavItem>
              <NavLink to={path} activeClassName="active-nav"><i className="material-icons">{icon}</i></NavLink>
              <NavLink to={path} activeClassName="active-nav"><span>{text}</span></NavLink>
        </StyledNavItem>
    )
}

const StyledNavItem = styled.div`
    a {
        color: ${black};
        text-decoration: none;
    }

    display: flex;
    align-items: center;

    i {
        margin-right: ${small_space};
        vertical-align: middle;
    }

    .active-nav {
        color: ${blue}
    }

    margin-bottom: ${medium_space_2};
`

export default SideNavItem;