import React from 'react'
import RootLayout from '../layout'
import ActivityLayout from '../ActivityLayout'
import PostArea from '@/components/posts/PostArea'
import ActivityTabs from '@/components/activity/ActivityTabs'

const Page = () => {
    return (
        <>
            <ActivityLayout ActivityPages>

                <PostArea />
                <ActivityTabs />

            </ActivityLayout>
        </>
    )
}

export default Page