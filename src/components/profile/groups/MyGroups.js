'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { APP_URL, IMG_URL } from '../../../../config'
import { GetToken } from '@/utils/Token'
import { useRouter } from 'next/navigation'
import { deleteCookie } from 'cookies-next'
import axios from 'axios'
import Loader from '@/components/Loader'

const MyGroups = ({ xl, md, lg }) => {
    const token = GetToken('userdetail')
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
          

            <div className="border-bottom mt-2"></div>
            {UserDataLoader ? <Loader /> :
                <>
                    {AllFrndsData?.data?.message?.length ?
                        <>
                            {AllFrndsData?.data?.message?.map((item, i) => (
                                <div className={`col-${xl} col-${md} col-${lg} mt-3`} key={i}>
                                    <div className="card people-card">
                                        <div className="card-body">
                                            <div className="Grp-Bg">
                                                <Image src={'/assets/images/posts/covers.jpg'} alt="" width={500} height={500} className='Grp-Bg-img'></Image>

                                                <div className='h-0'>
                                                    <Image src={'/assets/images/avatar/group.png'} alt="" width={100} height={100} className='post-profile'></Image>
                                                </div>
                                            </div>
                                            <Link className='link-hov' href={'#'}><p className="heading text-black mb-2 mt-4">admin</p></Link>
                                           
                                            <div className="imgtoimg">
                                                <Link href={'#'}>
                                                    <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile-sm'></Image>
                                                </Link>
                                                <Link href={'#'}>
                                                    <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile-sm'></Image>
                                                </Link>

                                            </div>
                                            <p className="para text-black mt-3">Public Group / 2 members</p>
                                        </div>
                                        <div className="card-footer">
                                            <button className='btn secondary-btn '><p className='mb-0 px-4'>Join</p></button>
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

export default MyGroups
