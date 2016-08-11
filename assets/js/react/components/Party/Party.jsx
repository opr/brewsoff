import React from 'react';
import Hero from '../Hero/Hero.jsx';

let Party = React.createClass({
    componentDidMount: function() {
        const socket = io(`${location.protocol}//${location.hostname}:8090`);
    },
    render: function() {
        console.log(this.props.params);
        return <div className="party">
            <Hero />
            hello and welcome to the party
        </div>
    }
});

module.exports = Party;