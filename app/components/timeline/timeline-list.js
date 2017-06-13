var React = require('react');
var Link = require('react-router-dom').Link;
var Holdable = require('react-touch').Holdable;
var TimelineModal = require('../modal/modal.js');


class TimelineList extends React.Component{
    constructor(p){
        super(p);
        this.state = {
            showTimelineActions: false
        };
        this.holdComplete = this.holdComplete.bind(this);
    }
    itemClick(itm){
        return (e) => {
            console.log("click", itm, this.props, history, this.props.history);
        };
    }

    holdComplete(){
        this.setState({ showTimelineActions: true });
    }
    render() {
        var html;
        html = (
            <div className="timeline-list">
                {this.props.List.map((itm, i) => {
                    return (
                        <Holdable key={i} onHoldComplete={this.holdComplete}>
                            <div className="timeline-list-item row" onClick={this.props.onClick(itm)}>
                                <div className="col-xs-12 col-md-10 main">
                                    <div className="name">{itm.name}</div>
                                    <div className="desc">{itm.desc}</div>
                                </div>
                                <div className="col-md-2 hidden-sm hidden-xs actions">
                                    <span onClick={this.props.editTimeline(itm)} className="glyphicon glyphicon-pencil edit"></span>
                                    &nbsp;
                                    <span onClick={this.props.deleteTimeline(itm)} className="glyphicon glyphicon-trash delete"></span>
                                </div>
                                <hr/>

                                <TimelineModal visible={this.state.showTimelineActions} close={() => this.setState({showTimelineActions: false})}>
                                    <div className="edit" onClick={this.props.editTimeline(itm)}>Edit</div>
                                    <div className="delete" onClick={this.props.deleteTimeline(itm)}>Delete</div>
                                </TimelineModal>
                            </div>
                        </Holdable>
                    );
                })}
                <div className="create-timeline-link"><i className="glyphicon glyphicon-plus-sign"></i><Link to={"/timeline/create"} className="link desc">Create a new timeline</Link></div>
            </div>
        );
        return html;
    }
}

module.exports = TimelineList;