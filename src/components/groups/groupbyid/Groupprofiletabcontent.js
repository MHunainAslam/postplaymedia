import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import GrpActivity from './GrpActivity'
import GroupMembers from './GroupMembers'
import Invitetabs from '../Invitetabs'
import GroupSetting from './GroupSetting'
import { grpContext } from '@/app/GroupLayout'
import AddRemoveUser from './AddRemoveUser'
import AllMembers from '@/components/activity/AllMembers'
import { useAppContext } from '@/context/AppContext'
import GrpPostArea from '../GrpPostArea'
import JoinReq from './JoinReq'

const Groupprofiletabcontent = () => {
    const router = useRouter()
    const { grpdata } = useContext(grpContext)
    const { UserProfiledata, UserProfileloader } = useAppContext()
    const { groupbyid } = useParams()
    const searchParams = useSearchParams()
    const param = searchParams.get('group-tab')
    const [inviteuserid, setinviteuserid] = useState([])
    const [grpId, setgrpId] = useState('')
    const [btnActive, setbtnActive] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const [TabState, setTabState] = useState('grpactivity')
    let matchingItem = grpdata?.data?.participants?.participants?.find(item => item.user_id == UserProfiledata?.data?.id);
    if (matchingItem) {
        console.log("Matching item found:", matchingItem);
    } else {
        console.log("No matching item found.");
    }
    useEffect(() => {
        setgrpId(grpdata?.data?.group?.id)
    }, [grpdata])

    useEffect(() => {
        if (param === null) {
            setTabState('grpactivity')
        } else {
            setTabState(param)
        }
    }, [param, TabState])
    const sendinvite = (e) => {
        e.preventDefault()
        setisLoading(true)
        setbtnActive(true)
        axios.post(`${APP_URL}/api/groups/${grpId}`, { user_ids: inviteuserid, type: '' }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('create grp', response);
                setbtnActive(false)
                setisLoading(false)
                message.success(response.data.message)

            })
            .catch(error => {
                console.error(error);
                setisLoading(false)
                setbtnActive(false)

                message.error(error?.response.data?.message)
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });

    }
    const [postdone, setpostdone] = useState(false)
    return (
        <>
            <div className="tab-content ">
                <div className={`tab-pane fade  ${TabState === 'grpactivity' ? 'active show' : ''}`} id="grpactivity" role="tabpanel" aria-labelledby="grpactivity-tab">
                    <div className="pt-3 pb-3">
                        {grpdata?.data?.group?.privacy == 'public' || UserProfiledata?.data?.id == grpdata?.data?.group?.created_by?.id || matchingItem ?
                            <GrpPostArea setpostdone={setpostdone} postdone={postdone} />
                            :
                            <div className="alert-box">
                                <p className='heading-m clr-primary text-center'>Join Group To Start Posting!</p>
                            </div>
                        }
                    </div>
                    <AllMembers endpoint={`/getPostByGroupId?group_id=${groupbyid}&`} postdone={postdone} />
                </div>
                <div className={`tab-pane fade  ${TabState === 'grpabout' ? 'active show' : ''}`} id="grpabout" role="tabpanel" aria-labelledby="grpabout-tab">
                </div>
                <div className={`tab-pane fade  ${TabState === 'grpmember' ? 'active show' : ''}`} id="grpmember" role="tabpanel" aria-labelledby="grpmember-tab">
                    <GroupMembers />

                </div>
                <div className={`tab-pane fade  ${TabState === 'grpsetting' ? 'active show' : ''}`} id="grpsetting" role="tabpanel" aria-labelledby="grpsetting-tab">
                    <GroupSetting />
                </div>
                <div className={`tab-pane fade  ${TabState === 'joinrequests' ? 'active show' : ''}`} id="joinrequests" role="tabpanel" aria-labelledby="joinrequests-tab">
                    <JoinReq  />
                </div>
                <div className={`tab-pane fade  ${TabState === 'grpinvite' ? 'active show' : ''}`} id="grpinvite" role="tabpanel" aria-labelledby="grpinvite-tab">
                    <AddRemoveUser setinviteuserid={setinviteuserid} />
                    {/* <div className="d-flex justify-content-end">
                        sss
                        <button className='btn primary-btn mt-4 px-5' type="button" disabled={btnActive} onClick={sendinvite}><p>Send {isLoading ? <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span> : ''}</p></button>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Groupprofiletabcontent