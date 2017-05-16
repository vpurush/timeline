var React = require('react');
var Link = require('react-router-dom').Link;


var Header = React.createClass({

    render: function(){
        var user = ([]);
        var timelineSearch = ([]);

        if(this.props.username){
            user = (<span className="username">Welcome, {this.props.username}!</span>);
            timelineSearch = (<input className="timeline-filter form-control" type="text" onChange={this.props.timelineFilterChange} placeholder="Type to filter in this timeline" />);
        }
        var html = (<header>
                        <Link to={'/timelinelist'}><span className="logo">Timeline</span></Link>
                        {timelineSearch}
                        {user}
                    </header>);
        return html;
    }
});

module.exports = Header;