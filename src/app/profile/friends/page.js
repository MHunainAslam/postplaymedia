import ProfileLayout from '@/app/ProfileLayout'
import UserProfileLayout from '@/app/UserProfileLayout'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <UserProfileLayout ProfilePages>
            <div className="row">
                <div className="row position-relative">
                    {/* {UserDataLoader ? <Loader /> :
                        <>
                            {UserData?.data?.data?.map((item, i) => ( */}
                    <div className="col-xl-4 col-md-6 mt-3">
                        <div className="card people-card">
                            <div className="card-body">
                                <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile'></Image>
                                <Link className='link-hov' href={'/people/slug/activity'}><p className="heading text-black mb-2 mt-4">abc</p></Link>
                                <p className="para clr-light">Active 2 minutes ago</p>
                                <div className="d-flex fng justify-content-center">
                                    <div className='mx-2'>
                                        <p className="heading mb-0">1</p>
                                        <p className="para">Friends</p>
                                    </div>
                                    <div className='mx-2'>
                                        <p className="heading mb-0">1</p>
                                        <p className="para">Groups</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button className='btn secondary-btn '><p className='mb-0 px-4'>My Profile</p></button>
                            </div>
                        </div>
                    </div>
                    {/* ))}
                        </>
                    } */}
                </div>
            </div>
        </UserProfileLayout>
    )
}

export default page