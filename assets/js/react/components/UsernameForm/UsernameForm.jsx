import React from 'react';

let UsernameForm = React.createClass({
    getInitialState: () => {
        let defaultLabelClass = 'username-form__label',
            defaultInputClass = 'input --text username-form__name';
        return {
            defaultLabelClass: defaultLabelClass,
            defaultInputClass: defaultInputClass,
            labelClassName: defaultLabelClass,
            inputClassName: defaultInputClass,
            nameInputValue: ''
        }
    },
    handleFormSubmission: function (event) {
        event.preventDefault();
        this.props.submitHandler(this.state.nameInputValue);
    },
    focusHandler: function () {
        let newLabelClassName = this.state.defaultLabelClass + ' --active';
        if( this.state.labelClassName.indexOf('--active') >= 0 ) {
            newLabelClassName = this.state.labelClassName;
        }
        this.setState({
            labelClassName: newLabelClassName,
            inputClassName: this.state.defaultInputClass + ' --active'
        });
    },
    blurHandler: function () {
        let newLabelClassName = this.state.defaultLabelClass + ' --active';
        if(this.state.nameInputValue == '') {
            newLabelClassName = this.state.defaultLabelClass
        }
        this.setState({
            labelClassName: newLabelClassName,
            inputClassName: this.state.defaultInputClass
        });
    },
    handleNameInputChange: function(e) {
        this.setState({
            nameInputValue: e.target.value
        });
    },
    render: function () {
        return (
            <form className="username-form" onSubmit={this.handleFormSubmission}>
                <label className={this.state.labelClassName} htmlFor="username-form__name">Please enter your
                    name</label>
                <input type="text" className={this.state.inputClassName} id="username-form__name"
                       value={this.state.nameInputValue} onChange={this.handleNameInputChange}
                       onFocus={this.focusHandler} onBlur={this.blurHandler}/>
                <button type="submit" className="button username-form__button">Join the tea party</button>
            </form>
        )

    }
});
export default UsernameForm;
module.exports = UsernameForm;