import React from 'react'
import ActivityLayout from '../ActivityLayout'
import PeopleTab from '@/components/people/PeopleTab'

const page = () => {
    return (
        <ActivityLayout ActivityPages>
            <PeopleTab />
        </ActivityLayout>
    )
}

export default page