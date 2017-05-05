var combineReducers = require('redux').combineReducers;
var Timeline = require('./timeline.js');
var Authentication = require('./authentication.js').Authentication;

var reducer = combineReducers({
                                Timeline: combineReducers({
                                                TimelineList: Timeline.TimelineList,
                                                TimeLineItems: Timeline.TimeLineItems,
                                                FetchingTimeLineItems: Timeline.FetchingTimeLineItems,
                                                FilteredTimeLineItems: Timeline.FilteredTimeLineItems,
                                                LastUpdated: Timeline.LastUpdated,
                                                EditTimelineItem: Timeline.EditTimeLineItem
                                            }),
                                Authentication: Authentication
                            });

module.exports = reducer;