import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../react/reducer';

describe('reducer', () => {

    it('has an initial state', () => {
        const action = {type: 'SET_PARTY', payload: 'edgethreesixty'};
        const nextState = reducer(undefined, action);
        expect(nextState).to.equal(fromJS({
            party: 'edgethreesixty'
        }));
    });

});