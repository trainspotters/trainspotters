import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import Home from './views/home';

const App = () => {
    return (<div>
        <Provider store={store}>
            <Home></Home>
        </Provider>
    </div>)
}

render(<App/>, document.getElementById('app-root'));
