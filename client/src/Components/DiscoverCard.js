import React from "react";
import styled from "styled-components";
import {slate_grey} from './~reusables/variables/colors';
import {body_2, body_1} from './~reusables/variables/font-sizes';

const Wrap = styled.div`
  /* Rectangle */

  margin: 0 auto;
  width: 1260px;
  height: 680px;
  left: 180px;
  top: 220px;

  /* White */
  background: #ffffff;
`;
const Card = styled.div`
  /* Background */

  position: absolute;
  width: 350px;
  height: 560px;
  left: 636px;
  top: 292px;

  /* White */
  background: #ffffff;
  /* Faded Black */
  border: 1px solid ${slate_grey};
  box-sizing: border-box;
  border-radius: 8px;
  margin: 0 auto;
  text-align: center;
  line-height: 20px;
  font-size: ${body_2};
`;

const ImageContainer = styled.div`
  background-color: #97a2b9;
  border-radius: 100%;
  height: 8rem;
  width: 50%;
  margin: 1rem auto;
`;

const Header = styled.div`
  font-size: ${body_1};
`;
const SubHeader = styled.div`
font-size: ${body_1};
color: ${slate_grey};
`;

const DetailSection = styled.div`
border-top: 1px solid ${slate_grey};
  margin: 0 auto;
  text-align: center;
  line-height: 1.5rem;
  font-size: ${body_2};
`;

const DiscoverCard = ({ data }) => {
  const infoHeader = data.qualifications ? "Qualifications" : 'Category';
  const info = data.qualifications ? data.qualifications : data.category;
  const listView = data.jobs ? data.jobs : data.experience;
  console.log(listView);

  return (
    <Wrap>
      {listView.map(item => {
        return( <Card>
          <ImageContainer />
          
            <Header>{data.name}</Header>
            <SubHeader>{item.title}</SubHeader>
            <p>{data.email}</p>
            <p>{data.location}</p>
          
          <DetailSection>
          <SubHeader>About</SubHeader>
            <p>{data.about}</p>
          </DetailSection>

          <DetailSection>
          <SubHeader>{infoHeader}</SubHeader>
            <p>{info}</p>
            </DetailSection>
            <DetailSection>
            <SubHeader>Description</SubHeader>
            <ul>
              <li>{item.experience || item.company}</li>
              <li>{item.description}</li>
            </ul>
            
          </DetailSection>
        </Card>
        )
      })}
    </Wrap>
  );
};

export default DiscoverCard;
