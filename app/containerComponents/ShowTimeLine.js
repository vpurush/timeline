var React = require('react');
var connect = require('react-redux').connect;
var TimeLine = require('../presentationComponents/timeLine.js');
var fetchTimelineData = require('../actions/main.js').fetchTimelineData;

const mapStateToProps = (state, ownProps) => {
    console.log("map state to props", ownProps);

    return {
        List: state.TimeLineList
    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch(fetchTimelineData()); 
    return {

    };
};

var ShowTimeLine = connect(
    mapStateToProps,
    mapDispatchToProps
)(TimeLine);

module.exports = ShowTimeLine;