import React from 'react';

let Hero = React.createClass({
    render: function() {
        return <div className="hero">{this.props.children}</div>
    }

});
module.exports = Hero;