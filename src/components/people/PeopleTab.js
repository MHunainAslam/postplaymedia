'use client'
import Image from 'next/image'
import ActiveMembers from './ActiveMembers'
import MyFriends from './MyFriends'
import { token } from '@/utils/Token'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { APP_URL } from '../../../config'

const PeopleTab = () => {
    const [UserData, setUserData] = useState([])
    const [UserDataLoader, setUserDataLoader] = useState(true)
    const router = useRouter()
    useEffect(() => {
        axios.get(`${APP_URL}/api/users`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('user', response);
                setUserData(response)
                setUserDataLoader(false)
            })
            .catch(error => {
                console.error(error);
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
                setUserDataLoader(false)
            });
    }, [])
    return (
        <>
            <div className="activity-tabs mt-5">
                <ul className="nav nav-tabs border-0 " role="tablist">
                    <li className="nav-item nav-link active" id="ActiveMembers-tab" data-bs-toggle="tab" data-bs-target="#ActiveMembers" type="button" role="tab" aria-controls="ActiveMembers" aria-selected="false" tabIndex="-1">
                        Active Members <span className='comment-active ms-1'>{UserData?.data?.data?.length}</span>
                    </li>
                    <li className="nav-item nav-link " id="MyFriends-tab" data-bs-toggle="tab" data-bs-target="#MyFriends" type="button" role="tab" aria-controls="MyFriends" aria-selected="false" tabIndex="-1">
                        My Friends <span className='comment-active ms-1'>7</span>
                    </li>

                </ul>
                <div className="tab-content ">
                    <div className="tab-pane fade active show" id="ActiveMembers" role="tabpanel" aria-labelledby="ActiveMembers-tab">
                        <ActiveMembers UserData={UserData} UserDataLoader={UserDataLoader} />
                    </div>
                    <div className="tab-pane fade " id="MyFriends" role="tabpanel" aria-labelledby="MyFriends-tab">
                        <MyFriends />
                    </div>

                </div>
            </div>
        </>
    )
}

export default PeopleTab