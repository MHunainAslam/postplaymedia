'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import UserProfileTabs from '../userprofile/UserProfileTabs'
import { IMG_URL } from '../../../config'
import { useRouter } from 'next/navigation'
import { Skeleton } from 'antd'

const Coverandtab = ({ Userdata, UserdataLoader }) => {

    const router = useRouter()
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
                        <div className='skeleton'>
                            <Skeleton.Image active />
                        </div>
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
                                <div className="img-p" style={UserdataLoader ? { height: '200px' } : {}}>
                                    {UserdataLoader ?
                                        <div className='skeleton'>
                                            <Skeleton.Image active />
                                        </div> : <>
                                            {Userdata?.data?.profile_photo === null ?
                                                <Image src="/assets/images/avatar/user.jpg" width={500} height={500} alt='' className="img-fluid rounded-start user-img" /> :
                                                <Image loader={imgurl} src={Userdata?.data?.profile_photo.url} width={500} height={500} alt='' className="img-fluid rounded-start user-img" />
                                            }
                                        </>}
                                    <div className='profileicon'>
                                        <i className="bi bi-camera" onClick={movetochangedp}></i>
                                    </div>
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
                                        <div className="card-body ">
                                            <div className="icons d-flex align-items-center  justify-content-evenly justify-content-md-end">
                                                <div> <i className="bi bi-pencil-square pointer" onClick={movetoedit}></i></div>
                                                <div><i className="bi bi-card-image pointer" onClick={movetochangecover}></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" profile-tabs d-md-flex d-none  my-3">
                                        <UserProfileTabs Userdata={Userdata} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container d-md-none">
                <div className="profile-tabs  " >
                    <UserProfileTabs Userdata={Userdata} />
                </div>
            </div>

        </>
    )
}

export default Coverandtab