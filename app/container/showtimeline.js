var React = require('react');
var connect = require('react-redux').connect;
var TimeLine = require('../components/timeline/timeline.js');
var fetchTimelineItems = require('../actions/main.js').fetchTimelineItems;

const mapStateToProps = (state, ownProps) => {
    console.log("map state to props", ownProps);

    return {
        List: state.Timeline.FilteredTimeLineItems
    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch(fetchTimelineItems()); 
    return {

    };
};

var ShowTimeline = connect(
    mapStateToProps,
    mapDispatchToProps
)(TimeLine);

module.exports = ShowTimeline;