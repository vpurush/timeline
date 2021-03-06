var React = require('react');
var $ = require('jquery');
var withRouter = require('react-router').withRouter;
var utils = require('../../utils/utils.js');


class TimelineModal extends React.Component{
    constructor(props, context){
        super(props, context);

        this.state = {
            hashChangeHandler: this.hashChange.bind(this)
        };
    }
    
    hashChange(){
        this.props.close();
        $(window).off('hashchange', this.state.hashChangeHandler);
        $(window).off("popstate", this.state.hashChangeHandler);
    }

    componentDidUpdate(){
        console.log("component did update");
        if(this.props.visible){
            utils.addParam("modal", "true");

            $(window).on('hashchange', this.state.hashChangeHandler);
            $(window).on("popstate", this.state.hashChangeHandler);
        }else{
            utils.removeParam("modal");

            $(window).off('hashchange', this.state.hashChangeHandler);
            $(window).off("popstate", this.state.hashChangeHandler);
        }
    }
    
    render(){
        var html = null;

        if(this.props.visible){
            html = (
                <div className="timeline-modal timeline-modal-overlay">
                    <div className="timeline-modal">
                        <div className="timeline-modal-content">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            );
        }
        return html;
    }    
}

module.exports = withRouter(TimelineModal);