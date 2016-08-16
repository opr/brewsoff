import React from 'react';

let BrewButton = React.createClass({
    getInitialState: function () {
        let defaultClassNames = {
            brewButton: 'brew-button'
        };

        return {
            isUserBrewer: this.props.isUserBrewer,
            startBrewText: 'Making a brew or what lad?',
            startBrewHint: 'Click this button if you\'re getting the kettle on',
            stopBrewText: 'Finished brewing mate?',
            stopBrewHint: 'Click this button if you\'ve made the drinks',
            defaultClassNames: defaultClassNames,
            classNames: defaultClassNames
        }
    },
    componentWillReceiveProps: function (nextProps) {
        let newClassNames = Object.assign( {}, this.state.defaultClassNames );
        if( nextProps.isUserBrewer ) {
            newClassNames.brewButton = 'brew-button --stop-brew'
        }
        this.setState({isUserBrewer: nextProps.isUserBrewer, classNames: newClassNames});
    },
    render: function () {
        return (
            <div href="#" className={this.state.classNames.brewButton}
                 onClick={this.state.isUserBrewer ? this.props.stopBrewRound : this.props.startBrewRound}>
                {this.state.isUserBrewer ? this.state.stopBrewText : this.state.startBrewText}
                <div className="brew-button__hint">
                    {this.state.isUserBrewer ? this.state.stopBrewHint : this.state.startBrewHint}
                </div>
            </div>
        )

    }
});
export default BrewButton;
module.exports = BrewButton;