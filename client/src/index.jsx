import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import RecordsImporter from './views/recordsImporter';
import MapStations from './views/map';

const App = () => {
  return (<div>
    <Provider store={store}>
      <div>
        <RecordsImporter></RecordsImporter>
        <MapStations></MapStations>
      </div>
    </Provider>
  </div>)
}

render(<App/>, document.getElementById('app-root'));
