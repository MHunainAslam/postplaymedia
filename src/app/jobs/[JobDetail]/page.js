import ActivityLayout from '@/app/ActivityLayout'
import RootLayout from '@/app/layout'
import JobDetail from '@/components/jobs/slug/JobDetail'
import React from 'react'

const page = () => {
    return (
        <RootLayout Activity>
            <JobDetail />
        </RootLayout>
    )
}

export default page