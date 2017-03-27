require('./header.scss');
var React = require('react');


var Header = React.createClass({
    render: function(){
        var html = (<header>
                        <input className="timeline-filter form-control" type="text" onChange={this.props.timelineFilterChange} placeholder="Type to filter in this timeline" />
                    </header>);
        return html;
    }
});

module.exports = Header;