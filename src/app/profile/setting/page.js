
import ProfileLayout from '@/app/ProfileLayout'
import UserProfileLayout from '@/app/UserProfileLayout'
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {


    return (
        <UserProfileLayout ProfilePages>
            setting
        </UserProfileLayout>
    )
}

export default page