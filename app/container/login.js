var React = require('react');
var connect = require('react-redux').connect;
var Login = require('../components/login/login.js');
var authSuccess = require("../actions/authentication.js").AuthenticationSuccess;

const mapStateToProps = (state, ownProps) => {
    console.log("mapStateToProps");
    if(state.Authentication && state.Authentication.isAuthenticated){
        console.log("location.hash", ownProps.location.pathname, ownProps.history.location.pathname, ownProps.history);
        if(ownProps.history.location.pathname.indexOf('/timeline') == -1){
            console.log("inside");
            ownProps.history.push('/timeline');
        }
    }

    return {
        isAuthenticated: state.Authentication ? state.Authentication.isAuthenticated: false
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    console.log("mapDispatchToProps");
    var username = sessionStorage.getItem("username");
    console.log("username", username);
    if(username){ 
        dispatch(authSuccess(username));
        ownProps.history.push('/timeline');
    }
    return {
        login: (data) => {
            console.log("login", data);
            sessionStorage.setItem("username", data.username);
            dispatch(authSuccess(data.username));
            ownProps.history.push('/timeline');
        },
        signup: (data) => {
            console.log("signup", data);
            return fetchData(url, { method: 'PUT', body: data }).then((e) => {
                sessionStorage.setItem("username", data.username);
                dispatch(authSuccess(data.username));
                ownProps.history.push('/timeline');
            });
        }
    };
};

module.exports = connect(
        mapStateToProps, 
        mapDispatchToProps

    )(Login);