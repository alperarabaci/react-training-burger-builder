import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import thunk from 'redux-thunk';


import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './store/reducer/burgerBuilder';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

/**
 * Bu nasil kod ya?!? Saglam sovdum onu diyim!
 */
const logger = state => {

    return next => {
        
        return action => {
            console.log('[Middleware] Dispatching', action);
            const result = next(action);
            console.log('[Middleware] next state', store.getState());
            return result;
        }
    }
  }

/**
 *  Redux DevTools Extension
 *  http://extension.remotedev.io/#12-advanced-store-setup
 */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(logger, thunk)));


const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();