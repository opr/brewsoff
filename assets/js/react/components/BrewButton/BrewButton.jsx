import React from 'react';

let BrewButton = React.createClass({
    render: function() {
        return (
            <div href="#" className="brew-button" onClick={this.props.startBrewRound}>
                Making a brew or what lad?
                <div className="brew-button__hint">
                    Click this button if you're getting the kettle on
                </div>
            </div>
        )

    }
});
export default BrewButton;
module.exports = BrewButton;