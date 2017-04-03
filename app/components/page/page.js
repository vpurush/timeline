var React = require('React');
var Route = require('react-router').Route;
var Redirect = require('react-router').Redirect;
var Header = require('../../container/header.js');
var ShowTimeLine = require('../../container/showtimeline.js');
var NotFound = require('../not-found/not-found.js');
var Switch = require('react-router-dom').Switch;
var CreateTimeline = require('../../container/create-timeline.js');

var Page = React.createClass({
    render: function(match){
        console.log("match", match, this.props.router);

        
        var html;
        html = (
            <div className="page container">
                <Header></Header>
                <Switch>
                    <Route path="/timeline/create" component={CreateTimeline}></Route>
                    <Route path="/timeline" component={ShowTimeLine}></Route>
                    <Redirect exact from="/" to="/timeline"></Redirect>
                    <Route path="*" component={NotFound}></Route>
                </Switch>
            </div>
        )

        return html;
    }
});

module.exports = Page;