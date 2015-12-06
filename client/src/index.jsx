import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import RecordsImporter from './views/recordsImporter';
import MapStations from './views/map';
import TimeTable from './views/timetable'

const App = () => {
  return (<div>
    <Provider store={store}>
      <div>
        <TimeTable></TimeTable>
        <RecordsImporter></RecordsImporter>
        <MapStations></MapStations>
      </div>
    </Provider>
  </div>)
}

render(<App/>, document.getElementById('app-root'));
