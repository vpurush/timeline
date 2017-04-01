var React = require('React');
var Route = require('react-router').Route;
var Redirect = require('react-router').Redirect;
var Header = require('../../container/header.js');
var ShowTimeLine = require('../../container/showtimeline.js');
var NotFound = require('../not-found/not-found.js');
var Switch = require('react-router-dom').Switch;

var Page = React.createClass({
    render: function(match){
        console.log("match", match, this.props.router);

        
        var html;
        html = (
            <div className="page">
                <Header></Header>
                <Switch>
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