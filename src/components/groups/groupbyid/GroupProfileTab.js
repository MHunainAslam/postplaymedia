'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const GroupProfileTab = ({ Userdata }) => {
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
                        <p className="para clr-text mb-0">About</p>
                    </Link>
                </li>

                <li className={`nav-item nav-link text-center ${lastSegment === 'groups' ? 'active' : ''}`}>
                    <Link className='text-decoration-none' href={'/profile/groups'}>
                        <i className="clr-text heading-m mb-2 bi bi-people"></i>
                        <p className="para clr-text mb-0">Members</p>
                    </Link>
                </li>
              
               
             
                <li className={`nav-item nav-link text-center ${lastSegment === 'setting' ? 'active' : ''}`}>
                    <Link className='text-decoration-none' href={'/profile/setting'}>
                        <i className="clr-text heading-m mb-2 bi bi-gear"></i>
                        <p className="para clr-text mb-0">Settings</p>
                    </Link>
                </li>
                <li className={`nav-item nav-link text-center ${lastSegment === 'setting' ? 'active' : ''}`}>
                    <Link className='text-decoration-none' href={'/profile/setting'}>
                        <i className="clr-text heading-m mb-2 bi bi-gear"></i>
                        <p className="para clr-text mb-0">Invite</p>
                    </Link>
                </li>

            </ul>

        </>
    )
}

export default GroupProfileTab
