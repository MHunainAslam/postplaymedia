import React from 'react'
import ActivityLayout from '../ActivityLayout'
import PeopleTab from '@/components/people/PeopleTab'
import RootLayout from '../layout'

const page = () => {
    return (
        <RootLayout Activity>
            <PeopleTab />
        </RootLayout>
    )
}

export default page