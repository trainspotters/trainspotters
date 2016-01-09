'use strict';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

export function createNewStore() {
  return applyMiddleware(thunk)(createStore)(reducer);
}

export default createNewStore();
