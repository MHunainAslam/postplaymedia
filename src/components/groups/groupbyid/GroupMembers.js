import { GetToken, imgurl } from '@/utils/Token'
import React, { useContext, useEffect, useState } from 'react'
import { APP_URL } from '../../../../config'
import axios from 'axios'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import Loader from '@/components/Loader'
import Link from 'next/link'
import Image from 'next/image'
import { grpContext } from '@/app/GroupLayout'
import AppContext from 'antd/es/app/context'
import { useAppContext } from '@/context/AppContext'
import LeaveGroup from './LeaveGroup'
import RemoveUserFromGrp from './RemoveUserFromGrp'

const GroupMembers = () => {
    const { UserProfiledata } = useAppContext()
    const router = useRouter()
    const token = GetToken('userdetail')
    const { grpdata, getgrpdata } = useContext(grpContext)
    const [isLoading, setisLoading] = useState(true)
    const [grpMembers, setgrpMembers] = useState([])
    const [userid, setuserid] = useState('')
    useEffect(() => {
        setisLoading(false)
        setgrpMembers(grpdata?.data?.participants?.participants)
    }, [grpdata])


    return (
        <>
            <div className="row position-relative w-100 mx-auto">

                {isLoading ? <Loader /> :
                    <>
                        {grpMembers?.length === 0 ?
                            <div className="alert-box mt-3">
                                <p>No Members Found!</p>
                            </div> :
                            <>
                                {grpMembers?.map((item, i) => (
                                    <div className="col-xl-4 col-md-6 mt-3" key={i}>
                                        <div className="card people-card h-100">
                                            <div className="card-body">


                                                {
                                                    item.user?.profile_photo === null ?
                                                        <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile'></Image>
                                                        :
                                                        <Image loader={imgurl} src={item.user?.profile_photo.url} alt="" width={100} height={100} className='post-profile object-fit-cover'></Image>

                                                }
                                                {UserProfiledata?.data?.id === item?.user?.id ?
                                                    <Link href={`/profile/activity`} className='link-hov' >
                                                        <p className=' heading text-black my-4 text-capitalize'>{item?.user?.name}</p>
                                                    </Link>
                                                    :
                                                    <Link href={`/people/${item?.user?.id}/activity`} className='link-hov' >
                                                        <p className=' heading text-black my-4 text-capitalize'>{item?.user?.name}</p>
                                                    </Link>
                                                }
                                                {/* <p className="heading text-black mb-2 mt-4 text-capitalize">{item?.user?.name}</p> */}

                                                <div className="d-flex fng justify-content-center">
                                                    <div className='mx-2'>
                                                        <p className="heading mb-0">{item.user?.friends_count}</p>
                                                        <p className="para">Friends</p>
                                                    </div>
                                                    <div className='mx-2'>
                                                        <p className="heading mb-0">{item.user?.group_count}</p>
                                                        <p className="para">Groups</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                {UserProfiledata?.data?.id === item?.user?.id ?
                                                    ''
                                                    :
                                                    <>
                                                        {UserProfiledata?.data?.id === grpdata?.data?.group?.created_by?.id &&
                                                            <button className='btn-outline-danger rounded-5 btn px-4 py-1' data-bs-toggle="modal" onClick={(e) => setuserid(item?.user?.id)} data-bs-target="#RemoveUserFromGrp">Remove User </button>}
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        }
                    </>
                }
            </div>
            <RemoveUserFromGrp getgrpdata={getgrpdata} userid={userid} />
        </>
    )
}

export default GroupMembers