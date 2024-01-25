'use client'
import GroupLayout from '@/app/GroupLayout'
import { useParams } from 'next/navigation'
import React from 'react'

const Page = () => {
    const { groupbyid } = useParams()
    return (
        <GroupLayout GroupPage>
            <div>
                {groupbyid}
            </div>
        </GroupLayout>
    )
}

export default Page