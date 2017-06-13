var React = require('React');
var Route = require('react-router').Route;
var Redirect = require('react-router').Redirect;
var Header = require('../../container/header.js');
var ShowTimeLine = require('../../container/showtimeline.js');
var TimeLineList = require('../../container/timeline-list.js');
var NotFound = require('../not-found/not-found.js');
var Switch = require('react-router-dom').Switch;
var CreateEditTimelineItem = require('../../container/create-edit-timeline-item.js');
var CreateEditTimeline = require('../../container/create-edit-timeline.js');
var Login = require('../../container/login.js');

window.onhashchange = (e) =>{
    console.log("hash change", e);
    e.preventDefault();
    return false;
};

var Page = React.createClass({
    render: function(match){

        var authenticatedRoutes = ([]);
        var redirect;

        if(this.props.isAuthenticated){
            authenticatedRoutes = ([<Route key="/timelineitem/create" path="/timeline/:timelineid/timelineitem/create" component={CreateEditTimelineItem} canNavigate={false}></Route>,
                                    <Route key="/timelineitem/edit" path="/timeline/:timelineid/timelineitem/:timeLineItemId/edit" component={CreateEditTimelineItem}></Route>,
                                    <Route key="/timeline/edit" path="/timeline/:timelineid/edit" component={CreateEditTimeline}></Route>,
                                    <Route key="/timeline/create" path="/timeline/create" component={CreateEditTimeline}></Route>,
                                    <Route key="/timeline" path="/timeline/:timelineid" component={ShowTimeLine}></Route>,
                                    <Route key="/timelinelist" path="/timelinelist" component={TimeLineList}></Route>]);
            redirect = (<Redirect from="*" to="/timelinelist"></Redirect>);
        }else{
            redirect = (<Redirect from="*" to="/login"></Redirect>);
        }

        
        var html;
        html = (
            <div className="page container">
                <Header store={this.props.store}></Header>
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    {authenticatedRoutes}
                    {redirect}
                    
                    <Route path="/not-found" component={NotFound}></Route>
                </Switch>
            </div>
        )

        return html;
    }
});

module.exports = Page;