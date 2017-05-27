var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router-dom').Link;
var TimelineModal = require('../modal/modal.js');
var $ = require('jquery');


var Header = React.createClass({

    getInitialState: function(){
        return {
            showSearchBox: false,
            showUserInfo: false
        };
    },
    searchIconClick: function(){
        this.setState({showSearchBox: true});
    },
    searchBoxBlur: function(){
        this.setState({showSearchBox: false});
    },
    render: function(){
        var userGreeting = ([]);
        var userIcon = [];
        var timelineSearch = ([]);
        var timelineSearchIcon = ([]);

        var logo = [];
        if(location.hash.indexOf("/login") == -1){
            logo = (<Link to={'/timelinelist'}><span className="logo">Timeline</span></Link>);
        }

        if(this.props.username){
            if(this.state.showSearchBox){
                timelineSearch = (<input className="timeline-filter form-control" type="text" onChange={this.props.timelineFilterChange} onBlur={this.searchBoxBlur} placeholder="Type to filter" />);
            }else{
                timelineSearchIcon = (<span className="glyphicon glyphicon-search" aria-hidden="true" onClick={this.searchIconClick}></span>);
                userIcon = (<span className="user-icon">
                                <span onClick={() => this.setState({showUserInfo: true})}>
                                    {this.props.username.charAt(0).toUpperCase()}
                                </span>
                                <TimelineModal visible={this.state.showUserInfo} close={() => this.setState({showUserInfo: false})}>
                                    <div className="welcome">Welcome, {this.props.username}!</div>
                                    <div className="sign-out"><a href="#" onClick={(e) => { this.setState({showUserInfo: false}); e.preventDefault(); } }>Sign out</a></div>
                                </TimelineModal>
                            </span>);
                userGreeting = (<span className="username">Welcome, {this.props.username}!</span>);
            }
        }
        var html = (<header>
                        <div className="row">
                            <div className="col-xs-6">
                                {logo}
                            </div>
                            <div className="col-xs-6 hidden-md hidden-lg">
                                {timelineSearchIcon}
                                {timelineSearch}
                                {userIcon}
                            </div>
                            <div className="col-md-6 hidden-sm hidden-xs">
                                {timelineSearchIcon}
                                {timelineSearch}
                                {userGreeting}
                            </div>
                        </div>
                    </header>);
        return html;
    },
    componentDidUpdate: function() {
        var searchBox = $(ReactDOM.findDOMNode(this)).find('.timeline-filter');
        if(searchBox.length){            
            searchBox.focus();
        }
    },
});

module.exports = Header;