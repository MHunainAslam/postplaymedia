import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { APP_URL } from '../../../config';
import { Authme, GetToken, imgurl } from '@/utils/Token';
import { useRouter, useSearchParams } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import StartChat from './StartChat';
const ChatScreen = ({ TabState }) => {

    const searchParams = useSearchParams()
    const router = useRouter()
    const profile = JSON.parse(searchParams.get('profile'))
    console.log('first', profile)
    const [Userprofile, setUserprofile] = useState([])
    const [PerPage, setPerPage] = useState(50)
    const [onPage, setonPage] = useState(1)
    const [NewMessages, setNewMessages] = useState('')

    const [scroll, setscroll] = useState(false);
    const [toploading, settoploading] = useState(false);
    const [bottomloading, setbottomloading] = useState(false);
    const token = GetToken('userdetail');
    const [messages, setMessages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [firstLoad, setfirstLoad] = useState(false);
    const messagesContainerRef = useRef(null);
    const [firstRun, setFirstRun] = useState(true);

    const fetchMessages = async (page) => {
        try {
            const response = await fetch(
                `http://api.microndeveloper.com/api/messages?room_id=5&per_page=20&page=${page}`,
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

                setMessages((prevMessages) => [...prevMessages, ...data.data.data]);
              


                setCurrentPage(data.data.current_page);
                setTotalPages(data.data.last_page);
                console.log(data)
            } else {
                console.error('Failed to fetch messages');
            }
        } catch (error) {
            console.error('Error fetching messages', error);
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     if (firstRun) {
    //         const container = messagesContainerRef.current;
    //         container.scrollTop = container.scrollHeight;
    //     }
    // }, [messages]);

    const handleLoadMore = () => {
        if (currentPage < totalPages && !loading) {
            setLoading(true);
            fetchMessages(currentPage + 1);
        }
    };

    const handleScroll = () => {
        const container = messagesContainerRef.current;

        // Check if the user has scrolled to the bottom of the div
        // if (container && container.scrollTop <= 200) {
        if (container &&
            container.scrollHeight - container.scrollTop <= container.clientHeight + 200) {
            handleLoadMore();
            setFirstRun(false);
        }
    };

    useEffect(() => {
        const container = messagesContainerRef.current;

        // Add scroll event listener when the component mounts
        container.addEventListener('scroll', handleScroll);

        // Remove the event listener when the component unmounts
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    useEffect(() => {
        // Fetch initial messages when the component mounts
        if (currentPage === 1 && messages.length === 0) {
            fetchMessages(currentPage);
        }
    }, [currentPage, token]);
    const appendCustomDay = (e) => {
        e.preventDefault()
        if (NewMessages === '') {
        } else {
            const newMessage = { body: NewMessages, created_at: new Date().toLocaleString(), sender: { profile_photo: Userprofile ? { url: Userprofile?.url } : null } }; // 
    
            setMessages((prevMessages) => [newMessage, ...prevMessages]);

            axios.post(`${APP_URL}/api/messages`, { body: NewMessages, room_id: TabState }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
                .then(response => {
                    console.log('msg send', response);


                })
                .catch(error => {
                    console.error(error);
                    if (error?.response?.status === 401) {
                        router.push('/')
                        deleteCookie('logged');
                        localStorage.removeItem('userdetail')
                    }
                });
            setNewMessages('')
            console.log(newMessage)
        }
    };

    return (
        <>
            <h1>Chat Screen</h1>
            <div className='px-3 chat-header'>

                <Link href={`/people/${profile?.id}/activity`} className="d-flex align-items-center py-1 text-decoration-none">
                    <div className="MsgIcon MsgIconActive ">
                        {profile?.profile_photo === null ?
                            <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100}></Image> :
                            <Image loader={imgurl} src={profile?.profile_photo?.url} alt="" width={100} height={100}></Image>
                        }
                    </div>
                    <p className="para text-black fw-bold mb-0 text-capitalize">{profile?.name}</p>
                </Link>
            </div>
            <div className='flex-1 chat-body px-0 py-0' >
                <div className="h-100 overflow-auto" ref={messagesContainerRef}>

                    {TabState === 'startchating' ? <StartChat profile={profile} /> : <>
                        {firstLoad ?
                            <div className="d-flex h-100 align-items-center">
                                <div className='border-bottom-dashed w-100'></div>
                                <p className='text-center my-auto px-4'>Loading </p>
                                <div className='border-bottom-dashed w-100'></div>
                            </div>
                            : <>


                                {messages?.map((item, i) => {
                                    const date = new Date(item.created_at);
                                    const formattedDate = date.toLocaleString();
                                    const uniqueKey = `${item.sender_id}-${formattedDate}-${i}`;
                                    return <div className={`d-flex py-1 text-decoration-none ${profile.id != item.sender_id ? ' flex-row-reverse' : ''}`} key={uniqueKey}>
                                        <Link href={`${profile.id === item.sender_id ? `/people/${profile?.id}/activity` : '/profile/profile'} `} className="MsgIcon  ">
                                            {profile.id != item.sender_id ?
                                                <>

                                                    {item?.sender?.profile_photo == null ?
                                                        <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100}></Image> :
                                                        <Image loader={imgurl} src={item?.sender?.profile_photo?.url} alt="" width={100} height={100}></Image>
                                                    }

                                                </>
                                                : <>

                                                    {profile?.profile_photo == null ?
                                                        <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100}></Image> :
                                                        <Image loader={imgurl} src={profile?.profile_photo?.url} alt="" width={100} height={100}></Image>
                                                    }
                                                </>}
                                        </Link>
                                        <div className={` ${profile.id != item.sender_id ? 'message-box-user' : 'message-box'}`}>
                                            <p className="para mb-0 me-2">{item.body}</p>
                                            <p className="para-sm clr-light mb-0 send">{formattedDate} </p>
                                        </div>
                                    </div>
                                })}

                            </>}
                    </>}

                </div>

            </div>

            {loading && <p>Loading...</p>}
            <div className='p-3 chat-footer'>
                {TabState != 'startchating' ?
                    <form className="input-group mb-3 chat-box" onSubmit={appendCustomDay}>
                        <input type="text" className="form-control" id="" value={NewMessages} onChange={(e) => setNewMessages(e.target.value)} />
                        <button className="input-group-text " type='submit'><i className="bi bi-send"></i></button>
                    </form>
                    : ''}
            </div>
        </>
    );
};

export default ChatScreen;
