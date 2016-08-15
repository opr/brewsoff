import React from 'react';
import io from 'socket.io-client';
import Hero from '../Hero/Hero';
import PartyMemberListContainer from '../PartyMemberList/PartyMemberList';
import BrewButton from '../BrewButton/BrewButton';
import UsernameForm from '../UsernameForm/UsernameForm';
import remoteActionMiddleware from '../../remoteActionMiddleWare';
import {setState} from '../../actionCreators';
import {createStore, applyMiddleware} from 'redux';
import reducer from '../../reducer';
import {Provider} from 'react-redux';
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
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
            return;
        }
        if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                // Whatever the user answers, we make sure we store the information
                if(!('permission' in Notification)) {
                    Notification.permission = permission;
                }
            });
        }
    },
    startBrewRound: function () {
        const action = {type: 'START_BREW', payload: Map({ party: this.state.party, socketId: socket.id})};
        socket.emit('action', action);
    },
    usernameSubmitted: function (name) {
        socket = io(`${location.protocol}//${location.hostname}:8090`);
        socket.on('state', state => {
                store.dispatch(setState(state));
            }
        );

        socket.on('brewStarting', msg => {
            console.log('starting brews');
            if (Notification.permission !== 'denied') {
                Notification.requestPermission(function (permission) {

                    // Whatever the user answers, we make sure we store the information
                    if(!('permission' in Notification)) {
                        Notification.permission = permission;
                    }

                    // If the user is okay, let's create a notification
                    if (permission === "granted") {
                        let notification = new Notification(msg + ' is starting a brew round!');
                    }
                });
            }

        });

        socket.on('connect', function () {
            const addPartyAction = {type: 'ADD_PARTY', payload: this.state.party};
            socket.emit('action', addPartyAction);
            socket.emit('joinRoom', this.state.party);

            const addMemberAction = {
                type: 'ADD_MEMBER',
                payload: {party: this.state.party, member: Map({socketId: socket.id, name: name})}
            };
            socket.emit('action', addMemberAction);
        }.bind(this));
        this.setState({name: name});
    },
    render: function () {
        let displayedElement = this.state.name == null ? <UsernameForm submitHandler={this.usernameSubmitted}/> : [
            <PartyMemberListContainer key="1" partyName={this.props.params.party}/>,
            <BrewButton startBrewRound={this.startBrewRound} key="2"/>];
        return (
            <Provider store={store}>
                <div className="party">
                    <Hero>
                        <h2 className="party__welcome">Welcome to {this.props.params.party}'s Tea Party</h2>
                        {displayedElement}
                    </Hero>
                </div>
            </Provider>
        )
    }
});


module.exports = Party;