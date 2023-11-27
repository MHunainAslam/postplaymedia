import React from 'react'
import ActivityLayout from '../ActivityLayout'
import GroupTabs from '@/components/groups/GroupTabs'

const page = () => {
    return (
        <ActivityLayout ActivityPages>
            <GroupTabs />
        </ActivityLayout>
    )
}

export default page