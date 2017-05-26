var React = require('react');
var Link = require('react-router-dom').Link;


var Header = React.createClass({

    render: function(){
        var user = ([]);
        var timelineSearch = ([]);

        var logo = [];
        if(location.hash.indexOf("/login") == -1){
            console.log("inside logo");
            logo = (<Link to={'/timelinelist'}><span className="logo">Timeline</span></Link>);
        }

        if(this.props.username){
            user = (<span className="username">Welcome, {this.props.username}!</span>);
            timelineSearch = (<input className="timeline-filter form-control" type="text" onChange={this.props.timelineFilterChange} placeholder="Type to filter in this timeline" />);
        }
        var html = (<header>
                        {logo}
                        {timelineSearch}
                        {user}
                    </header>);
        return html;
    }
});

module.exports = Header;