'use client'
import Image from 'next/image'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import Link from 'next/link';
import { GetToken, imgurl, username } from '@/utils/Token';
import axios from 'axios';
import { APP_URL, IMG_URL } from '../../../config';
import Loader from '../Loader';
import { Skeleton, message } from 'antd';
import LogoutConfirmation from './LogoutConfirmation';
import { useAppContext } from '@/context/AppContext';
import GlobalSearch from './GlobalSearch';

const ActivityHeader = ({ }) => {
    // const [UserProfiledata, setUserProfiledata] = useState()
    // const [UserProfileloader, setUserProfileloader] = useState(true)
    const [NotiShow, setNotiShow] = useState(false)
    const [AllNotiShow, setAllNotiShow] = useState(false)


    const router = useRouter()
    const token = GetToken('userdetail')
    const ref = useRef(null);
    const FrndContainerRef = useRef(null);
    const { fetchNoti, Notifications, TotalPagesnoti, fetchNotis, handleLoadMorenoti, UserProfiledata, UserProfileloader, receivefrndreq, FrndReq, receivegrpreq, GrpReq, CurrentPageNoti, setLoading } = useAppContext()
    const logout = () => {
        deleteCookie('logged');
        localStorage.removeItem('userdetail')
        router.replace('/')
        console.log(deleteCookie())
        document.querySelector('.close-logout-modal').click()
        window.location.reload(true)
    }
    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) setNotiShow(false);
        if (ref.current && !ref.current.contains(event.target)) setAllNotiShow(false);
    };
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    useEffect(() => {
        const getCookie = (cookieName) => {
            const name = cookieName + "=";
            const decodedCookie = decodeURIComponent(document.cookie);
            const cookieArray = decodedCookie.split(';');

            for (let i = 0; i < cookieArray.length; i++) {
                let cookie = cookieArray[i];
                while (cookie.charAt(0) === ' ') {
                    cookie = cookie.substring(1);
                }
                if (cookie.indexOf(name) === 0) {
                    return cookie.substring(name.length, cookie.length);
                }
            }
            return ""; // If the cookie is not found
        };

        // Usage:
        const myCookieValue = getCookie('logged');



        if (!myCookieValue || myCookieValue != JSON.parse(localStorage.getItem('userdetail'))?.response?.data?.data?.token) {
            router.replace('/login')
            deleteCookie('logged');
            console.log(document.cookie.split('=')[0])
            console.log('eroor')
        }
    }, [])

    const accptgrpreq = (e, u_id, g_id) => {
        setAllNotiShow(true)
        console.log(e,u_id,g_id);
        axios.patch(`${APP_URL}/groups/${e}`, { user_id: '10', group_id: g_id }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('grp inv req', response);
            })
            .catch(error => {
                console.error(error);
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }
    const accptfrndreq = (e) => {
        setNotiShow(true)
        console.log(e, token, 'cjeck')
        axios.patch(`${APP_URL}/api/friend-requests/accept/${e}`, null, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('profile edit', response);
                receivefrndreq()
            })
            .catch(error => {
                console.error(error);
                message.error(error?.response?.data?.message)
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }
    const dltfrndreq = (e) => {
        setNotiShow(true)
        console.log(e, token, 'cjeck')
        axios.delete(`${APP_URL}/api/friend-requests/${e}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('profile edit', response);
                receivefrndreq()
            })
            .catch(error => {
                console.error(error);
                message.error(error?.response?.data?.message)
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }



    const handleScrollnoti = () => {
        const noticontainer = FrndContainerRef.current;
        // Check if the user has scrolled to the bottom of the div
        // if (container && container.scrollTop <= 200) {
        if (noticontainer && noticontainer.scrollHeight - noticontainer.scrollTop <= noticontainer.clientHeight + 1) {
            console.log('hn')
            handleLoadMorenoti();
        }
    };

    useEffect(() => {
        const noticontainer = FrndContainerRef.current;
        noticontainer.addEventListener('scroll', handleScrollnoti);
        return () => {
            noticontainer.removeEventListener('scroll', handleScrollnoti);
        };
    }, [handleScrollnoti]);



    useEffect(() => {
        // getallfrnds()

    }, [])

    return (
        <>

            {/* {UserProfileloader ? <div className="main-loader"> <Loader /></div> : */}

            <div className="activity-header">
                <div className="row justify-content-between px-md-3 px-0 w-100">
                    <div className="col-md-8 col-12 py-md-0 py-2 resposive-search-header">
                        <GlobalSearch />

                    </div>
                    <div className="col-md d-flex justify-content-md-end justify-content-between align-items-center py-md-0 py-3">
                        <div className="d-flex">
                            <li onClick={receivefrndreq} className={`nav-item dropdown list-unstyled header-btns ${FrndReq?.length === 0 ? '' : 'header-btns-active'}`}>
                                <Link className="nav-link " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-person-plus"></i>
                                </Link>
                                <ul className={`dropdown-menu py-1 border-0 ${NotiShow ? 'show show-c' : ''}`} ref={ref}>
                                    <li><Link className="text-decoration-none clr-text ms-2 my-1 pointer-event" href="#" >Friend Requests</Link></li>
                                    <hr />
                                    {FrndReq?.length === 0 ?
                                        <li>
                                            <div className="no-msg-req">
                                                No Friend Request
                                            </div>
                                        </li>
                                        :
                                        <>
                                            {FrndReq?.map((item, i) => (
                                                <li key={i}>
                                                    <div className="no-msg-req d-flex justify-content-between">
                                                        <div className="d-flex align-items-center">
                                                            {item?.sender?.profile_photo === null ?
                                                                <Link href={`/people/${item.sender?.id}/friends`}>
                                                                    <Image className='post-profile-sm' src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100}></Image>
                                                                </Link> :
                                                                <Link href={`/people/${item.sender?.id}/friends`}>
                                                                    <Image loader={imgurl} className='post-profile-sm-req object-fit-cover ' src={item?.sender?.profile_photo?.url} alt="" width={100} height={100}></Image>
                                                                </Link>
                                                            }
                                                            <p className='mb-0 para text-black ms-2 fw-normal'> <span className='fw-bold text-capitalize'>{item.sender.name}</span>  Send you a friend request</p>
                                                        </div>

                                                        <div className="d-flex">
                                                            <button className='btn secondary-btn-rounded p-1 rounded-5 mx-2' id={item.id} onClick={() => dltfrndreq(item.id)}>
                                                                <i className="bi bi-x-lg"></i>
                                                            </button>
                                                            <button id={item.id} onClick={() => accptfrndreq(item.id)} className='btn secondary-btn-rounded p-1 rounded-5 mx-2'>
                                                                <i className="bi bi-check2"></i>
                                                            </button>

                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </>
                                    }
                                    <hr />
                                    {/* <li><button className="btn secondary-btn w-100"  >All Request</button></li> */}
                                </ul>
                            </li>
                            <li onClick={fetchNoti} className={`nav-item dropdown list-unstyled header-btns ${Notifications?.length === 0 ? '' : 'header-btns-active'}`}>
                                <Link className="nav-link " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-bell"></i>
                                </Link>
                                <ul className={`dropdown-menu p-0 m-0 border-0 div-notifications ${AllNotiShow ? 'show show-c' : ''}`} ref={FrndContainerRef}>
                                    <li><Link className="text-decoration-none clr-text ms-2 my-1 pointer-event" href="#" >Notifications</Link></li>
                                    <hr />
                                    {Notifications?.length === 0 ?
                                        <li>
                                            <div className="no-msg-req">
                                                No Notifications!
                                            </div>
                                        </li>
                                        :
                                        <>
                                            {Notifications?.map((item, i) => (
                                                <li key={i}>
                                                    <div onClick={() =>
                                                        router.push(`${item.notification_type == 'commented' || item.notification_type == 'post-liked' || item.notification_type == 'post-mentioned' ?
                                                            `/activity/${item.trigger_id}`
                                                            :
                                                            `/groups/${item.trigger_id}`}`)}
                                                        className="pointer text-decoration-none no-msg-req d-flex justify-content-between">
                                                        <div className="d-flex align-items-center">
                                                            {item?.sender?.profile_photo === null ?
                                                                <Link href={`/people/${item.sender?.id}/friends`}>
                                                                    <Image className='post-profile-sm' src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100}></Image>
                                                                </Link> :
                                                                <Link href={`/people/${item.sender?.id}/friends`}>
                                                                    <Image loader={imgurl} className='post-profile-sm-req object-fit-cover ' src={item?.sender?.profile_photo?.url} alt="" width={100} height={100}></Image>
                                                                </Link>
                                                            }
                                                            <p className='mb-0 para text-black ms-2 fw-normal'>
                                                                <span className='text-capitalize'> {item.body} </span>
                                                                {/* <span className='fw-bold text-capitalize'> {item.group_id}</span> */}
                                                            </p>
                                                        </div>
                                                        {/* {item.notification_type == 'sent-request' &&
                                                            <div className="d-flex">
                                                                <button className='btn secondary-btn-rounded p-1 rounded-5 mx-2' id={item.id} onClick={() => accptgrpreq(item.id)}>
                                                                    <i className="bi bi-x-lg"></i>
                                                                </button>
                                                                <button id={item.id} onClick={() => accptgrpreq('acceptRequest', item.sender_id, item.trigger_id)} className='btn secondary-btn-rounded p-1 rounded-5 mx-2'>
                                                                    <i className="bi bi-check2"></i>
                                                                </button>
                                                            </div>
                                                        } */}
                                                    </div>
                                                </li>
                                            ))}
                                        </>
                                    }
                                    <hr />
                                    {/* <li><button className="btn secondary-btn w-100"  >All Request</button></li> */}
                                </ul>
                            </li>
                        </div>

                        <Link className="nav-link d-flex fw-bold text-capitalize" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <li className=" list-unstyled header-btns">
                                <div className="" >
                                    {UserProfileloader ?
                                        <Skeleton.Avatar active size={25} /> :
                                        <>
                                            {UserProfiledata?.data?.profile_photo === null ?
                                                <Image className='post-profile-sm' src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100}></Image>
                                                :
                                                <Image className='post-profile-sm object-fit-cover' loader={imgurl} src={UserProfiledata?.data?.profile_photo.url} alt="" width={100} height={100}></Image>
                                            }
                                        </>}
                                </div>

                            </li>
                            {/* </Link> */}

                            {UserProfileloader ? <div className='text-skeleton-2 skel-w-100 my-auto' style={{ width: '50px' }}> <Skeleton active paragraph={{ rows: 0 }} height={50} /> </div> :
                                <>
                                    {UserProfiledata?.data?.name}
                                </>
                            }

                        </Link>


                        <ul className="dropdown-menu " style={{ zIndex: 9999 }}>
                            <li ><Link href="/profile/activity" className="dropdown-item pointer mb-0" > <i className="bi bi-person-fill me-2"></i>Profile</Link></li>
                            <li data-bs-toggle="modal" data-bs-target="#logoutModal" ><p className="dropdown-item pointer mb-0" ><i className="bi bi-power me-2"></i> logout</p></li>

                        </ul>

                    </div>
                </div>
            </div >

            {/* } */}
            <LogoutConfirmation logout={logout} />
        </>
    )
}

export default ActivityHeader