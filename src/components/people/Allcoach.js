'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader'
import { APP_URL, IMG_URL } from '../../../config'
import axios from 'axios'
import { deleteCookie } from 'cookies-next'
import { GetToken } from '@/utils/Token'
import { useRouter } from 'next/navigation'
import { Switch, message } from 'antd'
import { useAppContext } from '@/context/AppContext'
const Allcoach = ({setcoachcount}) => {
    const { UserProfiledata } = useAppContext()
    const token = GetToken('userdetail')
    const [isBaneed, setisBaneed] = useState(true)
    const [UserDataLoader, setUserDataLoader] = useState(true)
    const [CoachData, setCoachData] = useState([])
    const [CoachCurrentPage, setCoachCurrentPage] = useState(1)
    const [CoachtotalMember, setCoachtotalMember] = useState(1)
    const [CoachTotalPages, setCoachTotalPages] = useState()
    const [loading, setLoading] = useState(1)
    const [coachSearch, setcoachSearch] = useState('')
    // const [Datafrnd, setCoachDatafrnd] = useState([])
    // const [CoachtotalMemberfrnd, setCoachtotalMemberfrnd] = useState(1)
    const router = useRouter()

    const fetchcoaches = async (page) => {
        try {
            const response = await fetch(
                `${APP_URL}/api/users?role_id=2&per_page=20&page=${page}&search=${coachSearch}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        // Add other headers if needed
                    },
                }
            );

            const data = await response.json();

            if (data.success) {
                // Prepend new messages to the beginning of the array
                console.log('asdhgzjy', data)
                setCoachData(data.data.data);
                console.log(data)
                setcoachcount(data?.data?.total)
                setCoachCurrentPage(data.data.current_page);
                setCoachTotalPages(data.data.last_page);
                setCoachtotalMember(data.data.total);
                setUserDataLoader(false)
            } else {
                console.error('Failed to fetch messages');
                setUserDataLoader(false)
            }
        } catch (error) {
            console.error('Error fetching messages', error);
            setUserDataLoader(false)
            if (error?.response?.status === 401) {
                router.push('/')
                deleteCookie('logged');
                localStorage.removeItem('userdetail')
            }
        } finally {
            setLoading(false);
            setUserDataLoader(false)
        }
    };
    const fetchcoachess = async (page) => {
        try {
            const response = await fetch(
                `${APP_URL}/api/users?role_id=2&per_page=20&page=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        // Add other headers if needed
                    },
                }
            );

            const data = await response.json();

            if (data.success) {
                // Prepend new messages to the beginning of the array

                setCoachData((prevMessages) => [...prevMessages, ...data?.data?.data]);
                setCoachCurrentPage(data.data.current_page);
                setCoachTotalPages(data.data.last_page);
                console.log(data, data.data.current_page)
            } else {
                console.error('Failed to fetch messages');
            }
        } catch (error) {
            console.error('Error fetching messages', error);
            if (error?.response?.status === 401) {
                router.push('/')
                deleteCookie('logged');
                localStorage.removeItem('userdetail')
            }
        } finally {
            setLoading(false);

        }
    };
    useEffect(() => {
        // Fetch initial messages when the component mounts

        if (UserProfiledata?.data?.role?.name == 'Admin') {

            if (CoachCurrentPage === 1 && CoachData.length === 0) {
                fetchcoaches(CoachCurrentPage);
            }
        }
    }, [CoachCurrentPage, token, UserProfiledata]);
    const handleLoadMoreact = () => {
        if (CoachCurrentPage < CoachTotalPages && !loading) {
            setLoading(true);
            fetchcoachess(CoachCurrentPage + 1);
        }
    };
    const handleScroll = () => {

        // Check if the user has scrolled to the bottom of the window
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 0) {
            handleLoadMoreact();

        }
    };
    useEffect(() => {
        // Add scroll event listener to the window when the component mounts
        window.addEventListener('scroll', handleScroll);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    useEffect(() => {
        if (UserProfiledata?.data?.role?.name == 'Admin') {
            fetchcoaches(1)
        }
    }, [coachSearch, UserProfiledata])



    const bannedmember = (e, type) => {

        console.log(e, token, 'cjeck')
        axios.post(`${APP_URL}/api/user-block-mutation`, { user_id: e, type: type }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('profile edit', response);
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
    const imgurl = ({ src }) => {
        return `${IMG_URL}${src}`
    }
    return (
        <>
            <div className="border-bottom row justify-content-between">
                <div className="col-lg-3 mb-3 col-md-6 ">
                    <div className=" search-inp mt-3">
                        <span className="input-group-text right-0" ><i className="bi bi-search"></i></span>
                        <input type="text" className="form-control " placeholder="Search Member" value={coachSearch} onChange={(e) => setcoachSearch(e.target.value)} />
                    </div>
                </div>

            </div>
            <div className="row position-relative w-100 mx-auto">

                {UserDataLoader ? <Loader /> :
                    <>
                        {CoachData?.length ?
                            <>
                                {CoachData?.map((item, i) =>
                                (
                                    <div className="col-xl-4 col-md-6 mt-3" key={i}>
                                        <div className="card people-card h-100">
                                            <li className='ms-auto me-3 list-unstyled'>
                                                <Switch checkedChildren="Unbanned" unCheckedChildren="Banned" onChange={() => bannedmember(item.id, `${item.is_blocked == '1' ? 'unblock' : 'block'}`)} defaultChecked={item.is_blocked == '1'} />
                                            </li>
                                            <div className="card-body">
                                                {item.profile_photo === null ?
                                                    <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile'></Image>
                                                    :
                                                    <Image loader={imgurl} src={item.profile_photo?.url} alt="" width={100} height={100} className='post-profile object-fit-cover'></Image>

                                                }
                                                {UserProfiledata?.data?.id === item.id ?
                                                    <Link className='link-hov' href={`/profile/activity`}><p className="heading text-black mb-2 mt-4">{item.name}</p></Link>
                                                    :
                                                    <Link className='link-hov' href={`/people/${item.id}/activity`}><p className="heading text-black mb-2 mt-4">{item.name}</p></Link>
                                                }
                                                {/* <p className="para clr-light">Active 2 minutes ago</p> */}
                                                <div className="d-flex fng justify-content-center">
                                                    <div className='mx-2'>
                                                        <p className="heading mb-0">{item.friends_count}</p>
                                                        <p className="para">Friends</p>
                                                    </div>
                                                    <div className='mx-2'>
                                                        <p className="heading mb-0">{item.group_count}</p>
                                                        <p className="para">Groups</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="card-footer justify-content-center">
                                                {UserProfiledata?.data?.id != item.id && (<>
                                                    {item.friendship_status === 'send-request' ?
                                                        <button className='btn secondary-btn' onClick={() => sendreq(item.id)}><p className='mb-0 px-4'> Add Friend</p></button>
                                                        : item.friendship_status === 'pending' ?
                                                            <button className='btn secondary-btn' onClick={() => dltfrndreq(item.frp_id)}><p className='mb-0 px-4'> Cancel</p></button>
                                                            : item.friendship_status === 'friends' ?
                                                                <button className='btn secondary-btn' onClick={() => unfriend(item.friend_id)}><p className='mb-0 px-4'> Unfriend</p></button>
                                                                : item.friendship_status === 'accept-request' ?
                                                                    <div className='d-md-flex w-100 mx-auto justify-content-center'>
                                                                        <button className='btn secondary-btn m-1' onClick={() => dltfrndreq(item.frp_id)}><p className='mb-0 px-4'> Cancel</p></button>
                                                                        <button className='btn secondary-btn m-1' id={item.id} onClick={() => accptfrndreq(item.frp_id)}><p className='mb-0 px-4' > Accept</p></button>
                                                                    </div>
                                                                    : ''
                                                    }
                                                </>)}
                                            </div> */}
                                        </div>
                                    </div>
                                ))}
                            </>
                            : <div className="alert-box mt-3">
                                <p>No Member Found!</p>
                            </div>}
                    </>
                }
            </div >
        </>
    )
}

export default Allcoach
