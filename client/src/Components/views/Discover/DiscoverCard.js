import React from "react";
import { animated, interpolate } from "react-spring";
import styled from "styled-components";
import { slate_grey } from "../../~reusables/variables/colors";
import { body_2, body_1 } from "../../~reusables/variables/font-sizes";
import ProfileImage from "../../~reusables/components/ProfileImage";
import {
  small_space,
  extra_small_space
} from "../../~reusables/variables/spacing";

const Wrap = styled.div`
  /* Rectangle */

  margin: 0 auto;
  /* width: 1260px; */
  /* height: 680px; */

  /* White */
  background: #ffffff;

  p {
    margin: 0;
    padding: 0 ${extra_small_space} ${extra_small_space} ${extra_small_space};
  }
  .location {
    padding-top: 0;
  }
  .email {
    padding-bottom: 0;
  }
`;
const ImageWrap = styled.div`
  display: flex;
  justify-content: center;
`;
const Deck = styled(animated.div)`
  border: 1px solid ${slate_grey};
`;
const Card = styled.div`
  /* Background */
  ${props => (props.display === "on" ? `display: block;` : `display: none;`)}
  position: relative;
  width: 350px;
  height: 560px;
  margin: 0 auto;
  /* White */
  background: #ffffff;
  /* Faded Black */
  border: 1px solid ${slate_grey};
  box-sizing: border-box;
  border-radius: 8px;
  text-align: center;
  line-height: 20px;
  font-size: ${body_2};
  box-shadow: 0px 1px 5px rgba(151, 162, 185, 0.3),
    0px 3px 4px rgba(151, 162, 185, 0.16), 0px 2px 4px rgba(151, 162, 185, 0.19);
`;

const SubHeader = styled.div`
  font-size: ${body_1};
  color: ${slate_grey};
  padding: 4px 0;
`;

const DetailSection = styled.div`
  border-top: 1px solid ${slate_grey};
  margin: 0 auto;
  padding: ${extra_small_space} 0;
  text-align: center;
  line-height: 1.2rem;
  font-size: ${body_2};

  ul li {
    text-align: left;
  }
`;

const DiscoverCard = ({ data, display, trans, bind, i }) => {
  const infoHeader = data.education ? "Education" : "Requirements";
  const infoHeader2 = data.experience ? "Experience" : "Description";

  const info2 = data.experience ? data.experience : data.description;

  let dataInfo;
  if (data.education !== undefined) {
    dataInfo = <p>{data.education}</p>;
  }

  if (data.requirements !== undefined) {
    dataInfo = data.requirements.map((info, index) => (
      <p key={index}>{info}</p>
    ));
  }

  return (
    <animated.div
      key={i}
      style={{
        transform: interpolate(
          [data.x, data.y],
          (x, y) => `translate3d(${x}px,${y}px,0)`
        )
      }}
    >
      <Deck
        {...bind(i)}
        style={{
          transform: interpolate([data.rot, data.scale], trans)
        }}
      >
        <Wrap>
          <Card display={display}>
            <ImageWrap>
              <ProfileImage
                name={data.name}
                image="https://randomuser.me/api/portraits/men/86.jpg"
              />
            </ImageWrap>

            <SubHeader>{data.position}</SubHeader>
            <p>{data.email}</p>
            <p>{data.location}</p>

            <DetailSection>
              <SubHeader>Biography</SubHeader>
              <p>{data.bio}</p>
            </DetailSection>

            <DetailSection>
              <SubHeader>{infoHeader2}</SubHeader>
              <div>
                {info2.map((info, index) => {
                  return <p key={index}>{info}</p>;
                })}
              </div>
            </DetailSection>
            <DetailSection>
              <SubHeader>{infoHeader}</SubHeader>
              <div>{dataInfo}</div>
            </DetailSection>
          </Card>
        </Wrap>
      </Deck>
    </animated.div>
  );
};

export default DiscoverCard;
