import * as types from "../actions";
import mockdata from '../../mock'

const initialState = {
  joblistings: mockdata.businessList,
  candidates: mockdata.candidateList,
  fetching: false,
  error: null,
  accessStatus: false
};

export const Listings = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCHING:
      return {
        ...state,
        fetching: action.payload
      };
    case types.SUCCESS:
        return {
            ...state,
            joblistings: action.payload.businessList,
            candidates: action.payload.candidateList
        }
    case types.FAILURE:
        return {
            ...state, error: action.payload
        }
    default:
        return state
  }
};
