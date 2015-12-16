'use strict';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import RecordsImporter from './views/recordsImporter';
import JourneysVisualization from './views/journeysVisualization.jsx'

const App = () => {
  return (<div>
    <Provider store={store}>
      <div>
        <RecordsImporter/>
        <JourneysVisualization/>
      </div>
    </Provider>
  </div>)
}

render(<App/>, document.getElementById('app-root'));
