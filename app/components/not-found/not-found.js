var React = require("react");

const NotFound = React.createClass({
    render: function(){
        var html;

        html = (
            <div className="not-found">Opps, you have landed in the wrong planet. This is not Earth.</div>
        )
        return html;
    }
});

module.exports = NotFound;