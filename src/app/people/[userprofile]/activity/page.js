'use client'
import ProfileLayout from '@/app/ProfileLayout'
import UserProfileLayout from '@/app/UserProfileLayout'
import AllMembers from '@/components/activity/AllMembers'
import FriendsTab from '@/components/profile/PeopleActivity/FriendsTab'
import GroupsTab from '@/components/profile/PeopleActivity/GroupsTab'
import PersonalTab from '@/components/profile/PeopleActivity/PersonalTab'
import MentionTab from '@/components/userprofile/PeopleActivity/MentionTab'
import { useParams } from 'next/navigation'
import React from 'react'

const Page = () => {
    const { userprofile } = useParams()

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

                </ul>
            </div>
            <div className="tab-content ">
                <div className="tab-pane fade active show" id="PeopleActivityPersonal" role="tabpanel" aria-labelledby="PeopleActivityPersonal-tab">
                    <AllMembers endpoint={`/get-all-my-posts?user_id=${userprofile}&`} />
                </div>
                <div className="tab-pane fade " id="PeopleActivityMention" role="tabpanel" aria-labelledby="PeopleActivityMention-tab">
                    <MentionTab endpoint={`/get-my-post-mentions?user_id=${userprofile}&`} />
                </div>

            </div>
        </ProfileLayout>
    )
}

export default Page