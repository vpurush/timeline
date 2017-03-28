var connect = require('react-redux').connect;
var Header = require('../components/header/header.js');
var filterTimelineItems = require('../actions/main.js').filterTimelineItems;
var _ = require('lodash');

const mapStateToProps = (state, ownProps) => {
    return {

    };
};

const handleTimelineFilterChange = _.debounce(function(val, dispatch, ownProps){
                                        dispatch(filterTimelineItems(val, ownProps.store.getState().Timeline.TimeLineItems));
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