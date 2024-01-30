'use client'
import GroupLayout from '@/app/GroupLayout'
import Groupprofiletabcontent from '@/components/groups/groupbyid/Groupprofiletabcontent'
import { useParams } from 'next/navigation'
import React from 'react'

const Page = () => {
    const { groupbyid } = useParams()
    return (
        <GroupLayout GroupPage>
            <Groupprofiletabcontent />
        </GroupLayout>
    )
}

export default Page