import ProfileLayout from '@/app/ProfileLayout'
import UserProfileLayout from '@/app/UserProfileLayout'
import React from 'react'

const page = () => {
    return (
        <UserProfileLayout ProfilePages>
            friends
        </UserProfileLayout>
    )
}

export default page