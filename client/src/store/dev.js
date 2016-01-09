'use strict';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk';
import reducer from '../reducer';
import devtools from '../components/devtools';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  autoRehydrate(),
  devtools.instrument()
)(createStore);

export function createNewStore(initialState) {
  const store = finalCreateStore(reducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducer', () =>
      store.replaceReducer(require('../reducer')).default
    );
  }

  persistStore(store);

  return store;
};

export default createNewStore();
