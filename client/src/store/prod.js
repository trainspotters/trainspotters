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
  const config = {
    blacklist: ['selectedDays'],
  };

  persistStore(store, config);

  return store;
}

export default createNewStore();
