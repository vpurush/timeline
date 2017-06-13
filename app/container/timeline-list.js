var connect = require('react-redux').connect;
var TimelineList = require('../components/timeline/timeline-list.js');
var receiveTimelineListAction = require('../actions/main.js').receiveTimelineList;
var editTimelineAction = require('../actions/main.js').editTimeline;
var fetchTimelineList = require('../actions/main.js').fetchTimelineList;
var fetchData = require('../utils/ajax.js').fetchData;
var toastr = require('toastr');

const mapStateToProps = (state, ownProps) => {
    console.log("timelinelist - mapStateToProps");
    return {
        List: state.Timeline.TimelineList,
        onClick: function(itm){
            return (e) => {
                console.log("click", e.target);
                ownProps.history.push('/timeline/' + itm._id.$oid);
            };
        }
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    console.log("timelinelist - mapDispatchToProps", ownProps);
    dispatch(fetchTimelineList());
    // var url = "https://api.mlab.com/api/1/databases/tln/collections/timeline/";
    // var userid = ownProps.store.getState().Authentication.User.userid;
    // var query = { q: { userid: { $eq: userid } } };
    // console.log("userid", userid, query, ownProps.store.getState());
    // fetchData(url, { method: 'GET', params: query }).then((response) => {
    //     dispatch(receiveTimelineListAction(response));
    // }).catch((e) => {
    //     console.log("fetch failed", e);
    //     throw e;
    // });

    return {
        editTimeline: function(itm){
            return e => {
                e.stopPropagation();
                dispatch(editTimelineAction(itm));
                ownProps.history.push('/timeline/' + itm._id.$oid + '/edit');
                console.log("edit timeline", itm);
            };
        },
        deleteTimeline: function(itm){
            return e => {
                e.stopPropagation();
                var url = "https://api.mlab.com/api/1/databases/tln/collections/timelineitem/";
                var query = { q: { timelineid: { $eq: itm._id.$oid } } };
                return fetchData(url, { method: 'PUT', params: query, body: [] }).then((e) => {
                    console.log("delete timelineitem success", e);
                    url = "https://api.mlab.com/api/1/databases/tln/collections/timeline/" + itm._id.$oid;
                    return fetchData(url, { method: 'DELETE' }).then((e) => {
                        toastr.success("Deleted successfully");
                        ownProps.history.push('/timelinelist/');
                    });
                }).catch((e) => {
                    console.log("delete failed", e);
                    throw e;
                });
                console.log("delete timeline", itm);
            };
        }
    };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    // console.log("timelinelist - mergeProps");
    // var url = "https://api.mlab.com/api/1/databases/tln/collections/timelinelist/";
    // var query = { q: { userid: { $eq: stateProps.userid } } };
    // fetchData(url, { method: 'GET', params: query }).then((response) => {
    //     //dispatchProps.disp(response);
    // }).catch((e) => {
    //     console.log("fetch failed", e);
    //     throw e;
    // });

    return {
        List: stateProps.List,
        onClick: stateProps.onClick
    };
};

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(TimelineList);
