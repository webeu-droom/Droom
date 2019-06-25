import * as types from './actionTypes';


export const fetching = status => {
    return {
        type: types.FETCHING,
        payload: status
    }
}


export const success = data =>{
    return {
        type: types.SUCCESS,
        payload: data
    }
}

export const failure = mssg =>{
    return {
        type: types.FAILURE,
        payload: mssg
    }
}
