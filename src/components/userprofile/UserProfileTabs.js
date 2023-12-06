'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const UserProfileTabs = ({ Userdata }) => {
    const pathname = usePathname()
    const segments = pathname.split('/');
    const lastSegment = segments[segments.length - 1];
    console.log(lastSegment)

    return (
        <>

            <ul className="peopletab overflow-auto nav nav-tabs border-0 border-b-0 px-md-3 flex-nowrap">
                <li className={`nav-item nav-link text-center ${lastSegment === 'activity' ? 'active' : ''}`}>
                    <Link className='text-decoration-none' href={'/profile/activity'}>
                        <i className="clr-text heading-m mb-2 bi bi-activity"></i>
                        <p className="para clr-text mb-0">Activity </p>
                    </Link>
                </li>
                <li className={`nav-item nav-link text-center ${lastSegment === 'profile' ? 'active' : ''}`} >
                    <Link className='text-decoration-none' href={'/profile/profile'}>
                        <i className="clr-text heading-m mb-2 bi bi-person-square"></i>
                        <p className="para clr-text mb-0">Profile</p>
                    </Link>
                </li>
                <li className={`nav-item nav-link text-center ${lastSegment === 'friends' ? 'active' : ''}`}>
                    <Link className='text-decoration-none' href={'/profile/friends'}>
                        <i className="clr-text heading-m mb-2 bi bi-person"></i>
                        <p className="para clr-text mb-0">Friends</p>
                    </Link>
                </li>
                <li className={`nav-item nav-link text-center ${lastSegment === 'groups' ? 'active' : ''}`}>
                    <Link className='text-decoration-none' href={'/profile/groups'}>
                        <i className="clr-text heading-m mb-2 bi bi-people"></i>
                        <p className="para clr-text mb-0">Groups</p>
                    </Link>
                </li>
                {/* <li className={`nav-item nav-link text-center ${lastSegment === 'forums' ? 'active' : ''}`}>
                    <Link className='text-decoration-none' href={'/profile/forums'}>
                        <i className="clr-text heading-m mb-2 bi bi-chat"></i>
                        <p className="para clr-text mb-0">Forums</p>
                    </Link>
                </li> */}
                <li className={`nav-item nav-link text-center ${lastSegment === 'media' ? 'active' : ''}`}>
                    <Link className='text-decoration-none' href={'/profile/media'}>
                        <i className="clr-text heading-m mb-2 bi bi-image-fill"></i>
                        <p className="para clr-text mb-0">Media</p>
                    </Link>
                </li>
                <li className={`nav-item nav-link text-center ${lastSegment === 'notification' ? 'active' : ''}`}>
                    <Link className='text-decoration-none' href={'/profile/notification'}>
                        <i className="clr-text heading-m mb-2 bi bi-bell"></i>
                        <p className="para clr-text mb-0">Notifications</p>
                    </Link>
                </li>
                <li className={`nav-item nav-link text-center ${lastSegment === 'messages' ? 'active' : ''}`}>
                    <Link className='text-decoration-none' href={'/profile/messages'}>
                        <i className="clr-text heading-m mb-2 bi bi-envelope-open"></i>
                        <p className="para clr-text mb-0">Messages</p>
                    </Link>
                </li>
                <li className={`nav-item nav-link text-center ${lastSegment === 'setting' ? 'active' : ''}`}>
                    <Link className='text-decoration-none' href={'/profile/setting'}>
                        <i className="clr-text heading-m mb-2 bi bi-gear"></i>
                        <p className="para clr-text mb-0">Settings</p>
                    </Link>
                </li>

            </ul>

        </>
    )
}

export default UserProfileTabs

