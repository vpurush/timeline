var React = require('React');
var connect = require('react-redux').connect;
var createEditTimeline = require('../components/timeline/create-edit-timeline.js');
var createTimelineAction = require('../actions/timeline.js').createTimeline;
var fetchData = require('../utils/ajax.js').fetchData;

const mapStateToProps = (state, ownProps) => {
    if(ownProps.match.url.indexOf("/timelineitem/create") != -1){
        return {
            title: "",
            description: "",
            datetime: new Date()
        };
    }else{
        if(state.Timeline.EditTimelineItem){
            var dateTime = new Date(state.Timeline.EditTimelineItem.dateTime);
            var date = dateTime.getFullYear() + "-" + dateTime.getMonth() + "-" + dateTime.getDate();
            var time = dateTime.getHours() + ":" + dateTime.getMinutes() + ":" + dateTime.getSeconds();

            return {
                title: state.Timeline.EditTimelineItem.title,
                description: state.Timeline.EditTimelineItem.description,
                datetime: dateTime,
                id: state.Timeline.EditTimelineItem._id.$oid
            };
        }
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createEditTimeline: (id, timelineItem) => {
            console.log("submit called", timelineItem);

            if(!id){
                var url = "https://api.mlab.com/api/1/databases/tln/collections/timelineitem";
                return fetchData(url, { method: 'POST', body: timelineItem }).then((e) => {
                    console.log("create success", e);
                    ownProps.history.push('/timeline');
                }).catch((e) => {
                    console.log("create failed", e);
                    throw e;
                });
            }else{
                var url = "https://api.mlab.com/api/1/databases/tln/collections/timelineitem/" + id;
                return fetchData(url, { method: 'PUT', body: timelineItem }).then((e) => {
                    console.log("edit success", e);
                    ownProps.history.push('/timeline');
                }).catch((e) => {
                    console.log("edit failed", e);
                    throw e;
                });
            }
        }
    };
};

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(createEditTimeline);