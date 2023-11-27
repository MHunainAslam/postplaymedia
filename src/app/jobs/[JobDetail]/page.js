import ActivityLayout from '@/app/ActivityLayout'
import JobDetail from '@/components/jobs/slug/JobDetail'
import React from 'react'

const page = () => {
    return (
        <ActivityLayout ActivityPages>
            <JobDetail />
        </ActivityLayout>
    )
}

export default page