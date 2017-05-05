var React = require('react');
var connect = require('react-redux').connect;
var Login = require('../components/login/login.js');
var authSuccess = require("../actions/main.js").AuthenticationSuccess;
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

const goToDefaultPage = (history) => {
    history.push('/timelinelist');
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
            goToDefaultPage(ownProps.history);
        }
    }

    return {
        isAuthenticated: state.Authentication ? state.Authentication.isAuthenticated: false
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    console.log("mapDispatchToProps");
    var username = sessionStorage.getItem("username");
    var userid = sessionStorage.getItem("userid");
    console.log("username", username);
    if(username && userid){ 
        dispatch(authSuccess(username, userid));
        if(ownProps.history.location.pathname.indexOf('/timeline') == -1){
            goToDefaultPage(ownProps.history);
        }
    }
    return {
        login: (data) => {
            console.log("login", data);
            return getUser(data.username).then((response) => {
                if(response){
                    sessionStorage.setItem("username", data.username);
                    sessionStorage.setItem("userid", response._id.$oid);
                    console.log("userid", response._id.$oid);
                    dispatch(authSuccess(data.username, response._id.$oid));
                    if(ownProps.history.location.pathname.indexOf('/timeline') == -1){
                        goToDefaultPage(ownProps.history);
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
                            if(response){
                                resolve();
                                sessionStorage.setItem("username", data.username);
                                sessionStorage.setItem("userid", response._id.$oid);
                                console.log("response", response._id.$oid);
                                dispatch(authSuccess(data.username, response._id.$oid));
                                goToDefaultPage(ownProps.history);
                            }else{
                                reject("Error occurred");
                            }
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