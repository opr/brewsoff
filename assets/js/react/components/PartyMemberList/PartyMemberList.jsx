import React from 'react';
import {connect} from 'react-redux';
import {toJS, fromJS} from 'immutable';

let PartyMemberList = React.createClass({
    render: function() {
        let members = fromJS(this.props.members);
        let memberNames = [];
        if( typeof members != 'undefined') {
            let counter = 0;
            for (let x of members) {
                let name = x[1].get('name');
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
        members: state.get('state').get( 'members' )
    };
}

export const PartyMemberListContainer = connect(mapStateToProps)(PartyMemberList);

export default PartyMemberListContainer;
module.exports = PartyMemberListContainer;