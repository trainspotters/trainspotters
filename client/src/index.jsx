'use strict';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import RecordsImporter from './views/recordsImporter';
import MapStations from './views/map';
import JourneysTables from './views/timetable';
import AllJourneysStat from './views/allJourneysStat.jsx'

const App = () => {
  return (<div>
    <Provider store={store}>
      <div>
        <RecordsImporter/>
        <AllJourneysStat/>
        <JourneysTables/>
        <MapStations/>
      </div>
    </Provider>
  </div>)
}

render(<App/>, document.getElementById('app-root'));
