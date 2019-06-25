import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import listings from "../mock";
import DiscoverCard from "./DiscoverCard";
import LayoutSidebar from "./~reusables/components/Sidebar";
import { sidebarIcons, sidebarTexts } from "./data/sidebar";
import { ButtonPrimary, ButtonTertiary } from "./~reusables/atoms/Buttons";

const DiscoverWrapper = styled.div`
  width: 100%;
  display: flex;
`;
const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Container = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: relative;
  overflow: hidden;
  padding: 3rem;
  margin: 0 auto;
`;
const NavBar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  position: relative;
  overflow: hidden;
  a {
    padding: 3rem;
    text-decoration: none;
  }
`;

export const Discover = props => {
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
    <div>
      <DiscoverWrapper>
        <LayoutSidebar icons={sidebarIcons} texts={sidebarTexts} />
        <Content>
          <NavBar>
            <Link to="/discover/jobs">Jobs</Link>
            <Link to="/discover/candidates">Candidates</Link>
          </NavBar>
          <Container>
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
          </Container>
        </Content>
      </DiscoverWrapper>
    </div>
  );
};
export default Discover;
