var React = require('React');
var moment = require('moment');

var CreateEditTimeline = React.createClass({
    getInitialState: function(){
        return {
            title: this.props.title,
            description: this.props.description,
            date: moment(this.props.datetime).format('YYYY-MM-DD'),
            time: moment(this.props.datetime).format('HH:mm:ss'),
            error: null,
            id: this.props.id
        }
    },
    setDate: function(e){
        this.setState({ date: e.target.value });
    },
    setTime: function(e){
        this.setState({ time: e.target.value });
    },
    setTitle: function(e){
        this.setState({ title: e.target.value });
    },
    setDescription: function(e){
        this.setState({ description: e.target.value });
    },
    submit: function(){
        var data = {
            dateTime: new Date(this.state.date + " " + this.state.time),
            title: this.state.title,
            desc: this.state.description,
            timelineid: this.props.timelineid
        };
        this.props.createEditTimeline(this.state.id, data).catch(() => {
            console.log("set error");
            this.setState({error: 'Error occurred while saving data'});
        });
    },
    render: function(){
        var classname = 'create-timeline';
        var html;

        html = (
            <div className={classname}>
                <form>
                    <div className="error-message">{this.state.error}&nbsp;</div>
                    <div className="form-group">
                        <label htmlFor="datetime">When?</label>
                        <input type="date" id="date" className="form-control date" value={this.state.date} onChange={this.setDate}/>
                        <input type="time" id="time" className="form-control time" value={this.state.time} onChange={this.setTime}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title" placeholder="Title" value={this.state.title} onChange={this.setTitle}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea className="form-control" id="description" placeholder="Description" value={this.state.description} onChange={this.setDescription}/>
                    </div>
                    <button type="button" className="btn btn-default" onClick={this.submit}>Submit</button>
                </form>
            </div>
        );
        return html;
    }
});

module.exports = CreateEditTimeline;