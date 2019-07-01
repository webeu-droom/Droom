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
import ComponentLoader from "../../~reusables/components/ComponentLoader";

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

const CompanyDiscover = ({ props }) => {
  const { jobs, companies, candidates, auth, company } = props;
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState(0);
  const [filteredUsers, setFilteredUsers] = useState("");
  const [activeList, setActiveList] = useState({});
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
    setList(candidates);
  }, [candidates]);

  const companySpecificJobs = processedData(jobs, [...companies]);
  const sortedCoy = companySpecificJobs.filter(job => {
    if (company !== undefined && company.companyEmail === auth.email) {
      return job.companyId === company.id;
    }
  });

  let availableUsers = [];

  const getFilteredUsers = chosenListing => {
    setFilteredUsers([]);
    let activeJob = sortedCoy.find(currentJob => {
      return currentJob.id === chosenListing;
    });

    setActiveList(activeJob);
    let array = ["dislikedUser", "likedUser"];
    for (let i = 0; i < 2; i++) {
      let filterGroup = availableUsers.length > 0 ? availableUsers : candidates;

      if (activeJob) {
        let UsersCategory = Object.values(activeJob[array[i]]);
        availableUsers = filterGroup.filter(candidate => {
          let candidateToRemove = UsersCategory.find(user => {
            return candidate.id === user;
          });
          if (candidateToRemove) {
            return false;
          } else {
            return true;
          }
        });
        setFilteredUsers(availableUsers);
        setList(filteredUsers);
      }
    }
  };

  const leftClick = () => {
    let ref = props.firestore.collection("jobListings").doc(activeList.id);
    ref
      .update({
        dislikedUser: [...activeList.dislikedUser, filteredUsers[selected].id]
      })
      .then(res => {
        getFilteredUsers(activeList.id);
      });
  };

  const rightClick = () => {
    let ref = props.firestore.collection("jobListings").doc(activeList.id);
    ref
      .update({
        likedUser: [...activeList.likedUser, filteredUsers[selected].id]
      })
      .then(res => {
        getFilteredUsers(activeList.id);
      });
  };

  const handleKeyPress = event => {
    if (event.key === "ArrowLeft") {
      leftClick();
    }
    if (event.key === "ArrowRight") {
      rightClick();
    }
  };

  const renderCard = () => {
    return (
      <CardWrap>
        <ButtonTertiary className="button-left" onClick={leftClick}>
          REJECT
        </ButtonTertiary>
        {filteredUsers.map((arr, index) => {
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
    );
  };

  const renderLoader = () => {
    if (sortedCoy.length > 0) {
      getFilteredUsers(sortedCoy[0].id);
    }
    return <ComponentLoader />;
  };

  return (
    <StyledMatchBody onKeyDown={handleKeyPress} tabIndex="0">
      <DiscoverHeader
        props={props}
        jobs={jobs}
        companies={companies}
        sortedCoy={sortedCoy}
        getFilteredUsers={getFilteredUsers}
      />
      {filteredUsers.length !== 0 ? renderCard() : renderLoader()}
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
  )(CompanyDiscover)
);
