'use client'
import ProfileLayout from '@/app/ProfileLayout'
import UserProfileLayout from '@/app/UserProfileLayout'
import ChangeCoverPhoto from '@/components/userprofile/PeopleProfileTab/ChangeCoverPhoto'
import PeopleChangeProfile from '@/components/userprofile/PeopleProfileTab/PeopleChangeProfile'
import PeopleProfileEdit from '@/components/userprofile/PeopleProfileTab/PeopleProfileEdit'
import Profiledetail from '@/components/userprofile/PeopleProfileTab/Profiledetail'
import {  useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
    
    const router = useRouter()
    const searchParams = useSearchParams()
    const param = searchParams.get('profile-tab')

    console.log('lol',  param)
    const [TabState, setTabState] = useState('profiledetail')
    useEffect(() => {
        if (param === null) {
            setTabState('profiledetail')
        } else {
            setTabState(param)
        }
        console.log(TabState, 'TabState')
    }, [param, TabState])

    return (
        <UserProfileLayout ProfilePages>
            <div className="mt-3 profile-tabs">
                <ul className="peopletab nav nav-tabs border-0 border-b-0  " role="tablist">

                    <li className={`nav-item nav-link text-center ${TabState === 'profiledetail' ? 'active' : ''}`} onClick={() => router.push(`?profiledetail-tab=${'profiledetail'}`)} id="profiledetail-tab" data-bs-toggle="tab" data-bs-target="#profiledetail" type="button" role="tab" aria-controls="profiledetail" aria-selected="false" tabIndex="-1">
                        <p className="para clr-text mb-0">General</p>
                    </li>
                    <li className={`nav-item nav-link text-center ${TabState === 'editprofile' ? 'active' : ''}`} onClick={() => router.push(`?profile-tab=${'editprofile'}`)} id="UserProfileEdit-tab" data-bs-toggle="tab" data-bs-target="#UserProfileEdit" type="button" role="tab" aria-controls="UserProfileEdit" aria-selected="false" tabIndex="-1">
                        <p className="para clr-text mb-0">Edit</p>
                    </li>

                    <li className={`nav-item nav-link text-center ${TabState === 'changeprofile' ? 'active' : ''}`} onClick={() => router.push(`?profile-tab=${'changeprofile'}`)} id="UserProfileChangeProfilePic-tab" data-bs-toggle="tab" data-bs-target="#UserProfileChangeProfilePic" type="button" role="tab" aria-controls="UserProfileChangeProfilePic" aria-selected="false" tabIndex="-1">
                        <p className="para clr-text mb-0">Change Profile Photo</p>
                    </li>
                    <li className={`nav-item nav-link text-center ${TabState === 'changecover' ? 'active' : ''}`} onClick={() => router.push(`?profile-tab=${'changecover'}`)} id="UserProfileChangeCoverPic-tab" data-bs-toggle="tab" data-bs-target="#UserProfileChangeCoverPic" type="button" role="tab" aria-controls="UserProfileChangeCoverPic" aria-selected="false" tabIndex="-1">
                        <p className="para clr-text mb-0">Change Cover Image</p>
                    </li>
                </ul>
            </div>
            <div className="tab-content ">

                <div className={`tab-pane fade  ${TabState === 'profiledetail' ? 'active show' : ''}`} id="profiledetail" role="tabpanel" aria-labelledby="profiledetail-tab">
                    <Profiledetail />
                </div>
                <div className={`tab-pane fade  ${TabState === 'editprofile' ? 'active show' : ''}`} id="UserProfileEdit" role="tabpanel" aria-labelledby="UserProfileEdit-tab">
                    <PeopleProfileEdit />
                </div>
                <div className={`tab-pane fade  ${TabState === 'changeprofile' ? 'active show' : ''}`} id="UserProfileChangeProfilePic" role="tabpanel" aria-labelledby="UserProfileChangeProfilePic-tab">
                    <PeopleChangeProfile />
                </div>
                <div className={`tab-pane fade  ${TabState === 'changecover' ? 'active show' : ''}`} id="UserProfileChangeCoverPic" role="tabpanel" aria-labelledby="UserProfileChangeCoverPic-tab">
                    <ChangeCoverPhoto />
                </div>
            </div>
        </UserProfileLayout>
    )
}

export default Page