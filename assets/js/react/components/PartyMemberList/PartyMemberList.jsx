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
                let membersSocketId = x[0],
                    brewIcon = null;
                if( this.props.brewer == membersSocketId ) {
                    brewIcon = <div className="party-members__brew-icon"></div>
                }
                let name = x[1].get('name');
                memberNames.push(
                    <li className="party-members__list__item" key={name + counter++}>
                        <div className="party-members__member-name">{name}</div>
                        {brewIcon}
                    </li>
                );
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
        members: state.get('state').get( 'members' ),
        brewer: typeof state.get('state').get('brewer') != 'undefined' ? state.get('state').get('brewer') : null
    };
}

export const PartyMemberListContainer = connect(mapStateToProps)(PartyMemberList);

export default PartyMemberListContainer;
module.exports = PartyMemberListContainer;