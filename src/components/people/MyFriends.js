import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const MyFriends = () => {
    return (
        <>
            <div className="border-bottom row justify-content-between">
                <div className="col-lg-3 mb-3 col-md-6 ">
                    <div className=" search-inp mt-3">
                        <span className="input-group-text right-0" ><i className="bi bi-search"></i></span>
                        <input type="text" className="form-control " placeholder="Search Member" aria-label="Username" />
                    </div>
                </div>
                <div className="col-lg-3 mb-3 col-md-6 ">
                    <div className=" search-inp mt-3 w-100">
                        <select name="" className='form-select mt-3 slct ' id="" >
                            <option value="">Last Active</option>
                            <option value="">Newest Registered</option>
                            <option value="">Alphabetical</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-4 col-md-6 mt-3">
                    <div className="card people-card">
                        <div className="card-body">
                            <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile'></Image>
                            <Link className='link-hov' href={'#'}><p className="heading text-black mb-2 mt-4">admin</p></Link>
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
                <div className="col-xl-4 col-md-6 mt-3">
                    <div className="card people-card">
                        <div className="card-body">
                            <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile'></Image>
                            <Link className='link-hov' href={'#'}><p className="heading text-black mb-2 mt-4">admin</p></Link>
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
                <div className="col-xl-4 col-md-6 mt-3">
                    <div className="card people-card">
                        <div className="card-body">
                            <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile'></Image>
                            <Link className='link-hov' href={'#'}><p className="heading text-black mb-2 mt-4">admin</p></Link>
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
            </div>
        </>
    )
}

export default MyFriends

