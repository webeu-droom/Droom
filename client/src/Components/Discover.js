import React, { useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import listings from '../mock';
import DiscoverCard from './DiscoverCard';
import {ButtonPrimary, ButtonTertiary} from './~reusables/atoms/Buttons';
import {body_2, body_1} from './~reusables/variables/font-sizes';

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
const NavBar = styled.div`
display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  position: relative;
  overflow: hidden;
  a{
    padding: 3rem;
    text-decoration: none;
  }
`;
const Header = styled.div`
  font-size: ${body_1};
  text-align: center;
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
        <NavBar>
        <Link to="/discover/jobs">Jobs</Link>
      <Link to="/discover/candidates">Candidates</Link>
        </NavBar>
        <Header>Discover Business and people</Header>
            
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
