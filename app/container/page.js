var React = require('react');
var connect = require('react-redux').connect;
var Page = require('../components/page/page.js');

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.Authentication ? state.Authentication.isAuthenticated : false,
        store: ownProps.store
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    };
};

module.exports = connect(
    mapStateToProps, 
    mapDispatchToProps)(Page);