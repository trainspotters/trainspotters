'use strict';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk';
import reducer from '../reducer';

export function createNewStore() {
  const store = compose(
    applyMiddleware(thunk),
    autoRehydrate(),
  )(createStore)(reducer);
  persistStore(store);
  return store;
}

export default createNewStore();
