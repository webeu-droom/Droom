import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import listings from "../../data/mock";
import { ButtonPrimary, ButtonTertiary } from "../../~reusables/atoms/Buttons";
import DiscoverHeader from "./DiscoverHeader";
import DiscoverCard from "./DiscoverCard";
import { tablet_max_width } from "../../~reusables/variables/media-queries";

import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import {
  firestoreConnect,
  firebaseConnect,
  isEmpty,
  isLoaded
} from "react-redux-firebase";

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

const DiscoverContent = ({ props }) => {
  const { jobs, companies, candidates } = props;
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState(0);
  const listType = props.match.params.type;
  const processedData = (arr1, arr2) => {
    let sortData = [];
    arr1.map(job => {
      return arr2.map(coy => {
        if (coy.id === job.companyId) {
          sortData.push({ ...job, name: coy.name });
        }
      });
    });
    return sortData;
  };

  useEffect(() => {
    const cleanData = processedData(jobs, [...companies]);
    const stateRender = listType === "jobs" ? cleanData : candidates;
    setList(stateRender);
  }, [candidates, companies, jobs, listType]);

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
    if (event.key === "ArrowRight") {
      rightClick();
    }
  };

  return (
    <StyledMatchBody onKeyDown={handleKeyPress} tabIndex="0">
      <DiscoverHeader props={props} />
      <CardWrap>
        <ButtonTertiary onClick={leftClick}>REJECT</ButtonTertiary>
        {list.map((arr, index) => {
          return (
            <DiscoverCard
              data={arr}
              key={arr.id}
              display={selected === index ? "on" : "off"}
              handleKeyPress={handleKeyPress}
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

// export default DiscoverContent;

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    candidates: state.firestore.ordered.candidates
      ? state.firestore.ordered.candidates
      : "",
    companies: state.firestore.ordered.companies
      ? state.firestore.ordered.companies
      : "",
    jobs: state.firestore.ordered.jobs ? state.firestore.ordered.jobs : [],
    matches: state.firestore.ordered.matches
      ? state.firestore.ordered.matches
      : []
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      clearFirestore: () => dispatch({ type: "@@reduxFirestore/CLEAR_DATA" })
    },
    dispatch
  );
};

export default withRouter(
  compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    firebaseConnect(),
    firestoreConnect(props => {
      return [
        {
          collection: "jobListings",
          storeAs: "jobs"
        },
        {
          collection: "users",
          storeAs: "candidates"
        },
        {
          collection: "companies",
          where: ["companies.id", "==", `${props.jobs.id}`],
          storeAs: "companies"
        }
      ];
    })
  )(DiscoverContent)
);
