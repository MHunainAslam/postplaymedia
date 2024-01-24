'use client'
// store.js
import { createStore } from 'redux';
import Rootreducer from '../reduxstore/Rootreducer';

const Store = createStore(Rootreducer);

export default Store;
