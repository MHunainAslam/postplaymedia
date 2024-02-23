'use client'
import { grpContext } from '@/app/GroupLayout'
import { useAppContext } from '@/context/AppContext'
import { joingrp } from '@/utils/GrpFunctions'
import axios from 'axios'
import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import { APP_URL } from '../../../../config'
import { deleteCookie } from 'cookies-next'
import { GetToken } from '@/utils/Token'

const GroupProfileTab = ({ grpdata, Btn_Trigger, getgrpdata }) => {
    const pathname = usePathname()
    const token = GetToken('userdetail')
    const router = useRouter()
    const { UserProfiledata, UserProfileloader } = useAppContext()
    const segments = pathname.split('/');
    const lastSegment = segments[segments.length - 1];
    const { groupbyid } = useParams()
    const LeaveGrp = (e) => {
        axios.delete(`${APP_URL}/api/groups/${groupbyid}`, { user_id: e, type: 'remove' }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                message.success(response.data.message)
                router.push('/groups')

            })
            .catch(error => {
                console.error(error);
                message.error(error?.response.data?.message)
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }




    const accptgrpreq = ({ e, endpoint }) => {
        axios.post(`${APP_URL}/api/groups/${endpoint}`, {
            user_id: UserProfiledata?.data?.id,
            group_id: e
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                // Handle successful response here
                console.log('accept grp inv', response.data);
            })
            .catch(error => {
                // Handle error here
                console.error(error);
            });
    }

    return (
        <>

            <ul className="peopletab overflow-auto nav nav-tabs border-0 layouttab border-b-0 mx-md-3 flex-nowrap justify-content-between">
                <li className={`nav-item nav-link text-center ${lastSegment === 'grpactivity' ? 'active' : ''}`}>
                    <Link className='text-decoration-none' href={`/groups/${groupbyid}?group-tab=grpactivity`}>
                        <i className="clr-text heading-m mb-2 bi bi-activity"></i>
                        <p className="para clr-text mb-0">Activity </p>
                    </Link>
                </li>
                {/* <li className={`nav-item nav-link text-center ${lastSegment === 'grpabout' ? 'active' : ''}`} >
                    <Link className='text-decoration-none' href={`/groups/${groupbyid}?group-tab=grpabout`}>
                        <i className="clr-text heading-m mb-2 bi bi-person-square"></i>
                        <p className="para clr-text mb-0">About</p>
                    </Link>
                </li> */}

                <li className={`nav-item nav-link text-center ${lastSegment === 'grpmember' ? 'active' : ''}`}>
                    <Link className='text-decoration-none' href={`/groups/${groupbyid}?group-tab=grpmember`}>
                        <i className="clr-text heading-m mb-2 bi bi-people"></i>
                        <p className="para clr-text mb-0">Members</p>
                    </Link>
                </li>

                {grpdata?.data?.group?.created_by?.id === UserProfiledata?.data?.id && <>
                    <li className={`nav-item nav-link text-center ${lastSegment === 'grpsetting' ? 'active' : ''}`}>
                        <Link className='text-decoration-none' href={`/groups/${groupbyid}?group-tab=grpsetting`}>
                            <i className="clr-text heading-m mb-2 bi bi-gear"></i>
                            <p className="para clr-text mb-0">Settings</p>
                        </Link>
                    </li>
                    <li className={`nav-item nav-link text-center ${lastSegment === 'joinrequests' ? 'active' : ''}`}>
                        <Link className='text-decoration-none' href={`/groups/${groupbyid}?group-tab=joinrequests`}>
                            <i className="clr-text heading-m mb-2 bi bi-person-plus-fill"></i>
                            <p className="para clr-text mb-0">Join Requests</p>
                        </Link>
                    </li>

                </>}
                {grpdata?.data?.group?.invitation === 'all' && (
                    <li className={`nav-item nav-link text-center ${lastSegment === 'grpinvite' ? 'active' : ''}`}>
                        <Link className='text-decoration-none' href={`/groups/${groupbyid}?group-tab=grpinvite`}>
                            <i className="clr-text heading-m mb-2 bi bi-plus-circle"></i>
                            <p className="para clr-text mb-0">Invite</p>
                        </Link>
                    </li>
                )}
                {grpdata?.data?.group?.invitation === 'group_admins_only' ? grpdata?.data?.group?.created_by?.id === UserProfiledata?.data?.id && (
                    <li className={`nav-item nav-link text-center ${lastSegment === 'grpinvite' ? 'active' : ''}`}>
                        <Link className='text-decoration-none' href={`/groups/${groupbyid}?group-tab=grpinvite`}>
                            <i className="clr-text heading-m mb-2 bi bi-plus-circle"></i>
                            <p className="para clr-text mb-0">Invite</p>
                        </Link>
                    </li>)
                    : ''}
                <li className={`nav-item nav-link text-center pointer`}>

                    {UserProfiledata?.data?.id === grpdata?.data?.group?.created_by?.id ?
                        <p className="para clr-text mb-0" data-bs-toggle="modal" data-bs-target="#DltGroup">
                            <i class="bi bi-trash3 clr-text heading-m mb-2"></i> <br />
                            Delete Group
                        </p>
                        : <>{Btn_Trigger === 'view-group' ?
                            <p className="para clr-text mb-0" data-bs-toggle="modal" data-bs-target="#LeaveGroup">
                                <i class="bi bi-x-octagon clr-text heading-m mb-2"></i> <br />
                                Leave Group
                            </p>


                            :
                            Btn_Trigger != 'accept-request' ?

                                <p className="para clr-text mb-0" onClick={
                                    Btn_Trigger === 'join-now' ? () => joingrp({ e: grpdata?.data?.group?.id, type: 'send', getallgrp: getgrpdata }) :
                                        Btn_Trigger === 'withdrawl-request' ? () => joingrp({ e: grpdata?.data?.group?.id, getallgrp: getgrpdata, type: 'withdraw' }) :
                                            ''
                                }>

                                    {
                                        Btn_Trigger === 'join-now' ? <> <i class="bi bi-file-plus clr-text heading-m mb-2"></i> <br /> Join Group </> :
                                            Btn_Trigger === 'withdrawl-request' ? <> <i class="bi bi-hourglass-split clr-text heading-m mb-2"></i> <br />  Pending Group Request  </> :
                                                Btn_Trigger === 'pending' ? <> <i class="bi bi-x-octagon clr-text heading-m mb-2"></i> <br /> Cancel Group Request </> :
                                                    ''}

                                </p>
                                : Btn_Trigger === 'accept-request' ?
                                    <div className='d-flex'>
                                        <p className="para clr-text mb-0" onClick={() => { accptgrpreq({ e: grpdata?.data?.group?.id, endpoint: 'acceptInvite' }), getgrpdata() }}>
                                            <i class="bi bi-check-lg clr-text heading-m mb-2"></i><br />
                                            Accept</p>
                                        <p className="para clr-text mb-0 ps-4" onClick={() => { accptgrpreq({ e: grpdata?.data?.group?.id, endpoint: 'rejectInvite' }), getgrpdata() }}>
                                            <i class="bi bi-x-octagon clr-text heading-m mb-2"></i> <br />
                                            Reject</p>
                                    </div>
                                    :

                                    ''
                        }
                        </>

                    }



                </li>

            </ul>

        </>
    )
}

export default GroupProfileTab
