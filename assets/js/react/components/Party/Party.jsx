import React from 'react';
import io from 'socket.io-client';
import Hero from '../Hero/Hero';
import PartyMemberList from '../PartyMemberList/PartyMemberList';
import BrewButton from '../BrewButton/BrewButton';
import UsernameForm from '../UsernameForm/UsernameForm';
import remoteActionMiddleware from '../../remoteActionMiddleWare';
import {setState} from '../../actionCreators';
import {createStore, applyMiddleware} from 'redux';
import reducer from '../../reducer';
import {Map} from 'immutable';


const createStoreWithMiddleware = applyMiddleware(
    remoteActionMiddleware
)(createStore);
const store = createStoreWithMiddleware(reducer);
let socket = null;

let Party = React.createClass({
    socket: null,
    getInitialState: function () {
        return {
            name: null,
            party: this.props.params.party
        };
    },
    componentDidMount: function () {

    },
    initiateBrew: function() {
        const action = { type: 'START_BREW', payload: this.state.party};
        socket.emit( 'action', action);
    },
    usernameSubmitted: function( name ) {
        socket = io(`${location.protocol}//${location.hostname}:8090`);
        socket.on('state', state => {
                store.dispatch(setState(state))
            }
        );
        socket.on('connect', function() {
            const addPartyAction = { type: 'ADD_PARTY', payload: this.state.party};
            socket.emit( 'action', addPartyAction);

            const addMemberAction = { type: 'ADD_MEMBER', payload: {party: this.state.party, member: { socketId: socket.id, name: name}}};
            socket.emit( 'action', addMemberAction);
        }.bind(this));
        this.setState({name: name});
    },
    render: function () {
        let displayedElement = this.state.name == null ? <UsernameForm submitHandler={this.usernameSubmitted} /> : [<PartyMemberList key="1" />,
            <BrewButton key="2" />];
        return <div className="party">
            <Hero>
                <h2 className="party__welcome">Welcome to {this.props.params.party}'s Tea Party</h2>
                {displayedElement}
            </Hero>
        </div>
    }
});


module.exports = Party;