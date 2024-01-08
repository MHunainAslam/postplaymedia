import React from 'react'
import ActivityLayout from '../ActivityLayout'
import ForumsTab from '@/components/forums/ForumsTab'
import RootLayout from '../layout'

const page = () => {
    return (
        <RootLayout Activity>
            <ForumsTab />
            
        </RootLayout>
    )
}

export default page