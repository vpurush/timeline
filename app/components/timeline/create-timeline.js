var React = require('React');

var CreateTimeline = React.createClass({
    getInitialState: function(){
        var dateNow = new Date();
        var date = dateNow.getFullYear() + "-" + dateNow.getMonth().toString(10) + "-" + dateNow.getDate();
        var time = dateNow.getHours() + ":" + dateNow.getMinutes() + ":" + dateNow.getSeconds();
        return {
            title: "",
            description: "",
            date: date,
            time: time,
            error: null
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
            description: this.state.description
        };
        this.props.createTimeline(data).catch(() => {
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

module.exports = CreateTimeline;