var React = require('React');
var moment = require('moment');

var CreateEditTimeline = React.createClass({
    getInitialState: function(){
        return {
            name: this.props.name,
            description: this.props.description,
            error: null
        }
    },
    setName: function(e){
        this.setState({ name: e.target.value });
    },
    setDescription: function(e){
        this.setState({ description: e.target.value });
    },
    submit: function(){
        var data = {
            name: this.state.name,
            desc: this.state.description,
            userid: this.props.userid
        };
        this.props.createEditTimeline(this.props.timelineid, data).catch(() => {
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
                        <label htmlFor="title">Name</label>
                        <input type="text" className="form-control" id="title" placeholder="Title" value={this.state.name} onChange={this.setName}/>
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