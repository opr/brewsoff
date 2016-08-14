import {Map} from 'immutable';
import {setPartyName} from './core';

const INITIAL_STATE = Map();

export default function reducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'SET_STATE' :
            return state.merge(action);
        case 'SET_PARTY' :
            return setPartyName(state, action.payload);
        case 'ADD_MEMBER' :
            return state.setIn(['parties', action.payload.party], addMember(state.getIn(['parties', action.payload.party]), action.payload.member));
        case 'START_BREW' :
            return state.mergeIn(['parties', action.payload.party], startBrew( action.payload.member ) );
        default:
            return state;
    }
}