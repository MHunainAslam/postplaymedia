'use client'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import React from 'react'

const ProfileTabs = () => {
    const pathname = usePathname()
    const segments = pathname.split('/');
    const lastSegment = segments[segments.length - 1];

    const { userprofile } = useParams()

    return (
        <>

            <ul className="peopletab overflow-auto nav nav-tabs border-0 layouttab border-b-0 mx-md-3 flex-nowrap">
                <li className={`nav-item nav-link text-center ${lastSegment === 'activity' ? 'active' : ''}`}>
                    <Link className='text-decoration-none' href={`/people/${userprofile}/activity`}>
                        <i className="clr-text heading-m mb-2 bi bi-activity"></i>
                        <p className="para clr-text mb-0">Activity</p>
                    </Link>
                </li>
                <li className={`nav-item nav-link text-center ${lastSegment === 'profile' ? 'active' : ''}`} >
                    <Link className='text-decoration-none' href={`/people/${userprofile}/profile`}>
                        <i className="clr-text heading-m mb-2 bi bi-person-square"></i>
                        <p className="para clr-text mb-0">Profile</p>
                    </Link>
                </li>
                <li className={`nav-item nav-link text-center ${lastSegment === 'friends' ? 'active' : ''}`}>
                    <Link className='text-decoration-none' href={`/people/${userprofile}/friends`}>
                        <i className="clr-text heading-m mb-2 bi bi-person"></i>
                        <p className="para clr-text mb-0">Friends</p>
                    </Link>
                </li>
                <li className={`nav-item nav-link text-center ${lastSegment === 'groups' ? 'active' : ''}`}>
                    <Link className='text-decoration-none' href={`/people/${userprofile}/groups`}>
                        <i className="clr-text heading-m mb-2 bi bi-people"></i>
                        <p className="para clr-text mb-0">Groups</p>
                    </Link>
                </li>
                
                <li className={`nav-item nav-link text-center ${lastSegment === 'media' ? 'active' : ''}`}>
                    <Link className='text-decoration-none' href={`/people/${userprofile}/media`}>
                        <i className="clr-text heading-m mb-2 bi bi-image-fill"></i>
                        <p className="para clr-text mb-0">Media</p>
                    </Link>
                </li>
               

            </ul>

        </>
    )
}

export default ProfileTabs