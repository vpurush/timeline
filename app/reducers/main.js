var combineReducers = require('redux').combineReducers;
var Timeline = require('./timeline.js');

var reducer = combineReducers({
                                Timeline: combineReducers({
                                                TimeLineItems: Timeline.TimeLineItems,
                                                FetchingTimeLineItems: Timeline.FetchingTimeLineItems,
                                                FilteredTimeLineItems: Timeline.FilteredTimeLineItems
                                            })
                            });

module.exports = reducer;