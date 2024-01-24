
import React, { useContext } from 'react'
import ActivityTabs from '@/components/activity/ActivityTabs'
import ActivityLayout from '../ActivityLayout'
import { useRouter } from 'next/navigation'

const Page = ({ ActivityPages }) => {

   


    return (
        <>
            <ActivityLayout ActivityPages>

            <ActivityTabs />

            </ActivityLayout>
        </>
    )
}

export default Page