'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Skeleton } from 'antd'
import UserProfileTabs from '@/components/userprofile/UserProfileTabs'
import { IMG_URL } from '../../../../config'
import GroupProfileTab from './GroupProfileTab'
import { imgurl } from '@/utils/Token'

const Coverandtab = ({ grpdata, isLoading }) => {
    console.log(grpdata, 'cc');
    const router = useRouter()

    const movetoedit = () => {
        router.push('/profile/profile?profile-tab=editprofile')
    }
    const movetochangecover = () => {
        router.push('/profile/profile?profile-tab=changecover')
    }
    const movetochangedp = () => {
        router.push('/profile/profile?profile-tab=changeprofile')
    }

    return (
        <>
            <div className="position-relative">
                <div className="profile-page-cover">
                    {isLoading ?
                        <Skeleton.Image active />
                        : <>
                            {grpdata?.data?.group?.cover_photo === null ?
                                <Skeleton.Image /> :
                                <Image loader={imgurl} src={grpdata?.data?.group?.cover_photo.url} width={1920} height={1080} alt=''></Image>
                            }
                        </>}
                </div>
                <div className="container position-relative">
                    <div className="profile-page-user">
                        <div className="card mb-3">
                            <div className="row g-0 justify-content-center">
                                <div className="img-p" style={isLoading ? { height: '200px' } : {}}>

                                {isLoading ?
                                    <Skeleton.Image active style={{ height: '200px' }} /> :
                                    <>
                                        {grpdata?.data?.group?.profile_photo === null ?
                                            <Image src="/assets/images/avatar/user.jpg" width={500} height={500} alt='' className="img-fluid rounded-start user-img" /> :
                                            <Image loader={imgurl} src={grpdata?.data?.group?.profile_photo.url} width={500} height={500} alt='' className="img-fluid rounded-start user-img" />
                                        }
                                    </>}

                                {isLoading ? <div className='text-skeleton-2 skel-w-100 my-auto w-50 mx-auto mt-3' > <Skeleton active paragraph={{ rows: 0 }} height={50} /> </div> :
                                    <p className="heading text-center mt-2 clr-dark text-capitalize">{grpdata?.data?.group?.group_name}</p>
                                }
                            </div>
                            <div className="col-md-8 col-lg mt-auto">

                                <div className=" profile-tabs d-md-flex d-none  my-3">
                                    <GroupProfileTab />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
            <div className="container d-md-none">
                <div className="profile-tabs  " >
                    <GroupProfileTab />
                </div>
            </div>

        </>
    )
}

export default Coverandtab