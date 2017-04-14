var React = require('react');


module.exports = React.createClass({

    getInitialState: function(){

        return {
            username: "",
            error: null
        };
    },
    setUsername: function(e){
        this.setState({
            username: e.target.value
        });
    },
    submit: function(e){
        var data = {
            username: this.state.username
        };
        this.props.login(data);
    },
    signup: function(e){
        var data = {
            username: this.state.username
        };
        this.props.signup(data);
    },
    render: function(){
        var html;
        html = (
            <div className="login">
                <form>
                    <fieldset>
                        <legend>Please login</legend>
                        <div className="error-message">{this.state.error}&nbsp;</div>
                        <div className="form-group">
                            <label htmlFor="title">Username</label>
                            <input type="text" className="form-control" id="title" placeholder="Username" value={this.state.username} onChange={this.setUsername}/>
                        </div>
                        <button type="button" className="btn btn-default" onClick={this.submit}>Submit</button>
                        <button type="button" className="btn btn-default" onClick={this.signup}>Signup</button>
                    </fieldset>
                </form>
            </div>
        );

        return html;
    }
});