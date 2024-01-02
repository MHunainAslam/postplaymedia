'use client'
import ActivityLayout from '@/app/ActivityLayout'
import Chat from '@/components/chat/Chat'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {


    const { messagechat } = useParams()
    const router = useRouter()
    const searchParams = useSearchParams()
    const param = searchParams.get('chat')

    console.log('lol', param)
    const [TabState, setTabState] = useState('1')
    useEffect(() => {
        if (param === null) {
            setTabState('1')
        } else {
            setTabState(param)
        }
        console.log(TabState, 'TabState')
    }, [param, TabState])
    useEffect(() => {
        document.querySelector('.closechatmodal').click()
    }, [TabState])
    return (
        <>
            <ActivityLayout ActivityPages>
                <div className="tab-content bg-dark ">

                    <div className={`tab-pane fade  ${TabState === '1' ? 'active show' : ''}`} id="1" role="tabpanel" aria-labelledby="1-tab">
                        <Chat TabState={TabState} />
                    </div>
                    <div className={`tab-pane fade  ${TabState === '2' ? 'active show' : ''}`} id="2" role="tabpanel" aria-labelledby="2-tab">
                        <Chat TabState={TabState} />
                    </div>
                    <div className={`tab-pane fade  ${TabState === '3' ? 'active show' : ''}`} id="3" role="tabpanel" aria-labelledby="3-tab">
                        <Chat TabState={TabState} />
                    </div>
                </div>

            </ActivityLayout>
        </>
    )
}

export default Page