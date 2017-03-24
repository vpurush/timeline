var combineReducers = require('redux').combineReducers;

var TimeLineList = function(prevState, action){
    console.log("timelinelist", prevState);
    if(action.type == "RECEIVE_TIMELINE_DATA"){
        return action.data;
    }else{
        return prevState || [];
    }
};

var FetchingTimeLineList = function(prevState, action){
    if(action.type == "START_TIMELINE_FETCH"){
        return true;
    }else if(action.type == "RECEIVE_TIMELINE_DATA"){
        return false;
    }
    return prevState || false;
};

var reducer = combineReducers({
    TimeLineList,
    FetchingTimeLineList
});

module.exports = reducer;