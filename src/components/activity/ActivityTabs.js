'use client'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import AllMembers from './AllMembers'
import MyFriends from './MyFriends'
import MyGroups from './MyGroups'
import Mention from './Mention'
import { UserContext } from '@/app/ActivityLayout'
import PostArea from '../posts/PostArea'
import { Authme, GetToken } from '@/utils/Token'
import { useAppContext } from '@/context/AppContext'

const ActivityTabs = () => {

    const token = GetToken('userdetail')
    // const { Userdata } = useContext(UserContext);
    const [postdone, setpostdone] = useState(false)
    const { UserProfiledata, UserProfileloader } = useAppContext()



    return (
        <>
            <div className="pt-5 pb-3">
                <PostArea Userdata={UserProfiledata} UserProfileloader={UserProfileloader} setpostdone={setpostdone} postdone={postdone} />
            </div>
            <div className="activity-tabs mt-5">
                <ul className="nav nav-tabs border-0 " role="tablist">
                    <li className="nav-item nav-link active" id="AllMembers-tab" data-bs-toggle="tab" data-bs-target="#AllMembers" type="button" role="tab" aria-controls="AllMembers" aria-selected="false" tabIndex="-1">
                        All Members
                    </li>
                    <li className="nav-item nav-link" id="MyFriends-tab" data-bs-toggle="tab" data-bs-target="#MyFriends" type="button" role="tab" aria-controls="MyFriends" aria-selected="false" tabIndex="-1">
                        My Friends
                    </li>
                    <li className="nav-item nav-link" id="MyGroups-tab" data-bs-toggle="tab" data-bs-target="#MyGroups" type="button" role="tab" aria-controls="MyGroups" aria-selected="false" tabIndex="-1">
                        My Groups
                    </li>
                    <li className="nav-item nav-link" id="MyMention-tab" data-bs-toggle="tab" data-bs-target="#MyMention" type="button" role="tab" aria-controls="MyMention" aria-selected="false" tabIndex="-1">
                        Mentions
                    </li>
                </ul>
                <div className="tab-content ">
                    <div className="tab-pane fade active show" id="AllMembers" role="tabpanel" aria-labelledby="AllMembers-tab">
                        <AllMembers postdone={postdone} />
                    </div>
                    <div className="tab-pane fade" id="MyFriends" role="tabpanel" aria-labelledby="MyFriends-tab">
                        <MyFriends />
                    </div>
                    <div className="tab-pane fade" id="MyGroups" role="tabpanel" aria-labelledby="MyGroups-tab">
                        <MyGroups />
                    </div>
                    <div className="tab-pane fade" id="MyMention" role="tabpanel" aria-labelledby="MyMention-tab">
                        <Mention />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ActivityTabs