var React = require('react');
var TimeLineItem = require('./timeline-item');


var TimeLine = React.createClass({
    render: function(){
        var html;

        var lastUpdate = "";
        if(this.props.LastUpdated.length > 0){
            lastUpdate = (<div className="last-updated">last updated at {this.props.LastUpdated}</div>);
        }

        html = (
            <div className="timeline container">
                {lastUpdate}
                {this.props.List.map((itm, i) => {
                    return (
                        <div key={i} className="item">
                            <div className="circle"></div>
                            <div className="date-time">{itm.displayDatetime}</div>
                            <div className="line"></div>
                            <TimeLineItem key={Math.random()} title={itm.title} img={itm.img} desc={itm.desc}> </TimeLineItem>
                        </div>
                    );
                })}
            </div>
        );
        return html;
    }
});

module.exports = TimeLine;