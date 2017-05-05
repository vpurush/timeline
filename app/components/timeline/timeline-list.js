var React = require('react');
var Link = require('react-router-dom').Link;


class TimelineList extends React.Component{
    itemClick(itm){
        return (e) => {
            console.log("click", itm, this.props, history, this.props.history);
        };
    }
    render() {
        var html;
        html = (
            <div className="timeline-list">
                {this.props.List.map((itm, i) => {
                    return (
                        <div key={i} className="timeline-list-item" onClick={this.props.onClick(itm)}>
                            <div className="name">{itm.name}</div>
                            <div className="desc">{itm.desc}</div>
                        </div>
                    );
                })}
                <div className="create-timeline-link"><i className="glyphicon glyphicon-plus-sign"></i><Link to={"/timeline/create"} className="link desc">Create a new timeline</Link></div>
            </div>
        );
        return html;
    }
}

module.exports = TimelineList;