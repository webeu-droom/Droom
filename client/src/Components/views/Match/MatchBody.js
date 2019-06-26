import React from "react";
import styled from "styled-components";
import MatchHeader from "./MatchHeader";
import MatchCard from "./MatchCard";

const MatchBody = () => {
  return (
    <StyledMatchBody>
      <MatchHeader />

      {/* If Employee, Render Employee Body Components */}
      <div className="match-cards">
      <MatchCard
        chatId="1"
        image="https://randomuser.me/api/portraits/men/86.jpg"
        name="Felix Hawke"
        message="We're a group of highly-motivated individuals making the tech industry more accessible by providing educational opportunities to underserved individuals."
        title="Full Stack Developer"
        location="Dublin, Ireland"
      />
      <MatchCard
        chatId="2"
        image="https://randomuser.me/api/portraits/men/86.jpg"
        name="Felix Hawke"
        message="Accessible by providing educational opportunities to underserved individuals."
        title="Full Stack Developer"
        location="Dublin, Ireland"
      />
      <MatchCard
        chatId="3"
        image="https://randomuser.me/api/portraits/men/86.jpg"
        name="Felix Hawke"
        message="We're a group of highly-motivated individuals making the tech industry more accessible by providing educational opportunities to underserved individuals."
        title="Full Stack Developer"
        location="Dublin, Ireland"
      />
      <MatchCard
        chatId="4"
        image="https://randomuser.me/api/portraits/men/86.jpg"
        name="Felix Hawke"
        message="Individuals making the tech industry more accessible by providing educational opportunities to underserved individuals."
        title="Full Stack Developer"
        location="Dublin, Ireland"
      />
      </div>
      {/* If Company, Render Employee Body Components */}
    </StyledMatchBody>
  );
};

const StyledMatchBody = styled.div`
  min-height: 100vh;
  background: white;
  width: 100%;
  .match-cards {
    display: flex;
    flex-wrap: wrap;
  }
`;

export default MatchBody;
