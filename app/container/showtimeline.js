var React = require('react');
var connect = require('react-redux').connect;
var TimeLine = require('../components/timeline/timeline.js');
var fetchTimelineItemsAction = require('../actions/main.js').fetchTimelineItems;
var editTimelineItemAction = require('../actions/main.js').editTimelineItem;

const mapStateToProps = (state, ownProps) => {
    console.log("map state to props", ownProps);

    return {
        List: state.Timeline.FilteredTimeLineItems,
        LastUpdated: state.Timeline.LastUpdated
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    dispatch(fetchTimelineItemsAction()); 
    return {
        editTimelineItem: (data) => {
            dispatch(editTimelineItemAction(data));
            ownProps.history.push('/timelineitem/' + data._id.$oid + '/edit');
        },
        deleteTimelineItem: (data) => {

        }
    };
};

var ShowTimeline = connect(
    mapStateToProps,
    mapDispatchToProps
)(TimeLine);

module.exports = ShowTimeline;