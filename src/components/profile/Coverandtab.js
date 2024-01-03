'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import UserProfileTabs from '../userprofile/UserProfileTabs'
import { IMG_URL } from '../../../config'
import { useParams, useRouter } from 'next/navigation'
import { Skeleton } from 'antd'
import ProfileTabs from './ProfileTabs'

const Coverandtab = ({ Userdata, UserdataLoader }) => {
    const { userprofile } = useParams()
    const router = useRouter()
    console.log('Userdata', Userdata)
    const imgurl = ({ src }) => {
        return `${IMG_URL}${src}`
    }
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
                    {UserdataLoader ?
                        <Skeleton.Image active />
                        : <>
                            {Userdata?.data?.cover_photo === null ?
                                <Skeleton.Image /> :
                                <Image loader={imgurl} src={Userdata?.data?.cover_photo.url} width={1920} height={1080} alt=''></Image>
                            }
                        </>}
                </div>
                <div className="container position-relative">
                    <div className="profile-page-user">
                        <div className="card mb-3">
                            <div className="row g-0 justify-content-center">
                                <div className="img-p">
                                    {UserdataLoader ?
                                        <Skeleton.Image active /> : <>
                                            {Userdata?.data?.profile_photo === null ?
                                                <Image src="/assets/images/avatar/user.jpg" width={500} height={500} alt='' className="img-fluid rounded-start user-img" /> :
                                                <Image loader={imgurl} src={Userdata?.data?.profile_photo.url} width={500} height={500} alt='' className="img-fluid rounded-start user-img" />
                                            }
                                        </>}

                                    {UserdataLoader ? <div className='text-skeleton-2 skel-w-100 my-auto w-50 mx-auto mt-3' > <Skeleton active paragraph={{ rows: 0 }} height={50} /> </div> :
                                        <p className="heading text-center mt-2 clr-dark text-capitalize">{Userdata?.data?.name}</p>
                                    }
                                </div>
                                <div className="col-md-8 col-lg mt-auto">
                                    <div className="d-md-flex mb-md-5 pb-md-3">
                                        <div className="card-body d-flex align-items-center justify-content-center justify-content-md-start">
                                            {UserdataLoader ? <Skeleton active paragraph={{ rows: 0 }} height={50} /> :
                                                <>
                                                    <p className="heading mb-0 text-md-white">@{Userdata?.data?.username}</p>
                                                    <span className='para mb-0 ms-3'>Active Now </span>
                                                </>}

                                        </div>

                                    </div>
                                    <div className=" profile-tabs d-md-flex d-none justify-content-between my-3 align-items-center">
                                        <ProfileTabs Userdata={Userdata} />
                                        <button className='btn secondary-btn h-100 px-lg-5'>Add Friend</button>
                                        {Userdata?.friendship_status === 'send-request' ?
                                            <button className='btn secondary-btn' onClick={() => sendreq(item.id)}><p className='mb-0 px-4'> Add Friend</p></button>
                                            : Userdata.friendship_status === 'pending' ?
                                                <button className='btn secondary-btn' onClick={() => dltfrndreq(item.frp_id)}><p className='mb-0 px-4'> Cancel</p></button>
                                                : Userdata.friendship_status === 'friends' ?
                                                    <button className='btn secondary-btn' onClick={() => unfriend(item.friend_id)}><p className='mb-0 px-4'> Unfriend</p></button>
                                                    : Userdata.friendship_status === 'accept-request' ?
                                                        <div className='d-md-flex w-100 mx-auto justify-content-center'>
                                                            <button className='btn secondary-btn m-1' onClick={() => dltfrndreq(item.frp_id)}><p className='mb-0 px-4'> Cancel</p></button>
                                                            <button className='btn secondary-btn m-1' id={item.id} onClick={() => accptfrndreq(item.frp_id)}><p className='mb-0 px-4' > Accept</p></button>
                                                        </div>
                                                        : ''
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container d-md-none">
                <div className="profile-tabs  " style={{ marginTop: '150px' }}>
                    <ProfileTabs Userdata={Userdata} />
                </div>
            </div>

        </>
    )
}

export default Coverandtab