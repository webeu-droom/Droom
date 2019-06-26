import React from "react";
import styled from "styled-components";
import {
  extra_small_space,
  small_space,
} from "../../~reusables/variables/spacing";
import {
  white,
  blue,
  faded_blue,
  black
} from "../../~reusables/variables/colors";
import { body_1 } from "../../~reusables/variables/font-sizes";
import { source_sans_pro } from "../../~reusables/variables/font-family";

const ChatMessage = ({ isUser, message, image }) => {
  if (isUser) {
    return (
      <YourMessage>
        <div className="your-content">{message}</div>
        <div className="your-img">
          <img src={image} alt="" />
        </div>
      </YourMessage>
    );
  } else {
    return (
      <TheirMessage>
        <div className="their-img">
          <img src={image} alt="" />
        </div>
        <div className="their-content">{message}</div>
      </TheirMessage>
    );
  }
};

export default ChatMessage;

const YourMessage = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-bottom: ${small_space};

  .your-content {
    background: ${blue};
    font-size: ${body_1};
    font-family: ${source_sans_pro};
    color: ${white};
    padding: 12px;
    border-bottom-left-radius: 20px;
    border-top-right-radius: 20px;
    max-width: 75%;
  }

  .your-img {
    border-radius: 50%;
    border: 3px solid ${white};
    width: 48px;
    height: 48px;
    margin-left: ${extra_small_space};

    img {
      border-radius: inherit;
      width: inherit;
      height: inherit;
    }
  }

  @media only screen and (max-width: 500px) {
    .your-img {
      display:none;
    }
    .your-content {
      font-size: 14px;
      max-width: 65%;
    }
  }
`;

const TheirMessage = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: ${small_space};

    .their-content {
      background: ${faded_blue};
      font-size: ${body_1};
      font-family: ${source_sans_pro};
      color: ${black};
      padding: 12px;
      border-bottom-left-radius: 20px;
      border-top-right-radius: 20px;
      max-width: 75%;
    }

    .their-img {
    border-radius: 50%;
    border: 3px solid ${white};
    width: 48px;
    height: 48px;
    margin-right: ${extra_small_space};

    img {
      border-radius: inherit;
      width: inherit;
      height: inherit;
    }
    }

    @media only screen and (max-width: 500px) {
    .their-img {
        width: 40px;
        height: 40px;
    }
    .their-content {
        font-size: 14px;
        max-width: 60%;
    }
  }
`;
