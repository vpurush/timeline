export const TimeLineItems = function(prevState, action){
    if(action.type == "RECEIVE_TIMELINE_DATA"){
        return action.data;
    }else{
        return prevState || [];
    }
};

export const FetchingTimeLineItems = function(prevState, action){
    if(action.type == "START_TIMELINE_FETCH"){
        return true;
    }else if(action.type == "RECEIVE_TIMELINE_DATA"){
        return false;
    }
    return prevState || false;
};

export const FilteredTimeLineItems = function(prevState, action){
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

export const LastUpdated = (prevState, action) =>{
    if(action.type == "RECEIVE_TIMELINE_DATA"){
        return new Date().toLocaleTimeString();
    }else{
        return prevState || "";
    }
};

export const EditTimeLineItem = (prevState, action) =>{
    if(action.type == "EDIT_TIMELINE_ITEM"){
        return action.timelineItem;
    }else{
        return prevState || null;
    }
};

export const TimelineList = (prevState, action) => {
    if(action.type == 'RECEIVE_TIMELINE_LIST'){
        console.log("RECEIVE_TIMELINE_LIST received");
        return action.data;
    }else{
        return prevState || [];
    }
};