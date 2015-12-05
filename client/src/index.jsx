import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import RecordsImporter from './views/recordsImporter';

const App = () => {
  return (<div>
    <Provider store={store}>
      <RecordsImporter></RecordsImporter>
    </Provider>
  </div>)
}

render(<App/>, document.getElementById('app-root'));
