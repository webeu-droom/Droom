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

const UserDiscover = ({ props }) => {
  const { jobs, companies, candidates, auth, user } = props;
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState(0);
  const [filteredCoy, setFilteredCoy] = useState("");
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
    const cleanData = processedData(jobs, [...companies]);
    setList(cleanData);
  }, [companies, jobs]);

  const companySpecificJobs = processedData(jobs, [...companies]);
  const LoggedUser = candidates.filter(candidate => {
    if (user !== undefined && user.userEmail === auth.email) {
      return candidate.id === user.id;
    }
  });

  let availableCoy = [];

  const getFilteredCoy = chosenListing => {
    setFilteredCoy([]);
    let activeUser = LoggedUser.find(currentUser => {
      return currentUser.id === chosenListing;
    });

    setActiveList(activeUser);
    let array = ["dislikedJobListings", "likedJobListings"];
    for (let i = 0; i < 2; i++) {
      let filterGroup =
        availableCoy.length > 0 ? availableCoy : companySpecificJobs;

      if (activeUser) {
        let UsersCategory = Object.values(activeUser[array[i]]);
        availableCoy = filterGroup.filter(coy => {
          let companyToRemove = UsersCategory.find(user => {
            return coy.id === user;
          });
          if (companyToRemove) {
            return false;
          } else {
            return true;
          }
        });
        setFilteredCoy(availableCoy);
        setList(filteredCoy);
      }
    }
  };

  const leftClick = () => {
    let ref = props.firestore.collection("users").doc(activeList.id);
    ref
      .update({
        dislikedJobListings: [
          ...activeList.dislikedJobListings,
          filteredCoy[selected].id
        ]
      })
      .then(res => {
        getFilteredCoy(activeList.id);
      });
  };

  const rightClick = () => {
    let ref = props.firestore.collection("users").doc(activeList.id);
    ref
      .update({
        likedJobListings: [
          ...activeList.likedJobListings,
          filteredCoy[selected].id
        ]
      })
      .then(res => {
        getFilteredCoy(activeList.id);
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
        {filteredCoy.map((arr, index) => {
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
    if (LoggedUser.length > 0) {
      getFilteredCoy(LoggedUser[0].id);
    }
    return <ComponentLoader />;
  };

  return (
    <StyledMatchBody onKeyDown={handleKeyPress} tabIndex="0">
      <DiscoverHeader props={props} jobs={jobs} companies={companies} />
      {list.length !== 0 ? renderCard() : renderLoader()}
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
  )(UserDiscover)
);
