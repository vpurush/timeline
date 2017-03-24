var React = require('react');
var ReactDOM = require('react-dom');
var ShowTimeLine = require('./ShowTimeLine.js');
var createStore = require('redux').createStore;
var applyMiddleware = require('redux').applyMiddleware;
var Provider = require('react-redux').Provider;
var reducer = require('../reducers/main.js');
var thunkMiddleware = require('redux-thunk').default;

const store = createStore(
                    reducer,
                    applyMiddleware(thunkMiddleware)
                );

ReactDOM.render(
    <Provider store={store}>
        <ShowTimeLine store={store}></ShowTimeLine>
    </Provider>,    
    document.getElementById('app')
);