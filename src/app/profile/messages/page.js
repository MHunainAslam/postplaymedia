import ProfileLayout from '@/app/ProfileLayout'
import UserProfileLayout from '@/app/UserProfileLayout'
import React from 'react'

const page = () => {
    return (
        <UserProfileLayout ProfilePages>
            messages
        </UserProfileLayout>
    )
}

export default page