'use client'
import ProfileLayout from '@/app/ProfileLayout'
import UserProfileLayout from '@/app/UserProfileLayout'
import ChangeCoverPhoto from '@/components/userprofile/PeopleProfileTab/ChangeCoverPhoto'
import PeopleChangeProfile from '@/components/userprofile/PeopleProfileTab/PeopleChangeProfile'
import PeopleProfileEdit from '@/components/userprofile/PeopleProfileTab/PeopleProfileEdit'
import Profiledetail from '@/components/profile/PeopleProfileTab/Profiledetail'
import {  useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
    
    const router = useRouter()
    const searchParams = useSearchParams()
    const param = searchParams.get('profile-tab')

    const [TabState, setTabState] = useState('profiledetail')
    useEffect(() => {
        if (param === null) {
            setTabState('profiledetail')
        } else {
            setTabState(param)
        }
    }, [param, TabState])

    return (
        <ProfileLayout ProfilePages>
            <div className="mt-3 profile-tabs">
                <ul className="peopletab nav nav-tabs border-0 border-b-0  " role="tablist">

                    <li className={`nav-item nav-link text-center ${TabState === 'profiledetail' ? 'active' : ''}`} onClick={() => router.push(`?profiledetail-tab=${'profiledetail'}`)} id="profiledetail-tab" data-bs-toggle="tab" data-bs-target="#profiledetail" type="button" role="tab" aria-controls="profiledetail" aria-selected="false" tabIndex="-1">
                        <p className="para clr-text mb-0">General</p>
                    </li>
                  
                </ul>
            </div>
            <div className="tab-content ">

                <div className={`tab-pane fade  ${TabState === 'profiledetail' ? 'active show' : ''}`} id="profiledetail" role="tabpanel" aria-labelledby="profiledetail-tab">
                    <Profiledetail />
                </div>
               
            </div>
        </ProfileLayout>
    )
}

export default Page