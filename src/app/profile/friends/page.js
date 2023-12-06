'use client'
import ProfileLayout from '@/app/ProfileLayout'
import UserProfileLayout from '@/app/UserProfileLayout'
import MyFriends from '@/components/people/MyFriends'
import AllFriends from '@/components/userprofile/friends/AllFriends'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {

    return (
        <UserProfileLayout ProfilePages>

            <div className="row position-relative">

                <AllFriends xl={'xl-4'} md={'lg-6'} />

            </div>

        </UserProfileLayout>
    )
}

export default page