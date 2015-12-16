'use strict';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import RecordsImporter from './views/recordsImporter.jsx';
import RecordsVisualization from './views/recordsVisualization.jsx'

const App = () => {
  return (<div>
    <Provider store={store}>
      <div>
        <RecordsImporter/>
        <RecordsVisualization/>
      </div>
    </Provider>
  </div>)
}

render(<App/>, document.getElementById('app-root'));
