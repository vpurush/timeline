var React = require('react');
var Tabs = require('react-bootstrap').Tabs;
var Tab = require('react-bootstrap').Tab;


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
    clearError: function(){
        this.setState({error: null});
    },
    submit: function(e){
        this.clearError();
        var data = {
            username: this.state.username
        };
        this.props.login(data).catch((err) => {
            this.setState({error: err.message});
        });
    },
    signup: function(e){
        this.clearError();
        var data = {
            username: this.state.username
        };
        this.props.signup(data).catch((err) => {
            this.setState({error: err});
        });
    },
    render: function(){
        var html;
        html = (
            <div className="login">  
                <Tabs defaultActiveKey={1} id="login_signup" onClick={this.clearError}>
                     <Tab eventKey={1} title="Login">
                        <form>
                            <fieldset>
                                {/*<legend>Please login</legend>*/}
                                <div className="error-message">{this.state.error}&nbsp;</div>
                                <div className="form-group">
                                    <label htmlFor="title">Username</label>
                                    <input type="text" className="form-control" id="title" placeholder="Username" value={this.state.username} onChange={this.setUsername}/>
                                </div>
                                <button type="button" className="btn btn-default" onClick={this.submit}>Login</button>
                            </fieldset>
                        </form>
                    </Tab>
                    <Tab eventKey={2} title="Signup">
                        <form>
                            <fieldset>
                                {/*<legend>Please login</legend>*/}
                                <div className="error-message">{this.state.error}&nbsp;</div>
                                <div className="form-group">
                                    <label htmlFor="title">Username</label>
                                    <input type="text" className="form-control" id="title" placeholder="Username" value={this.state.username} onChange={this.setUsername}/>
                                </div>
                                <button type="button" className="btn btn-default" onClick={this.signup}>Signup</button>
                            </fieldset>
                        </form>
                    </Tab>
                </Tabs>
            </div>
        );

        return html;
    }
});