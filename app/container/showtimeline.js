var React = require('react');
var connect = require('react-redux').connect;
var TimeLine = require('../components/timeline/timeline.js');
var fetchTimelineItemsAction = require('../actions/main.js').fetchTimelineItems;
var editTimelineItemAction = require('../actions/main.js').editTimelineItem;
var fetchData = require('../utils/ajax.js').fetchData;
var toastr = require('toastr');

toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-bottom-center",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
};

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
            var url = "https://api.mlab.com/api/1/databases/tln/collections/timelineitem/" + data._id.$oid;
            return fetchData(url, { method: 'DELETE' }).then((e) => {
                console.log("delete success", e);
                toastr.success("Deleted successfully");
            }).catch((e) => {
                console.log("delete failed", e);
                throw e;
            });
        }
    };
};

var ShowTimeline = connect(
    mapStateToProps,
    mapDispatchToProps
)(TimeLine);

module.exports = ShowTimeline;