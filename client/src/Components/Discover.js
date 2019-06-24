import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { fetching, success, failure } from '../redux/actions';

export const Discover =(props)=>{
    console.log('=======',props)
    return (
        <div>
            Discover Business and people...
        </div>
    )
}

const mapStateToProps = state =>{
    console.log(state);
    return {list: state.listings}
}

export default compose(
    connect(
        mapStateToProps,
        { fetching, success, failure }
      )
)(Discover);