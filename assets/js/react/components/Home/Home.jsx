import React from 'react';
import Hero from '../Hero/Hero.jsx';

let Home = React.createClass({
    render: function() {
        return <div className="homepage">
            <Hero />
        </div>
    }
});

module.exports = Home;