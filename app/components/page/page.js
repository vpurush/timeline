var React = require('React');
var Route = require('react-router').Route;
var Redirect = require('react-router').Redirect;
var Header = require('../../container/header.js');
var ShowTimeLine = require('../../container/showtimeline.js');
var NotFound = require('../not-found/not-found.js');
var Switch = require('react-router-dom').Switch;
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
            authenticatedRoutes = ([<Route key="/timelineitem/create" path="/timelineitem/create" component={CreateEditTimeline} canNavigate={false}></Route>,
                                    <Route key="/timelineitem/edit" path="/timelineitem/:timeLineItemId/edit" component={CreateEditTimeline}></Route>,
                                    <Route key="/timeline" path="/timeline" component={ShowTimeLine}></Route>]);
            redirect = (<Redirect from="*" to="/timeline"></Redirect>);
        }else{
            redirect = (<Redirect from="*" to="/login"></Redirect>);
        }

        
        var html;
        html = (
            <div className="page container">
                <Header></Header>
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