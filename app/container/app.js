require('modernizr');
var React = require('react');
var ReactDOM = require('react-dom');
var ShowTimeLine = require('./showtimeline.js');
var createStore = require('redux').createStore;
var applyMiddleware = require('redux').applyMiddleware;
var Provider = require('react-redux').Provider;
var reducer = require('../reducers/main.js');
var thunkMiddleware = require('redux-thunk').default;
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var BrowserRouter = require('react-router-dom').BrowserRouter;
var HashRouter = require('react-router-dom').HashRouter;
var NotFound = require('../components/not-found/not-found.js');
var Page = require('./page.js');
require('../stylesheets/main.scss');


const store = createStore(
                    reducer,
                    applyMiddleware(thunkMiddleware)
                );

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Route path="/" component={Page}></Route>
        </HashRouter>
    </Provider>,    
    document.getElementById('app')
);