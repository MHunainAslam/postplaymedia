'use client'
import Image from 'next/image'
import ActiveMembers from './ActiveMembers'
import MyFriends from './MyFriends'
import { GetToken } from '@/utils/Token'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { APP_URL } from '../../../config'
import { deleteCookie } from 'cookies-next'
import { useFrndContext } from '@/context/FriendContext'

const PeopleTab = () => {
    const token = GetToken('userdetail')
    const [UserData, setUserData] = useState([])
    const [UserDataLoader, setUserDataLoader] = useState(true)
    const [AllFrndsData, setAllFrndsData] = useState([])
    const [Data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalMember, settotalMember] = useState(1)
    const [totalPages, setTotalPages] = useState()
    const [loading, setLoading] = useState(1)
    const [CurrentPagefrnd, setCurrentPagefrnd] = useState(1)
    const [TotalPagesfrnd, setTotalPagesfrnd] = useState()
    // const [Datafrnd, setDatafrnd] = useState([])
    // const [totalMemberfrnd, settotalMemberfrnd] = useState(1)
    const router = useRouter()

    const fetchMembers = async (page) => {
        try {
            const response = await fetch(
                `${APP_URL}/api/users?per_page=20&page=${page}`,
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
                console.log('main', data)
                setData(data.data.data);
                console.log(data)
                setCurrentPage(data.data.current_page);
                setTotalPages(data.data.last_page);
                settotalMember(data.data.total);
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
    const fetchMemberss = async (page) => {
        try {
            const response = await fetch(
                `${APP_URL}/api/users?per_page=20&page=${page}`,
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

                setData((prevMessages) => [...prevMessages, ...data?.data?.data]);
                setCurrentPage(data.data.current_page);
                setTotalPages(data.data.last_page);
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
        if (currentPage === 1 && Data.length === 0) {
            fetchMembers(currentPage);
        }
    }, [currentPage, token]);
    const handleLoadMoreact = () => {
        if (currentPage < totalPages && !loading) {
            setLoading(true);
            fetchMemberss(currentPage + 1);
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


    // const fetchFrnds = async (page) => {
    //     try {
    //         const response = await fetch(
    //             `${APP_URL}/api/friendships?per_page=20&page=${page}`,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                     // Add other headers if needed
    //                 },
    //             }
    //         );
    //         const data = await response.json();
    //         if (data.success) {
    //            console.log('fetchfrnds', data)
    //             setDatafrnd(data.message.data);
    //             console.log(data)
    //             setCurrentPagefrnd(data.message.current_page);
    //             setTotalPagesfrnd(data.message.last_page);
    //             settotalMemberfrnd(data.message.total);
    //             setUserDataLoader(false)
    //         } else {
    //             console.error('Failed to fetch messages');
    //             setUserDataLoader(false)
    //         }
    //     } catch (error) {
    //         console.error('Error fetching messages', error);
    //         setUserDataLoader(false)
    //         if (error?.response?.status === 401) {
    //             router.push('/')
    //             deleteCookie('logged');
    //             localStorage.removeItem('userdetail')
    //         }
    //     } finally {
    //         setLoading(false);
    //         setUserDataLoader(false)
    //     }
    // };
    // const fetchFrndss = async (page) => {
    //     try {
    //         const response = await fetch(
    //             `${APP_URL}/api/friendships?per_page=20&page=${page}`,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             }
    //         );

    //         const data = await response.json();

    //         if (data.success) {

    //             setDatafrnd((prevMessages) => [...prevMessages, ...data?.message?.data]);
    //             setCurrentPagefrnd(data.message.current_page);
    //             setTotalPagesfrnd(data.message.last_page);
    //             console.log(data, data.message.current_page)
    //         } else {
    //             console.error('Failed to fetch messages');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching messages', error);
    //         if (error?.response?.status === 401) {
    //             router.push('/')
    //             deleteCookie('logged');
    //             localStorage.removeItem('userdetail')
    //         }
    //     } finally {
    //         setLoading(false);

    //     }
    // };
    // useEffect(() => {
    //     if (CurrentPagefrnd === 1 && Datafrnd.length === 0) {
    //         fetchFrnds(CurrentPagefrnd);
    //     }
    // }, [CurrentPagefrnd, token]);
    // const handleLoadMorefrnd = () => {
    //     if (CurrentPagefrnd < TotalPagesfrnd && !loading) {
    //         setLoading(true);
    //         fetchFrndss(CurrentPagefrnd + 1);
    //     }
    // };
    // const handleScrollfrnd = () => {
    //     if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 0) {
    //         handleLoadMorefrnd();

    //     }
    // };
    // useEffect(() => {
    //     window.addEventListener('scroll', handleScrollfrnd);

    //     return () => {
    //         window.removeEventListener('scroll', handleScrollfrnd);
    //     };
    // }, [handleScrollfrnd]);

    const { Datafrnd, FrndContainerRef, handleLoadMore, fetchFrnds, totalMemberfrnd } = useFrndContext()
    const handleScrollfrnd = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 0) {
            handleLoadMore();

        }
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScrollfrnd);

        return () => {
            window.removeEventListener('scroll', handleScrollfrnd);
        };
    }, [handleScrollfrnd]);
    useEffect(() => {
        fetchMembers()
        // fetchFrnds()
    }, [])
    return (
        <>
            <div className="activity-tabs mt-5">
                <ul className="nav nav-tabs border-0 " role="tablist">
                    <li className="nav-item nav-link active" onClick={fetchMembers} id="ActiveMembers-tab" data-bs-toggle="tab" data-bs-target="#ActiveMembers" type="button" role="tab" aria-controls="ActiveMembers" aria-selected="false" tabIndex="-1">
                        Active Members <span className='comment-active ms-1'>{totalMember}</span>
                    </li>
                    {/* <li className="nav-item nav-link " onClick={fetchFrnds} id="MyFriends-tab" data-bs-toggle="tab" data-bs-target="#MyFriends" type="button" role="tab" aria-controls="MyFriends" aria-selected="false" tabIndex="-1"> */}
                    <li className="nav-item nav-link " id="MyFriends-tab" data-bs-toggle="tab" data-bs-target="#MyFriends" type="button" role="tab" aria-controls="MyFriends" aria-selected="false" tabIndex="-1">
                        My Friends <span className='comment-active ms-1'>{totalMemberfrnd}</span>
                    </li>

                </ul>
                <div className="tab-content ">
                    <div className="tab-pane fade active show" id="ActiveMembers" role="tabpanel" aria-labelledby="ActiveMembers-tab">
                        <ActiveMembers fetchMembers={fetchMembers} UserData={Data} UserDataLoader={UserDataLoader} />
                    </div>
                    <div className="tab-pane fade " id="MyFriends" role="tabpanel" aria-labelledby="MyFriends-tab">
                        <MyFriends getallfrnds={fetchFrnds} AllFrndsData={Datafrnd} UserDataLoader={UserDataLoader} />
                    </div>

                </div>
            </div>
        </>
    )
}

export default PeopleTab