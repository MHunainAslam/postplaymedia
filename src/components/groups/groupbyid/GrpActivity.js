import { grpContext } from '@/app/GroupLayout'
import PostArea from '@/components/posts/PostArea'
import { useAppContext } from '@/context/AppContext'
import React, { useContext } from 'react'
import GrpPostArea from '../GrpPostArea'

const GrpActivity = () => {
    const { grpdata } = useContext(grpContext)
    const { UserProfiledata, UserProfileloader } = useAppContext()
    console.log(grpdata, grpdata?.data?.participants?.participants?.map((item) => (item.user?.id === UserProfiledata?.data?.id)))
    const participants = grpdata?.data?.participants?.participants?.find(item => item.user.id === UserProfiledata?.data?.id)
    console.log(grpdata?.data?.participants?.participants?.find(item => item.user_id === UserProfiledata?.data?.id), 'll', UserProfiledata?.data?.id)


    let matchingItem = grpdata?.data?.participants?.participants?.find(item => item.user_id == UserProfiledata?.data?.id);

    if (matchingItem) {
        console.log("Matching item found:", matchingItem);
    } else {
        console.log("No matching item found.");
    }
    return (
        <>
            {/* || grpdata?.data?.group?.created_by?.id  */}
            <div className="pt-5 pb-3">
                {grpdata?.data?.group?.privacy == 'public' || UserProfiledata?.data?.id === grpdata?.data?.group?.created_by?.id || matchingItem ?
                    <GrpPostArea />
                    :
                    <div className="alert-box">
                        <p className='heading-m clr-primary text-center'>Join Group To Start Posting!</p>
                    </div>
                }
            </div>
        </>
    )
}

export default GrpActivity