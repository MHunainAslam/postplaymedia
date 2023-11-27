import React from 'react'
import ActivityLayout from '../ActivityLayout'
import JobsTab from '@/components/jobs/JobsTab'

const page = () => {
    return (
        <ActivityLayout ActivityPages>
            <>
                <JobsTab />
            </>
        </ActivityLayout>
    )
}

export default page