import { grpContext } from '@/app/GroupLayout'
import PostArea from '@/components/posts/PostArea'
import { useAppContext } from '@/context/AppContext'
import React from 'react'
import GrpPostArea from '../GrpPostArea'

const GrpActivity = () => {
    const { UserProfiledata, UserProfileloader } = useAppContext()
    return (
        <>
            <div className="pt-5 pb-3">
                <GrpPostArea />
            </div>
        </>
    )
}

export default GrpActivity