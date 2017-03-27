var combineReducers = require('redux').combineReducers;

var TimeLineList = function(prevState, action){
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

var FilteredTimeLineList = function(prevState, action){
    console.log("filteredtimelinelist reducer", prevState);
    if(action.type == "TIMELINE_FILTER"){
        if(action.filterText && action.filterText.length > 0){
            var filterTextLower = action.filterText.toLowerCase();
            var output = action.timelineItems.filter(function(t){
                return t.title.toLowerCase().indexOf(filterTextLower) != -1 || t.desc.toLowerCase().indexOf(filterTextLower) != -1;
            });
            return output;
        }else{
            return action.timelineItems;
        }
    } else if(action.type == "RECEIVE_TIMELINE_DATA"){
        return action.data;
    }
    return prevState || [];
};

var reducer = combineReducers({
    TimeLineList,
    FetchingTimeLineList,
    FilteredTimeLineList
});

module.exports = reducer;