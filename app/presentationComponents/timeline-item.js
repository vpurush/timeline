require('./timeline-item.scss');
var React = require('react');
//var $ = require('jquery');

var TimeLineItem = React.createClass({
    render: function(){
        var html;
        var title, img, desc;
        if(this.props.title){
            title = <h3>{this.props.title}</h3>;
        }
        if(this.props.img){
            img = <img src={this.props.img} />;
        }
        if(this.props.desc){
            desc = <span>{this.props.desc}</span>;
        }
        html = (<div className="timeline-item">{title}{img}{desc}</div>);
        return html;
    }
});

module.exports = TimeLineItem;