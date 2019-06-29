import React from "react";
import styled from "styled-components";
import { slate_grey } from "../../~reusables/variables/colors";
import { body_2, body_1 } from "../../~reusables/variables/font-sizes";
import ProfileImage from "../../~reusables/components/ProfileImage";
import { small_space, extra_small_space } from "../../~reusables/variables/spacing";

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
margin-top: ${small_space};
display: flex;
justify-content: center;
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
  box-shadow: 0px 1px 5px rgba(151, 162, 185, 0.3), 0px 3px 4px rgba(151, 162, 185, 0.16), 0px 2px 4px rgba(151, 162, 185, 0.19);
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

const DiscoverCard = ({ data, display }) => {
  const infoHeader = data.qualifications ? "Qualifications" : "Category";
  const info = data.qualifications ? data.qualifications : data.category;
  const listView = data.jobs ? data.jobs : data.experience;

  return (
    <Wrap>
      {listView.map((item, index) => {
        return (
          <Card key={index} display={display}>
            <ImageWrap>
            <ProfileImage
              name={data.name}
              image="data:image/png;base64,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"
            />
            </ImageWrap>
            

            <SubHeader>{item.title}</SubHeader>
            <p className="email">{data.email}</p>
            <p className="location">{data.location}</p>

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
        );
      })}
    </Wrap>
  );
};

export default DiscoverCard;
