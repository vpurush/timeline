var connect = require('react-redux').connect;
var Header = require('../presentationComponents/header.js');
var filterTimeline = require('../actions/main.js').filterTimeline;
var _ = require('lodash');

const mapStateToProps = (state, ownProps) => {
    return {

    };
};

const handleTimelineFilterChange = _.debounce(function(val, dispatch, ownProps){
                                        dispatch(filterTimeline(val, ownProps.store.getState().TimeLineList));
                                    }, 500);

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        timelineFilterChange: function(e){
            var val = e.target.value;
            handleTimelineFilterChange(val, dispatch, ownProps);
        }
    };
};

console.log("header", Header);
module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);