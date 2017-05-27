var React = require('react');
var $ = require('jquery');
var withRouter = require('react-router').withRouter;


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
    }
    componentDidUpdate(){
        console.log("component did update");
        if(this.props.visible){
            var hash = location.hash;
            if(hash.indexOf('?') == -1){
                hash = hash + "?modal=true";
            }else{
                hash = hash + "&modal=true";
            }
            history.pushState(null, document.title, hash);

            $(window).on('hashchange', this.state.hashChangeHandler);
        }else{
            var hash = location.hash;
            if(hash.indexOf('modal=true') != -1){
                hash = hash.replace("modal=true", "");
                history.pushState(null, document.title, hash);
            }

            $(window).off('hashchange', this.state.hashChangeHandler);
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