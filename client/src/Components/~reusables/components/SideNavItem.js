import React from 'react';
import styled from 'styled-components';

const SideNavItem = ({icon, text}) => {
    return (
        <StyledNavItem>
              <i className="material-icons">{icon}</i>
              <span>{text}</span>
        </StyledNavItem>
    )
}

const StyledNavItem = styled.div`

`

export default SideNavItem;