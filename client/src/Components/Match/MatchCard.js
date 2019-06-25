import React from 'react';
import styled from 'styled-components';
import { medium_space_1 } from '../~reusables/variables/spacing';
import { slate_grey, white } from '../~reusables/variables/colors';

const MatchCard = ({image, message, name, title, location }) => {
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
                <p>{message}</p>
            </div>
        </StyledMatchCard>
    )
}

const StyledMatchCard = styled.div`
    border: 1px solid ${slate_grey};
    margin: ${medium_space_1};
    display: flex;
    align-items: center;

    .img {
        border-radius: 50%;
        border: 3px solid ${white};
        width: 64px;
        height: 64px;

        img {
            border-radius: inherit;
            width: inherit;
            height: inherit;
        }
    }
`

export default MatchCard;