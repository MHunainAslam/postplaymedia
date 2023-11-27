import React from 'react'
import PersonalTab from '../PeopleActivity/PersonalTab'
import MentionTab from '../PeopleActivity/MentionTab'
import FriendsTab from '../PeopleActivity/FriendsTab'
import GroupsTab from '../PeopleActivity/GroupsTab'
import PeopleProfileEdit from './PeopleProfileEdit'

const PeopleProfileTab = () => {
    return (
        <>
            <div className="mt-3 profile-tabs">
                <ul className="peopletab nav nav-tabs border-0 border-b-0  " role="tablist">

                    <li className="nav-item nav-link text-center active" id="PeopleProfileEdit-tab" data-bs-toggle="tab" data-bs-target="#PeopleProfileEdit" type="button" role="tab" aria-controls="PeopleProfileEdit" aria-selected="false" tabIndex="-1">
                        <p className="para clr-text mb-0">Edit</p>
                    </li>

                    <li className="nav-item nav-link text-center" id="PeopleProfileChangeProfilePic-tab" data-bs-toggle="tab" data-bs-target="#PeopleProfileChangeProfilePic" type="button" role="tab" aria-controls="PeopleProfileChangeProfilePic" aria-selected="false" tabIndex="-1">
                        <p className="para clr-text mb-0">Change Profile Photo</p>
                    </li>
                    <li className="nav-item nav-link text-center" id="PeopleProfileChangeCoverPic-tab" data-bs-toggle="tab" data-bs-target="#PeopleProfileChangeCoverPic" type="button" role="tab" aria-controls="PeopleProfileChangeCoverPic" aria-selected="false" tabIndex="-1">
                        <p className="para clr-text mb-0">Change Cover Image</p>
                    </li>
                </ul>
            </div>
            <div className="tab-content ">

                <div className="tab-pane fade active show" id="PeopleProfileEdit" role="tabpanel" aria-labelledby="PeopleProfileEdit-tab">
                    <PeopleProfileEdit />
                </div>
                <div className="tab-pane fade " id="PeopleProfileChangeProfilePic" role="tabpanel" aria-labelledby="PeopleProfileChangeProfilePic-tab">
                    b

                </div>
                <div className="tab-pane fade " id="PeopleProfileChangeCoverPic" role="tabpanel" aria-labelledby="PeopleProfileChangeCoverPic-tab">
                    c
                </div>
            </div>
        </>
    )
}

export default PeopleProfileTab
