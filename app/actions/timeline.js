var fetchData = require('../utils/ajax.js').fetchData;
var moment = require('moment');

export const startTimelineItemsFetch = () => {
    return {
        type: 'START_TIMELINE_FETCH'
    };
};

export const receiveTimelineItems = (data) => {
    return {
        type: 'RECEIVE_TIMELINE_DATA',
        data: data
    };
};

const parseTimelineItems = (data) => {
    var output;
    data.forEach((d) => {
        d.displayDatetime = new Date(d.dateTime).toDateString();
    });
    output = data.sort((a, b) => {
        return moment(a.dateTime).diff(moment(b.dateTime));
    });
    return output;
};

export const fetchTimelineItems = () => {
    console.log("fetchTimelineData");
    return (dispatch, getState) => {
        console.log("fetchTimelineData inner method");
        dispatch(startTimelineItemsFetch());

        var url = "https://api.mlab.com/api/1/databases/tln/collections/timelineitem";
        fetchData(url).then((data) => {
            dispatch(receiveTimelineItems(parseTimelineItems(data)));
            console.log("data", data);
        });
    };
};

export const filterTimelineItems = (filterText, timelineItems) => {
    console.log("filtetimeline", filterText, timelineItems);
    return {
        type: 'TIMELINE_FILTER',
        filterText,
        timelineItems
    };    
};

export const editTimelineItem = (timelineItem) => {
    return {
        type: 'EDIT_TIMELINE_ITEM',
        timelineItem
    };
};