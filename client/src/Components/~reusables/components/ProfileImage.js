import React from 'react';
import styled from 'styled-components';
import { black, white } from '../variables/colors';
import { body_1 } from '../variables/font-sizes'

const ProfileImage = ({name, image}) => {
    return (
        <StyledImage>
            <div>
                <img src={image} alt="" />
            </div>
            <p>{name}</p>
        </StyledImage>
    )
}

const StyledImage = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div {
        border-radius: 50%;
        border: 3px solid ${white};
        width: 80px;
        height: 80px;

        img {
            border-radius: inherit;
            width: inherit;
            height: inherit;
        }
    }

    p {
        text-align: center;
        color: ${black};
        font-size: ${body_1}
    }
`

export default ProfileImage;
