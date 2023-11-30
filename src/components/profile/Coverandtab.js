'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import ActivityTabs from '../activity/ActivityTabs'
import AllPhotos from '../photos/AllPhotos'
import ProfileTabs from './ProfileTabs'
import FancyBox from '../FancyBox'
import ProfileTabPane from './ProfileTabPane'
import UserProfileTabs from '../userprofile/UserProfileTabs'

const Coverandtab = () => {
   
    return (
        <>
            <div className="position-relative">
                <div className="profile-page-cover">
                    <Image src={'/assets/images/posts/covers.jpg'} width={1920} height={1080} alt=''></Image>
                </div>
                <div className="container position-relative">
                    <div className="profile-page-user">
                        <div className="card mb-3">
                            <div className="row g-0 justify-content-center">
                                <div className="img-p">
                                    <Image src="/assets/images/avatar/user.jpg" width={500} height={500} alt='' className="img-fluid rounded-start user-img" />
                                    <div className='profileicon'>
                                        <i className="bi bi-camera"></i>
                                    </div>
                                    <p className="heading text-center mt-2 clr-dark">Admin</p>
                                </div>
                                <div className="col-md-8 col-lg mt-auto">
                                    <div className="d-md-flex mb-md-5 pb-md-3">
                                        <div className="card-body d-flex align-items-center justify-content-center justify-content-md-start">
                                            <p className="heading mb-0 text-md-white">@admin</p>
                                            <span className='para mb-0 ms-3'>Active Now</span>
                                        </div>
                                        <div className="card-body ">
                                            <div className="icons d-flex align-items-center  justify-content-evenly justify-content-md-end">
                                                <div><i className="bi bi-pencil-square"></i></div>
                                                <div><i className="bi bi-card-image"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" profile-tabs d-md-flex d-none  my-3">
                                        <UserProfileTabs /> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container d-md-none">
                <div className="profile-tabs  " style={{ marginTop: '150px' }}>
                    <UserProfileTabs />
                </div>
            </div>
        
        </>
    )
}

export default Coverandtab