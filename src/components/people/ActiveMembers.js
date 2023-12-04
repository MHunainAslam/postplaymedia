'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import Loader from '../Loader'
import { APP_URL } from '../../../config'
import axios from 'axios'
import { deleteCookie } from 'cookies-next'
import { token } from '@/utils/Token'
import { useRouter } from 'next/navigation'
import { message } from 'antd'
const ActiveMembers = ({ UserData, UserDataLoader }) => {
    const [Receiverid, setReceiverid] = useState()
    const router = useRouter()
    const sendreq = (e) => {
        setReceiverid(e)
        console.log(e)
        axios.post(`${APP_URL}/api/friend-requests/send`, { receiver_id: Receiverid }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('img', response);
                setImgId(response.data.data.last_inserted_id)
            })
            .catch(error => {
                console.error(error);
                message.error(error?.response.data?.message)
                if (error.response.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }
    return (
        <>
            <div className="border-bottom row justify-content-between">
                <div className="col-lg-3 mb-3 col-md-6 ">
                    <div className=" search-inp mt-3">
                        <span className="input-group-text right-0" ><i className="bi bi-search"></i></span>
                        <input type="text" className="form-control " placeholder="Search Member" aria-label="Username" />
                    </div>
                </div>
                {/* <div className="col-lg-3 mb-3 col-md-6 ">
                    <div className=" search-inp mt-3 w-100">
                        <select name="" className='form-select mt-3 slct ' id="" >
                            <option value="">Last Active</option>
                            <option value="">Newest Registered</option>
                            <option value="">Alphabetical</option>
                        </select>
                    </div>
                </div> */}
            </div>
            <div className="row position-relative">
                {UserDataLoader ? <Loader /> :
                    <>
                        {UserData?.data?.data?.map((item, i) => (
                            <div className="col-xl-4 col-md-6 mt-3" key={i}>
                                <div className="card people-card">
                                    <div className="card-body">
                                        <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile'></Image>
                                        <Link className='link-hov' href={'/people/slug/activity'}><p className="heading text-black mb-2 mt-4">{item.name}</p></Link>
                                        <p className="para clr-light">Active 2 minutes ago</p>
                                        <div className="d-flex fng justify-content-center">
                                            <div className='mx-2'>
                                                <p className="heading mb-0">1</p>
                                                <p className="para">Friends</p>
                                            </div>
                                            <div className='mx-2'>
                                                <p className="heading mb-0">1</p>
                                                <p className="para">Groups</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button className='btn secondary-btn' onClick={() => sendreq(item.id)}><p className='mb-0 px-4'>Add Friend</p></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                }
            </div>
        </>
    )
}

export default ActiveMembers