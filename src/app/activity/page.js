
import React, { useContext } from 'react'
import RootLayout from '../layout'
import PostArea from '@/components/posts/PostArea'
import ActivityTabs from '@/components/activity/ActivityTabs'
import ActivityLayout from '../ActivityLayout'

const Page = () => {

    return (
        <>
            <ActivityLayout ActivityPages>

                <ActivityTabs />

            </ActivityLayout>
        </>
    )
}

export default Page