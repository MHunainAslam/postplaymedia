'use client'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import AllMembers from './AllMembers'
import MyFriends from './MyFriends'
import MyGroups from './MyGroups'
import { UserContext } from '@/app/ActivityLayout'
import PostArea from '../posts/PostArea'
import { Authme, GetToken } from '@/utils/Token'
import { useAppContext } from '@/context/AppContext'
import MyMention from './MyMention'
import AllGroups from './AllGroups'
import Allmembersadmin from './Allmembersadmin'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const ActivityTabs = () => {
    const searchParams = useSearchParams()
    const tab = searchParams.get('activity_tab')
    const token = GetToken('userdetail')
    // const { Userdata } = useContext(UserContext);
    const [postdone, setpostdone] = useState(false)
    const { UserProfiledata, UserProfileloader } = useAppContext()
    const [activeTab, setactiveTab] = useState('all_posts')
    useEffect(() => {
        if (tab) {
            setactiveTab(tab)
        }
    }, [tab])



    return (
        <>
            <div className="pt-5 pb-3">
                <PostArea Userdata={UserProfiledata} UserProfileloader={UserProfileloader} setpostdone={setpostdone} postdone={postdone} />
            </div>
            <div className="activity-tabs mt-5">
                <ul className="nav nav-tabs border-0 " role="tablist">
                    {UserProfiledata?.data?.role?.name !== 'Admin' &&
                        <>
                            <li className={`nav-item nav-link  p-0 ${activeTab === 'all_posts' ? 'active' : ''}`} id="AllMembers-tab" data-bs-toggle="tab" data-bs-target="#AllMembers" type="button" role="tab" aria-controls="AllMembers" aria-selected="false" tabIndex="-1">
                                <Link className='text-decoration-none text-black w-100 py-3 px-2 my-auto d-inline-block' href={{ pathname: `/activity`, query: { activity_tab: 'all_posts' } }}   >
                                    All Members
                                </Link>
                            </li>
                            <li className={`nav-item nav-link  p-0 ${activeTab === 'my_friend' ? 'active' : ''}`} id="MyFriends-tab" data-bs-toggle="tab" data-bs-target="#MyFriends" type="button" role="tab" aria-controls="MyFriends" aria-selected="false" tabIndex="-1">
                                <Link className='text-decoration-none text-black w-100 py-3 px-2 my-auto d-inline-block' href={{ pathname: `/activity`, query: { activity_tab: 'my_friend' } }}   >
                                    My Friends
                                </Link>
                            </li>
                            <li className={`nav-item nav-link  p-0 ${activeTab === 'my_group' ? 'active' : ''}`} id="MyGroups-tab" data-bs-toggle="tab" data-bs-target="#MyGroups" type="button" role="tab" aria-controls="MyGroups" aria-selected="false" tabIndex="-1">
                                <Link className='text-decoration-none text-black w-100 py-3 px-2 my-auto d-inline-block' href={{ pathname: `/activity`, query: { activity_tab: 'my_group' } }}   >
                                    My Groups
                                </Link>
                            </li>

                            <li className={`nav-item nav-link  p-0 ${activeTab === 'my_mention' ? 'active' : ''}`} id="MyMention-tab" data-bs-toggle="tab" data-bs-target="#MyMention" type="button" role="tab" aria-controls="MyMention" aria-selected="false" tabIndex="-1">
                                <Link className='text-decoration-none text-black w-100 py-3 px-2 my-auto d-inline-block' href={{ pathname: `/activity`, query: { activity_tab: 'my_mention' } }}   >
                                    Mentions
                                </Link>
                            </li>
                        </>
                    }
                    {UserProfiledata?.data?.role?.name == 'Admin' &&
                        <>
                            <li className="nav-item nav-link active" id="Allmembersadmin-tab" data-bs-toggle="tab" data-bs-target="#Allmembersadmin" type="button" role="tab" aria-controls="Allmembersadmin" aria-selected="false" tabIndex="-1">
                                All Members
                            </li>
                            <li className="nav-item nav-link" id="AllGroups-tab" data-bs-toggle="tab" data-bs-target="#AllGroups" type="button" role="tab" aria-controls="AllGroups" aria-selected="false" tabIndex="-1">
                                All Groups
                            </li>
                        </>
                    }
                </ul >
                <div className="tab-content ">
                    {UserProfiledata?.data?.role?.name !== 'Admin' && <>
                        <div className={`tab-pane fade ${activeTab === 'all_posts' ? ' active show' : ''}`} id="AllMembers" role="tabpanel" aria-labelledby="AllMembers-tab">
                            <AllMembers postdone={postdone} endpoint={`?section=all&`} />
                        </div>
                        <div className={`tab-pane fade ${activeTab === 'my_friend' ? ' active show' : ''}`} id="MyFriends" role="tabpanel" aria-labelledby="MyFriends-tab">
                            {/* <AllMembers postdone={postdone} endpoint={`?section=friend&`} /> */}
                            <MyFriends />
                        </div>
                        <div className={`tab-pane fade ${activeTab === 'my_group' ? ' active show' : ''}`} id="MyGroups" role="tabpanel" aria-labelledby="MyGroups-tab">
                            {/* <AllMembers postdone={postdone} endpoint={`?section=friend&`} /> */}
                            <MyGroups />
                        </div>
                        <div className={`tab-pane fade ${activeTab === 'my_mention' ? ' active show' : ''}`} id="MyMention" role="tabpanel" aria-labelledby="MyMention-tab">
                            {/* <MyMention endpoint={'/section=mentions?'} /> */}
                            <MyMention endpoint={'/get-my-post-mentions?'} />
                        </div>
                    </>}
                    {UserProfiledata?.data?.role?.name == 'Admin' &&
                        <>
                            <div className="tab-pane fade active show" id="AllGroups" role="tabpanel" aria-labelledby="AllGroups-tab">
                                <AllGroups endpoint={'/get-my-post-mentions?'} />
                            </div>
                            <div className="tab-pane fade" id="Allmembersadmin" role="tabpanel" aria-labelledby="Allmembersadmin-tab">
                                <Allmembersadmin endpoint={'/get-my-post-mentions?'} />
                            </div>
                        </>
                    }
                </div>
            </div >
        </>
    )
}

export default ActivityTabs