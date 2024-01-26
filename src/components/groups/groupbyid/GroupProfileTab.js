'use client'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import React from 'react'

const GroupProfileTab = () => {
    const pathname = usePathname()
    const segments = pathname.split('/');
    const lastSegment = segments[segments.length - 1];
    console.log(lastSegment)
    const { groupbyid } = useParams()

    return (
        <>

            <ul className="peopletab overflow-auto nav nav-tabs border-0 border-b-0 px-md-3 flex-nowrap justify-content-between">
                <li className={`nav-item nav-link text-center ${lastSegment === 'grpactivity' ? 'active' : ''}`}>
                    <Link className='text-decoration-none' href={`/groups/${groupbyid}?group-tab=grpactivity`}>
                        <i className="clr-text heading-m mb-2 bi bi-activity"></i>
                        <p className="para clr-text mb-0">Activity </p>
                    </Link>
                </li>
                <li className={`nav-item nav-link text-center ${lastSegment === 'grpabout' ? 'active' : ''}`} >
                    <Link className='text-decoration-none' href={`/groups/${groupbyid}?group-tab=grpabout`}>
                        <i className="clr-text heading-m mb-2 bi bi-person-square"></i>
                        <p className="para clr-text mb-0">About</p>
                    </Link>
                </li>

                <li className={`nav-item nav-link text-center ${lastSegment === 'grpmember' ? 'active' : ''}`}>
                    <Link className='text-decoration-none' href={`/groups/${groupbyid}?group-tab=grpmember`}>
                        <i className="clr-text heading-m mb-2 bi bi-people"></i>
                        <p className="para clr-text mb-0">Members</p>
                    </Link>
                </li>



                <li className={`nav-item nav-link text-center ${lastSegment === 'grpsetting' ? 'active' : ''}`}>
                    <Link className='text-decoration-none' href={`/groups/${groupbyid}?group-tab=grpsetting`}>
                        <i className="clr-text heading-m mb-2 bi bi-gear"></i>
                        <p className="para clr-text mb-0">Settings</p>
                    </Link>
                </li>
                <li className={`nav-item nav-link text-center ${lastSegment === 'grpinvite' ? 'active' : ''}`}>
                    <Link className='text-decoration-none' href={`/groups/${groupbyid}?group-tab=grpinvite`}>
                        <i className="clr-text heading-m mb-2 bi bi-plus-circle"></i>
                        <p className="para clr-text mb-0">Invite</p>
                    </Link>
                </li>

            </ul>

        </>
    )
}

export default GroupProfileTab