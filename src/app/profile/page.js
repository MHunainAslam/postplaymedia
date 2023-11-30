import React from 'react'
import ActivityLayout from '../ActivityLayout'
import PeopleTab from '@/components/people/PeopleTab'
import ProfileTabPane from '@/components/profile/ProfileTabPane'
import ProfileLayout from '../ProfileLayout'
import UserProfileLayout from '../UserProfileLayout'

const page = () => {
    return (
        <UserProfileLayout ProfilePages>
            <ProfileTabPane />
        </UserProfileLayout>
    )
}

export default page