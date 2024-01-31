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
import { useAppContext } from '@/context/AppContext'
export const UserContext = createContext();
const ActivityLayout = ({ children, ActivityPages }) => {
    const router = useRouter()
    const token = GetToken('userdetail')
    const { UserProfiledata, UserProfileloader } = useAppContext()
    const [Userdata, setUserdata] = useState(UserProfiledata)
    const [UserdataLoader, setUserdataLoader] = useState(true)
    useEffect(() => {
        setUserdata(UserProfiledata)
    }, [UserProfiledata])
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
                                    <ActivityHeader />
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