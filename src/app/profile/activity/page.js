import ProfileLayout from '@/app/ProfileLayout'
import FriendsTab from '@/components/profile/PeopleActivity/FriendsTab'
import GroupsTab from '@/components/profile/PeopleActivity/GroupsTab'
import MentionTab from '@/components/profile/PeopleActivity/MentionTab'
import PersonalTab from '@/components/profile/PeopleActivity/PersonalTab'
import React from 'react'

const page = () => {
    return (
        <ProfileLayout ProfilePages>
            <div className="mt-3 profile-tabs">
                <ul className="peopletab nav nav-tabs border-0 border-b-0  " role="tablist">
                    <li className="nav-item nav-link active text-center" id="PeopleActivityPersonal-tab" data-bs-toggle="tab" data-bs-target="#PeopleActivityPersonal" type="button" role="tab" aria-controls="PeopleActivityPersonal" aria-selected="false" tabIndex="-1">
                        <p className="para clr-text mb-0">Personal</p>
                    </li>
                    <li className="nav-item nav-link text-center" id="PeopleActivityMention-tab" data-bs-toggle="tab" data-bs-target="#PeopleActivityMention" type="button" role="tab" aria-controls="PeopleActivityMention" aria-selected="false" tabIndex="-1">
                        <p className="para clr-text mb-0">Mentions</p>
                    </li>

                    <li className="nav-item nav-link text-center" id="PeopleActivityFriends-tab" data-bs-toggle="tab" data-bs-target="#PeopleActivityFriends" type="button" role="tab" aria-controls="PeopleActivityFriends" aria-selected="false" tabIndex="-1">
                        <p className="para clr-text mb-0">Friends</p>
                    </li>
                    <li className="nav-item nav-link text-center" id="PeopleActivityGroup-tab" data-bs-toggle="tab" data-bs-target="#PeopleActivityGroup" type="button" role="tab" aria-controls="PeopleActivityGroup" aria-selected="false" tabIndex="-1">
                        <p className="para clr-text mb-0">Groups</p>
                    </li>
                </ul>
            </div>
            <div className="tab-content ">
                <div className="tab-pane fade active show" id="PeopleActivityPersonal" role="tabpanel" aria-labelledby="PeopleActivityPersonal-tab">
                    <PersonalTab />
                </div>
                <div className="tab-pane fade " id="PeopleActivityMention" role="tabpanel" aria-labelledby="PeopleActivityMention-tab">
                    <MentionTab />
                </div>
                <div className="tab-pane fade " id="PeopleActivityFriends" role="tabpanel" aria-labelledby="PeopleActivityFriends-tab">
                    <FriendsTab />

                </div>
                <div className="tab-pane fade " id="PeopleActivityGroup" role="tabpanel" aria-labelledby="PeopleActivityGroup-tab">
                    <GroupsTab />
                </div>
            </div>
        </ProfileLayout>
    )
}

export default page