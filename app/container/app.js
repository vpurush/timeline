var React = require('react');
var ReactDOM = require('react-dom');
var ShowTimeLine = require('./showtimeline.js');
var createStore = require('redux').createStore;
var applyMiddleware = require('redux').applyMiddleware;
var Provider = require('react-redux').Provider;
var reducer = require('../reducers/main.js');
var thunkMiddleware = require('redux-thunk').default;
var Header = require('./header.js');
require('../stylesheets/main.scss');

const store = createStore(
                    reducer,
                    applyMiddleware(thunkMiddleware)
                );

ReactDOM.render(
    <Provider store={store}>
        <div>
            <Header store={store}></Header>
            <ShowTimeLine></ShowTimeLine>
        </div>
    </Provider>,    
    document.getElementById('app')
);