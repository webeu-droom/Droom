import React, { useState, useEffect } from "react";
import styled from "styled-components";
import listings from "../../data/mock";
import { ButtonPrimary, ButtonTertiary } from "../../~reusables/atoms/Buttons";
import DiscoverHeader from "./DiscoverHeader";
import DiscoverCard from "./DiscoverCard";
import {tablet_max_width} from '../../~reusables/variables/media-queries'

const CardWrap = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 70%;
padding: 0 10rem;
@media only screen and (max-width: ${tablet_max_width}) {
    flex-direction: column;
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

  const rightClick = () => {
    if (selected === lastCard) {
      setSelected(0);
    } else {
      setSelected(selected + 1);
    }
  };

  return (
    <StyledMatchBody>
      <DiscoverHeader props={props}/>
      <CardWrap>
      <ButtonTertiary onClick={leftClick}>REJECT</ButtonTertiary>
            {list.map((arr, index) => {
              return (
                <DiscoverCard
                  data={arr}
                  key={arr.id}
                  display={selected === index ? "on" : "off"}
                />
              );
            })}
            <ButtonPrimary onClick={rightClick}>APPROVE</ButtonPrimary>
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
