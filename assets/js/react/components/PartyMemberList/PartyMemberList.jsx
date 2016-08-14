import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

let PartyMemberList = React.createClass({
    render: function() {
        let memberNames = [];
        if( typeof this.props.party != 'undefined') {
            console.log(this.props.party);
            let counter = 0;
            for (let x of this.props.party.get('members')) {
                let name = x.get('name');
                memberNames.push(<ul className="party-members__list__item" key={name + counter++}>{name}</ul>);
            }
        }
        return (
            <div className="party-members">
                <div className="party-members__title">People in your tea party</div>
            <ul className="party-members__list">
                {memberNames}
            </ul>
        </div>
        )
    }
});


function mapStateToProps(state) {
    if( typeof state == 'undefined' ) {
        return {};
    }
    if( typeof state.get('state') == 'undefined') {
        return {};
    }
    return {
        party: state.get('state').getIn( ['parties', this.props.partyName])
    };
}

export const PartyMemberListContainer = connect(mapStateToProps)(PartyMemberList);

export default PartyMemberListContainer;
module.exports = PartyMemberListContainer;