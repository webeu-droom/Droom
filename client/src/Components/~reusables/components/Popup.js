import React from "react";
import styled from "styled-components";
import { ButtonPrimary } from "../atoms/Buttons";
import { source_sans_pro } from "../variables/font-family";
import { black, faded_blue } from "../variables/colors";
import { heading_3 } from "../variables/font-sizes";
import Image from '../assets/popup-background.png'

class Popup extends React.Component {
  render() {
    return (
      <StyledPopup>
        <div className="popup">
          <div className="popup-inner">
            <h3>{this.props.text}</h3>
            <ButtonPrimary onClick={this.props.closePopup}>OK</ButtonPrimary>
          </div>
        </div>
      </StyledPopup>
    );
  }
}

const StyledPopup = styled.div`
  z-index: 100;

  h4 {
    text-align: center;
    font-family: ${source_sans_pro};
    color: ${black};
    font-size: ${heading_3};
  }

  .popup {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .popup-inner {
    background: ${faded_blue};
    background-image: url(${Image});
    background-size: cover;
    position: absolute;
    left: 25%;
    right: 25%;
    top: 25%;
    bottom: 25%;
    margin: auto;
    border-radius: 20px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media only screen and (max-width: 500px) {
    .popup-inner {
      left: 15%;
      right: 15%;
    }
  }
`;

export default Popup;
