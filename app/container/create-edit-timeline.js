var React = require('React');
var connect = require('react-redux').connect;
var createEditTimeline = require('../components/timeline/create-edit-timeline.js');
var createTimelineAction = require('../actions/timeline.js').createTimeline;
var fetchData = require('../utils/ajax.js').fetchData;

const mapStateToProps = (state, ownProps) => {
    var timelineid = ownProps.match.params.timelineid;
    if(ownProps.match.url.indexOf("/timeline/create") != -1){
        return {
            name: "",
            description: "",
            timelineid: null,
            userid: state.Authentication.User.userid
        };
    }else{
        if(state.Timeline.EditTimeline){

            return {
                name: state.Timeline.EditTimeline.name,
                description: state.Timeline.EditTimeline.desc,
                timelineid: state.Timeline.EditTimeline._id.$oid,
                userid: state.Authentication.User.userid
            };
        }
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createEditTimeline: (id, timelineItem) => {
            var timelineid = ownProps.match.params.timelineid;
            console.log("submit called", timelineItem, timelineid);

            if(!id){
                var url = "https://api.mlab.com/api/1/databases/tln/collections/timeline";
                return fetchData(url, { method: 'POST', body: timelineItem }).then((e) => {
                    console.log("create success", e);
                    ownProps.history.push('/timelinelist/');
                }).catch((e) => {
                    console.log("create failed", e);
                    throw e;
                });
            }else{
                var url = "https://api.mlab.com/api/1/databases/tln/collections/timeline/" + id;
                return fetchData(url, { method: 'PUT', body: timelineItem }).then((e) => {
                    console.log("edit success", e);
                    ownProps.history.push('/timelinelist/');
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