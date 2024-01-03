'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import Loader from '../Loader'
import { APP_URL, IMG_URL } from '../../../config'
import axios from 'axios'
import { deleteCookie } from 'cookies-next'
import { GetLocaldata, GetToken } from '@/utils/Token'
import { UserContext } from '@/app/ActivityLayout'

const Peoplefriend = ({ getallfrnds, AllFrndsData, UserDataLoader }) => {
    const [authme, setauthme] = useState('')
    const token = GetToken('userdetail')
    const [btndisable, setbtndisable] = useState(false)
    const [Receiverid, setReceiverid] = useState()
    const router = useRouter()
    const userdata = GetLocaldata('userdetail')



    console.log(userdata)

    const unfriend = (e) => {
        setbtndisable(true)
        setReceiverid(e)
        console.log(e)
        axios.delete(`${APP_URL}/api/friendships/unfriend/${e}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('unfriend', response);
                getallfrnds()
                setbtndisable(false)
            })
            .catch(error => {
                console.error(error);
                message.error(error?.response.data?.message)
                setbtndisable(false)
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }
    const imgurl = ({ src }) => {
        return `${IMG_URL}${src}`
    }
    return (
        <>
            <div className="border-bottom row justify-content-between">
                <div className="col-lg-3 mb-3 col-md-6  ">
                    <div className=" search-inp mt-3">
                        <span className="input-group-text right-0 " ><i className="bi bi-search"></i></span>
                        <input type="text" className="form-control " placeholder="Search Member" aria-label="Username" />
                    </div>
                </div>

            </div>
            <div className="row position-relative w-100 mx-auto">

                {UserDataLoader ? <Loader /> :
                    <>
                        {AllFrndsData?.data?.message?.length ?
                            <>
                                {AllFrndsData?.data?.message?.map((item, i) => (
                                    <div className="col-xl-4 col-md-6 mt-3" key={i}>
                                        <div className="card people-card">
                                            <div className="card-body">


                                                {userdata.user_id === item.friend?.id ?
                                                    <>
                                                        {
                                                            item.friend?.profile_photo === null ?
                                                                <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile'></Image>
                                                                :
                                                                <Image loader={imgurl} src={item.friend?.profile_photo.url} alt="" width={100} height={100} className='post-profile object-fit-cover'></Image>

                                                        }
                                                    </>
                                                    :
                                                    <>
                                                        {
                                                            item.friend?.profile_photo === null ?
                                                                <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile'></Image>
                                                                :
                                                                <Image loader={imgurl} src={item.friend?.profile_photo.url} alt="" width={100} height={100} className='post-profile object-fit-cover'></Image>

                                                        }
                                                    </>
                                                }
                                                <Link className='link-hov' href={`/people/${item?.friend?.id}/activity`}><p className="heading text-black mb-2 mt-4 text-capitalize">{item.friend?.name}</p></Link>
                                                <p className="para clr-light">Active 2 minutes ago</p>
                                                <div className="d-flex fng justify-content-center">
                                                    <div className='mx-2'>
                                                        <p className="heading mb-0">{item.friend?.friends_count}</p>
                                                        <p className="para">Friends</p>
                                                    </div>
                                                    <div className='mx-2'>
                                                        <p className="heading mb-0">{item.friend?.group_count}</p>
                                                        <p className="para">Groups</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <button className='btn secondary-btn' disabled={btndisable} onClick={() => unfriend(item.friend?.id)}><p className='mb-0 px-4'>Unfriend</p></button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                            : <div className="alert-box mt-3">
                                <p>You don&apos;t have friends</p>
                            </div>}
                    </>
                }
            </div>
        </>
    )
}

export default Peoplefriend

