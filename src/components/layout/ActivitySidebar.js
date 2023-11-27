'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavLinks from './NavLinks'
import { usePathname, useRouter } from 'next/navigation'

const ActivitySidebar = () => {
    // console.log(usePathname())
    const pathname = usePathname()
    return (
        <>
            {/* <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#ActivitySidebar" aria-controls="ActivitySidebar">
                Button with data-bs-target
            </button> */}

            <div className="offcanvas offcanvas-start sidebar-offcanvas " tabIndex="-1" id="ActivitySidebar" aria-labelledby="ActivitySidebarLabel">

                <div className="offcanvas-body p-0 ">
                    <div className=" p-0">
                        <div className='SideBarTop'>
                            <button type="button" className="close-canva d-md-none" data-bs-dismiss="offcanvas" aria-label="Close"><i className="bi bi-x-lg"></i></button>
                            <Image src={'/assets/images/logo/Logo.png'} alt='' width={100} height={100}></Image>
                            <div className="card admin-card c-card">
                                <div className="card-body py-4">
                                    <div className='admin-img mb-4'>
                                        <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100}></Image>
                                    </div>
                                    <Link href={'#'} className="heading mb-0 text-decoration-none">
                                        admin
                                    </Link>
                                    <p className="para">
                                        Administrator
                                    </p>
                                    <hr />
                                    <div className="d-flex justify-content-center">
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
                            </div>
                        </div>
                    </div>
                    <div className='sidebar-nav px-xl-5 mt-5'>
                        <li>
                            <Link href={'/activity'} className={pathname === '/activity' ? 'active-nav' : ''}>
                                <i className="bi bi-activity"></i> <br />
                                <p>Activity</p>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/photos'} className={pathname === '/photos' ? 'active-nav' : ''}>
                                <i className="bi bi-image-fill"></i> <br />
                                <p>Photos</p>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/watch'} className={pathname === '/watch' ? 'active-nav' : ''}>
                                <i className="bi bi-play"></i> <br />
                                <p>Watch</p>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/people'} className={pathname === '/people' ? 'active-nav' : ''}>
                                <i className="bi bi-person"></i> <br />
                                <p>People</p>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/groups'} className={pathname === '/groups' ? 'active-nav' : ''}>
                                <i className="bi bi-people"></i> <br />
                                <p>Groups</p>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/jobs'} className={pathname === '/jobs' ? 'active-nav' : ''}>
                                <i className="bi bi-briefcase-fill "></i> <br />
                                <p>Jobs</p>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/forums'} className={pathname === '/forums' ? 'active-nav' : ''}>
                                <i className="bi bi-chat"></i> <br />
                                <p>Forums</p>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/blog'} className={pathname === '/blog' ? 'active-nav' : ''}>
                                <i className="bi bi-newspaper"></i> <br />
                                <p>Blog</p>
                            </Link>
                        </li>

                    </div>
                </div>
            </div>


        </>
    )
}

export default ActivitySidebar