'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { APP_URL, IMG_URL } from '../../../../config'
import { token } from '@/utils/Token'
import { useRouter } from 'next/navigation'
import { deleteCookie } from 'cookies-next'
import axios from 'axios'
import Loader from '@/components/Loader'

const AllFriends = ({ xl, md }) => {
    const router = useRouter()
    const [AllFrndsData, setAllFrndsData] = useState([])
    const [UserDataLoader, setUserDataLoader] = useState(true)

    useEffect(() => {
        axios.get(`${APP_URL}/api/friendships`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('frnds', response);
                setAllFrndsData(response)
                setUserDataLoader(false)
            })
            .catch(error => {
                console.error(error);
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
                setUserDataLoader(false)
            });
    }, [])
    const unfriend = (e) => {
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
    const imgurl = ({ src }) => {
        return `${IMG_URL}${src}`
    }
    return (
        <>

            {UserDataLoader ? <Loader /> :
                <>
                    {AllFrndsData?.data?.message?.length ?
                        <>
                            {AllFrndsData?.data?.message?.map((item, i) => (
                                <div className={`col-${xl} col-${md} mt-3`} key={i}>
                                    <div className="card people-card">
                                        <div className="card-body">
                                            {item.friend.profile_photo === null ?
                                                <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile'></Image>
                                                :
                                                <Image loader={imgurl} src={item.friend.profile_photo} alt="" width={100} height={100} className='post-profile object-fit-cover'></Image>

                                            }
                                            <Link className='link-hov' href={'/people/slug/activity'}><p className="heading text-black mb-2 mt-4">{item?.friend?.name}</p></Link>
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

                                            <button className='btn secondary-btn' onClick={() => unfriend(item.friend_id)}><p className='mb-0 px-4'>Unfriend</p></button>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                        : <div className="alert-box">
                            <p>You don&apos;t have friends</p>
                        </div>}
                </>
            }
        </>
    )
}

export default AllFriends