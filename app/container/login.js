var React = require('react');
var connect = require('react-redux').connect;
var Login = require('../components/login/login.js');
var authSuccess = require("../actions/authentication.js").AuthenticationSuccess;
var fetchData = require('../utils/ajax').fetchData;

const getUser = (username) => {
    var url = "https://api.mlab.com/api/1/databases/tln/collections/user/";
    var query = { q: { username: { $eq: username } } };
    return fetchData(url, { method: 'GET', params: query }).then((response) => {
        if(response && response.length > 0){
            return response[0];
        }else{
            return null;
        }
    });
};

const createUser = (username) => {
    var url = "https://api.mlab.com/api/1/databases/tln/collections/user/";
    var data = {username};
    return fetchData(url, { method: 'POST', body: data }).then((response) => {
        console.log("user creation successful", response);
        return {username: response.username, id: response._id.$oid};
    });
};

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
        if(ownProps.history.location.pathname.indexOf('/timeline') == -1){
            ownProps.history.push('/timeline');
        }
    }
    return {
        login: (data) => {
            console.log("login", data);
            return getUser(data.username).then((response) => {
                if(response){
                    sessionStorage.setItem("username", data.username);
                    dispatch(authSuccess(data.username));
                    if(ownProps.history.location.pathname.indexOf('/timeline') == -1){
                        ownProps.history.push('/timeline');
                    }
                }else{
                    throw new Error("Username does not exist");
                }
            });
        },
        signup: (data) => {
            console.log("signup", data);
            return new Promise(function(resolve, reject){
                getUser(data.username).then((response) => {
                    if(response){
                        reject("username exists");
                    }else{
                        createUser(data.username).then((response) =>{
                            getUser(data.username).then((response) => {
                                if(response){
                                    resolve();
                                    sessionStorage.setItem("username", data.username);
                                    dispatch(authSuccess(data.username, data.id));
                                    ownProps.history.push('/timeline');
                                }else{
                                    reject("Error occurred");
                                }
                            });
                        });
                    }
                }).catch(reject);
            });
        }
    };
};

module.exports = connect(
        mapStateToProps, 
        mapDispatchToProps

    )(Login);