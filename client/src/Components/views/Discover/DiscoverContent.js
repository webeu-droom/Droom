import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import { blue } from "../../~reusables/variables/colors";
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

const DiscoverContent = ({ props }) => {
  const { jobs, companies, candidates, auth, company, user } = props;
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState(0);
  // const [chosenListing, setChosenListing] = useState({});
  const [filteredUsers, setFilteredUsers] = useState("");
  const listType = props.match.params.type;
  const processedData = (arr1, arr2) => {
    let sortData = [];
    arr1.map(job => {
      return arr2.map(coy => {
        if (coy.id === job.companyId) {
          sortData.push({
            ...job,
            name: coy.name,
            email: coy.companyEmail,
            bio: coy.companyDescription
          });
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

  const companySpecificJobs = processedData(jobs, [...companies]);
  const sortedCoy = companySpecificJobs.filter(job => {
    if (company !== undefined && company.companyEmail === auth.email) {
      return job.companyId === company.id;
    }
  });

  let availableUsers = [];

  const getFilteredUsers = chosenListing => {
    if (chosenListing === "all-listings") {
      if (sortedCoy) {
        let userSort = sortedCoy.map(coy => {
          let unLikedUsers = coy.dislikedUser;
          if (unLikedUsers.length !== 0) {
            return candidates.map(candidate => {
              return unLikedUsers.map(user => {
                if (candidate.id !== user.id) {
                  availableUsers = [...availableUsers, candidate];
                }
                return availableUsers;
              });
            });
          } else {
            return (availableUsers = [...availableUsers, ...candidates]);
          }
        });
        let unique = new Set(...userSort);
        let data = [...unique];
        setList(data);
      }
    } else {
      setFilteredUsers([]);
      let activeJob = sortedCoy.find(currentJob => {
        return currentJob.companyId === chosenListing;
      });

      if (activeJob) {
        let unLikedUser = Object.values(activeJob.dislikedUser);
        if (unLikedUser.length === 0) {
          setList(candidates);
        } else {
          let userSort = candidates.map(candidate => {
            return unLikedUser.map(user => {
              console.log(user);
              if (candidate.id !== user.id) {
                return (availableUsers = [...availableUsers, candidate]);
              }
            });
          });
          setFilteredUsers([...filteredUsers, ...userSort]);
          setList(filteredUsers);
        }
      }
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
    if (event.key === "ArrowRight") {
      rightClick();
    }
  };

  if (!list) {
    return (
      <StyledMatchBody onKeyDown={handleKeyPress} tabIndex="0">
        <DiscoverHeader props={props} getFilteredUsers={getFilteredUsers} />
        <CardWrap>
          <Loader type="Circles" color={blue} height="500" width="500" />
        </CardWrap>
      </StyledMatchBody>
    );
  }
  return (
    <StyledMatchBody onKeyDown={handleKeyPress} tabIndex="0">
      <DiscoverHeader
        props={props}
        jobs={jobs}
        companies={companies}
        sortedCoy={sortedCoy}
        getFilteredUsers={getFilteredUsers}
      />
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
