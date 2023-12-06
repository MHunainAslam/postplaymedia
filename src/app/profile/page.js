'use client'
import React, { useEffect } from 'react'
import UserProfileLayout from '../UserProfileLayout'
import UserProfileTabPane from '@/components/userprofile/UserProfileTabPane'
import { useRouter } from 'next/navigation'

const Page = () => {
    const router = useRouter()
    useEffect(() => {
        router.push('/profile/activity')
    }, [])

    return (
        <UserProfileLayout ProfilePages>
            <UserProfileTabPane />
        </UserProfileLayout>
    )
}

export default Page