import ChatSideBar from '@/components/chatcomponents/ChatSideBar'
import ActivityHeader from '@/components/layout/ActivityHeader'
import ActivitySidebar from '@/components/layout/ActivitySidebar'
import React from 'react'

const ActivityLayout = ({ children, ActivityPages }) => {
  
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
                                    <div className="container py-5">
                                        {children}
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