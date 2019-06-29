import React, { useState, useEffect } from "react";
import styled from "styled-components";
import listings from "../../data/mock";
import { ButtonPrimary, ButtonTertiary } from "../../~reusables/atoms/Buttons";
import DiscoverHeader from "./DiscoverHeader";
import DiscoverCard from "./DiscoverCard";

import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  firestoreConnect,
  firebaseConnect,
  isEmpty,
  isLoaded
} from "react-redux-firebase";
import { tablet_max_width } from "../../~reusables/variables/media-queries";
import {
  medium_space_3,
  small_space,
  medium_space_1,
  extra_small_space
} from "../../~reusables/variables/spacing";

const CardWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${medium_space_3};
  @media only screen and (max-width: 910px) {
    flex-wrap: wrap;
    justify-content: space between;

    > div {
      width: 100%;
    }
    button {

      box-shadow: 0px 1px 5px rgba(151, 162, 185, 0.2),
        0px 3px 4px rgba(151, 162, 185, 0.12),
        0px 2px 4px rgba(151, 162, 185, 0.14);

    }
    .button-left {
      order: 1;
      margin: ${small_space};
      margin-right: ${extra_small_space};
    }
    .button-right {
      order: 2;
      margin: ${small_space};
      margin-left: ${extra_small_space};
    }
  }
`;

const DiscoverContent = ({props}) => {
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState(0);
  const listType = props.match.params.type;

  useEffect(() => {
    const stateRender =
      listType === "jobs" ? listings[0].companies : listings[1].allcandidates;
    setList(stateRender);
  }, [listType]);

  let lastCard = list.length - 1;

  const leftClick = () => {
    if (selected === 0) {
      setSelected(lastCard);
    } else {
      setSelected(selected - 1);
    }
  };

  let lastCard = list.length - 1;

  const leftClick = () => {
    if (selected === 0) {
      setSelected(lastCard);
    } else {
      setSelected(selected - 1);
    }
  };

  const rightClick = () => {
    if (selected === lastCard) {
      setSelected(0);
    } else {
      setSelected(selected + 1);
    }
  };
  const handleKeyPress = event => {
    if (event.key === "ArrowLeft") {
      leftClick();
    }
    if(event.key === 'ArrowRight'){
      rightClick();
    }
  }

  return (
    <StyledMatchBody onKeyDown={handleKeyPress} tabIndex="0">
      <DiscoverHeader props={props}/>
      <CardWrap>

        <ButtonTertiary className="button-left" onClick={leftClick}>
          REJECT
        </ButtonTertiary>
        {list.map((arr, index) => {
          return (
            <DiscoverCard
              data={arr}
              key={arr.id}
              index={index}
              display={selected === index ? "on" : "off"}
              handleKeyPress={handleKeyPress}
            />
          );
        })}
        <ButtonPrimary className="button-right" onClick={rightClick}>
          APPROVE
        </ButtonPrimary>

      </CardWrap>
      
    </StyledMatchBody>
  );
};

const StyledMatchBody = styled.div`
  min-height: 100vh;
  background: white;
  width: 100%;
`;

export default DiscoverContent;
