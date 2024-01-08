
import React, { useContext } from 'react'
import RootLayout from '../layout'
import PostArea from '@/components/posts/PostArea'
import ActivityTabs from '@/components/activity/ActivityTabs'
import ActivityLayout from '../ActivityLayout'
import { useRouter } from 'next/navigation'

const Page = ({ Activity }) => {

   


    return (
        <>
            <RootLayout Activity>

            <ActivityTabs />

            </RootLayout>
        </>
    )
}

export default Page