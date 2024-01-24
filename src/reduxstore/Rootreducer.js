// rootReducer.js
'use client'
import { combineReducers } from 'redux';
import Reducer from '../reduxstore/Reducer';

const Rootreducer = combineReducers({
  name: Reducer,
});

export default Rootreducer;
