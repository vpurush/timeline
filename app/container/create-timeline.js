var React = require('React');
var connect = require('react-redux').connect;
var createTimeline = require('../components/timeline/create-timeline.js');
var createTimelineAction = require('../actions/timeline.js').createTimeline;
var fetchData = require('../utils/ajax.js').fetchData;

const mapStateToProps = (state, ownProps) => {
    return {

    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createTimeline: (timelineItem) => {
            console.log("submit called", timelineItem);
            var url = "https://api.mlab.com/api/1/databases/tln/collections/timelineitem";
            return fetchData(url, { method: 'POST', body: timelineItem }).then((e) => {
                console.log("create success", e);
                ownProps.history.push('/timeline');
            }).catch((e) => {
                console.log("create failed", e);
                throw e;
            });
        }
    };
};

module.exports = createTimeline = connect(
    mapStateToProps,
    mapDispatchToProps
)(createTimeline);