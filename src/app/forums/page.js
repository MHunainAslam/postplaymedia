import React from 'react'
import ActivityLayout from '../ActivityLayout'
import ForumsTab from '@/components/forums/ForumsTab'
import RootLayout from '../layout'

const page = ({ ActivityPages }) => {
    return (
        <ActivityLayout ActivityPages>
            <ForumsTab />

        </ActivityLayout>
    )
}

export default page