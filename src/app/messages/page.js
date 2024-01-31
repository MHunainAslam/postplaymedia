'use client'
import ActivityLayout from '@/app/ActivityLayout'
import Chat from '@/components/chat/Chat'
import ChatSideBar from '@/components/chatcomponents/ChatSideBar'
import ActivityHeader from '@/components/layout/ActivityHeader'
import ActivitySidebar from '@/components/layout/ActivitySidebar'
import axios from 'axios'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { APP_URL } from '../../../config'
import { deleteCookie } from 'cookies-next'
import { GetToken } from '@/utils/Token'
import ChatScreen from '@/components/chat/ChatScreen'

const Page = () => {
    const token = GetToken('userdetail')
    const { messagechat } = useParams()
    const router = useRouter()
    const searchParams = useSearchParams()
    const param = searchParams.get('chat')

    const [TabState, setTabState] = useState(param)
    useEffect(() => {
        setTabState(param)

    }, [param, TabState, router])
    useEffect(() => {
        document.querySelector('.closechatmodal').click()
    }, [TabState])


    return (
        <>
            <div className="container-fluid px-0">
                <div className="row w-100 mx-0">
                    <div className="sidebar-size px-0">
                        <ActivitySidebar />
                    </div>
                    <div className="col px-0 ">
                        <div className="d-flex flex-column min-vh-100">

                            <div className=" flex-1" >
                                <div className="">
                                    <div className="tab-content flex-1">

                                        <div className={`tab-pane fade  ${TabState === TabState ? 'active show' : ''}`} id={TabState} role="tabpanel" aria-labelledby="1-tab">
                                            <div className='chat-sec'>
                                                {TabState === TabState && <ActivityHeader />}
                                       
                                                <Chat TabState={TabState} param={param} />
                                                {/* <ChatScreen TabState={TabState} /> */}
                                            </div>
                                        </div>
                                        {/* <div className={`tab-pane fade  ${TabState === '2' ? 'active show' : ''}`} id="2" role="tabpanel" aria-labelledby="2-tab">
                                            <div className='chat-sec'>
                                                {TabState === '2' && <ActivityHeader />}
                                                <Chat TabState={TabState} />
                                            </div>
                                        </div>
                                        <div className={`tab-pane fade  ${TabState === '3' ? 'active show' : ''}`} id="3" role="tabpanel" aria-labelledby="3-tab">
                                            <div className='chat-sec'>
                                                {TabState === '3' && <ActivityHeader />}
                                                <Chat TabState={TabState} />
                                            </div>
                                        </div> */}

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="chatbar-size px-0">
                        <ChatSideBar />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Page