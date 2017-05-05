var React = require('react');
var TimeLineItem = require('./timeline-item');
var Link = require('react-router-dom').Link;
var Dropdown = require('react-bootstrap').Dropdown;
var MenuItem = require('react-bootstrap').MenuItem;
var Glyphicon = require('react-bootstrap').Glyphicon;


var TimeLine = React.createClass({
    selectMenuItem: function(e){
        if(e.action == 'Edit'){
            this.props.editTimelineItem(e.data);
        }else if(e.action == 'Delete'){
            this.props.deleteTimelineItem(e.data);
        }
    },
    
    render: function(){
        var html;

        var lastUpdate = "";
        if(this.props.LastUpdated.length > 0){
            lastUpdate = (<div className="last-updated">last updated at {this.props.LastUpdated}</div>);
        }

        html = (
            <div className="timeline">
                {lastUpdate}
                {this.props.List.map((itm, i) => {
                    return (
                        <div key={i} className="item">
                            <div className="circle"></div>
                            <div className="date-time">{itm.displayDatetime}</div>

                            <Dropdown id="dropdown-custom-1" onSelect={this.selectMenuItem}>
                                <Dropdown.Toggle>
                                    <Glyphicon glyph="edit" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="super-colors">
                                    <MenuItem eventKey={{action:'Edit', data: itm}}>Edit</MenuItem>
                                    <MenuItem eventKey={{action:'Delete', data: itm}}>Delete</MenuItem>
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className="line"></div>
                            <TimeLineItem key={Math.random()} title={itm.title} img={itm.img} desc={itm.desc}> </TimeLineItem>
                        </div>
                    );
                })}
                <div className="item">
                    <div className="circle"></div>
                    <div className="add-timeline-item">
                        <i className="glyphicon glyphicon-plus"></i>
                        <Link to={"/timeline/" + this.props.timelineid + "/timelineitem/create"}>Add Event</Link>
                    </div>
                </div>
            </div>
        );
        return html;
    }
});

module.exports = TimeLine;