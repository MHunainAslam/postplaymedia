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
import { message } from 'antd'
import MyFriends from '@/components/people/MyFriends'

const AllFriends = ({ xl, md }) => {
    const token = GetToken('userdetail')
    const [loading, setLoading] = useState(1)
    const [CurrentPagefrnd, setCurrentPagefrnd] = useState(1)
    const [TotalPagesfrnd, setTotalPagesfrnd] = useState()
    const [Datafrnd, setDatafrnd] = useState([])
    const [totalMemberfrnd, settotalMemberfrnd] = useState(1)
    const router = useRouter()
    const [AllFrndsData, setAllFrndsData] = useState([])
    const [UserDataLoader, setUserDataLoader] = useState(true)

    const fetchFrnds = async (page) => {
        try {
            const response = await fetch(
                `${APP_URL}/api/friendships?per_page=20&page=${page}`,
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
                console.log('fetchfrnds', data)
                setDatafrnd(data.message.data);
                console.log(data)
                setCurrentPagefrnd(data.message.current_page);
                setTotalPagesfrnd(data.message.last_page);
                settotalMemberfrnd(data.message.total);
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
    const fetchFrndss = async (page) => {
        try {
            const response = await fetch(
                `${APP_URL}/api/friendships?per_page=20&page=${page}`,
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

                setDatafrnd((prevMessages) => [...prevMessages, ...data?.message?.data]);
                setCurrentPagefrnd(data.message.current_page);
                setTotalPagesfrnd(data.message.last_page);
                console.log(data, data.message.current_page)
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
        if (CurrentPagefrnd === 1 && Datafrnd.length === 0) {
            fetchFrnds(CurrentPagefrnd);
        }
    }, [CurrentPagefrnd, token]);
    const handleLoadMorefrnd = () => {
        if (CurrentPagefrnd < TotalPagesfrnd && !loading) {
            setLoading(true);
            fetchFrndss(CurrentPagefrnd + 1);
        }
    };
    const handleScrollfrnd = () => {

        // Check if the user has scrolled to the bottom of the window
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 0) {
            handleLoadMorefrnd();

        }
    };
    useEffect(() => {
        // Add scroll event listener to the window when the component mounts
        window.addEventListener('scroll', handleScrollfrnd);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScrollfrnd);
        };
    }, [handleScrollfrnd]);


    useEffect(() => {
        // getallfrnds()
        fetchFrnds()
    }, [])
    const unfriend = (e) => {

        console.log(e)
        axios.delete(`${APP_URL}/api/friendships/unfriend/${e}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('unfriendsd', response);
                allfrnd()
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

            <MyFriends getallfrnds={fetchFrnds} AllFrndsData={Datafrnd} UserDataLoader={UserDataLoader} />
        </>
    )
}

export default AllFriends