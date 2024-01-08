import React from 'react'
import ActivityLayout from '../ActivityLayout'
import GroupTabs from '@/components/groups/GroupTabs'
import RootLayout from '../layout'

const page = () => {
    return (
        <RootLayout Activity>
            <GroupTabs />
        </RootLayout>
    )
}

export default page