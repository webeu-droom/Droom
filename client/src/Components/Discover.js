import React, { useState, useEffect} from 'react';
import styled from "styled-components";
import listings from '../mock';
import DiscoverCard from './DiscoverCard';
import {ButtonPrimary, ButtonTertiary} from './~reusables/atoms/Buttons';

const Container = styled.div`
margin: 0 auto;
width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: relative;
  overflow: hidden;
  padding: 3rem;

`;

export const Discover =(props)=>{
    const [list, setList] = useState([]);
    const [selected, setSelected] = useState(0);
    const listType = props.match.params.type;

    useEffect(()=>{
        const stateRender = listType === 'jobs'? listings[0].companies : listings[1].allcandidates;
    setList(stateRender);
    },[listType]);

    let lastCard = list.length - 1
    
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
        <div>
            Discover Business and people...
            <Container>
            <ButtonTertiary onClick={leftClick}>
    REJECT
    </ButtonTertiary>
            {list.map((arr, index)=>{
                return (
                    
                    <DiscoverCard data={arr} key={arr.id} display={selected === index? 'on': 'off'}/>
                    
                    )
            })}
            <ButtonPrimary onClick={rightClick}>
    APPROVE
    </ButtonPrimary>
    </Container>
        </div>
    )
}
export default Discover;
