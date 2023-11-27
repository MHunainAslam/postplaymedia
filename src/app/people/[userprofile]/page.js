import ProfileLayout from '@/app/ProfileLayout'
import ActivityTabs from '@/components/activity/ActivityTabs'
import ProfileTabPane from '@/components/profile/ProfileTabPane'
import React from 'react'

const page = () => {
    return (
        <ProfileLayout ProfilePages>
            <>
                <ProfileTabPane />
            </>
        </ProfileLayout>
    )
}

export default page