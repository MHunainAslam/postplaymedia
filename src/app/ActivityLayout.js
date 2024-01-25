'use client'
import ChatSideBar from '@/components/chatcomponents/ChatSideBar'
import ActivityHeader from '@/components/layout/ActivityHeader'
import ActivitySidebar from '@/components/layout/ActivitySidebar'
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { APP_URL } from '../../config'
import { GetToken } from '@/utils/Token'
import { useRouter } from 'next/navigation'
import { deleteCookie } from 'cookies-next'
export const UserContext = createContext();
const ActivityLayout = ({ children, ActivityPages }) => {
    const router = useRouter()
    const token = GetToken('userdetail')
    const [Userdata, setUserdata] = useState('')
    const [UserdataLoader, setUserdataLoader] = useState(true)
    useEffect(() => {
        axios.get(`${APP_URL}/api/authMe`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('activity', response);
                setUserdata(response?.data)
                setUserdataLoader(false)
            })
            .catch(error => {
                setUserdataLoader(false)
                console.error(error);
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }, [])
    return (
        <>
            {!ActivityPages ? <>{children}</> :
                <>
                    <div className="container-fluid px-0">
                        <div className="row w-100 mx-0">
                            <div className="sidebar-size px-0">
                                <ActivitySidebar />
                            </div>
                            <div className="col px-0">
                                <div className="">
                                    <ActivityHeader Userdata={Userdata?.data} />
                                    <div className="container pt-0 pb-3">
                                        <UserContext.Provider value={{ Userdata, setUserdata }}>
                                            {children}
                                        </UserContext.Provider>
                                    </div>
                                </div>
                            </div>
                            <div className="chatbar-size px-0">
                                <ChatSideBar />
                            </div>
                        </div>
                    </div>
                </>}
        </>
    )
}

export default ActivityLayout