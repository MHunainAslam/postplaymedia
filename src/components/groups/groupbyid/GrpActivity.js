import { grpContext } from '@/app/GroupLayout'
import PostArea from '@/components/posts/PostArea'
import { useAppContext } from '@/context/AppContext'
import React from 'react'

const GrpActivity = () => {
    const { UserProfiledata, UserProfileloader } = useAppContext()
    return (
        <>
            <div className="pt-5 pb-3">
                <PostArea Userdata={UserProfiledata} UserProfileloader={UserProfileloader} />
            </div>
        </>
    )
}

export default GrpActivity