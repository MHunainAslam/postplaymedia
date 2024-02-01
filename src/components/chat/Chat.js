// pages/chat.js
import { Authme, GetToken, imgurl } from '@/utils/Token';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import StartChat from './StartChat';
import axios from 'axios';
import { APP_URL } from '../../../config';

const Chat = ({ TabState, param }) => {
    const token = GetToken('userdetail');
    const searchParams = useSearchParams()
    const profile = JSON.parse(searchParams.get('profile'))
    const [bottombtn, setbottombtn] = useState(false);
    const [messages, setMessages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [firstLoad, setfirstLoad] = useState(true);
    const [NewMessages, setNewMessages] = useState('')
    const [firstRun, setFirstRun] = useState(true);
    const chatContainerRef = useRef();
    const previousScrollHeightRef = useRef();
    const [Userprofile, setUserprofile] = useState([])
    const params = searchParams.get('chat')
    const router = useRouter()
 

    useEffect(() => {
        Authme(token)
            .then(data => {
                console.log('usermsg:', data?.data?.profile_photo);
                setUserprofile(data?.data?.profile_photo)
            })
            .catch(error => {
                console.error('Error from Authme:', error);
            });
    }, [])

    const fetchMessages = async (page) => {
        try {
            const response = await fetch(
                `${APP_URL}/api/messages?room_id=${param}&per_page=20&page=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        // Add other headers if needed
                    },
                }
            );
            const data = await response.json();
            const newMessages = data.data.data;
            console.log('messages', data)
            // Save the previous scroll height before adding new messages
            previousScrollHeightRef.current = chatContainerRef.current.scrollHeight;
            setfirstLoad(false)
            setMessages(newMessages.toReversed());
            setCurrentPage(data.data.current_page);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };
    const fetchMessagess = async (page) => {
        try {
            setLoading(true);
            const response = await fetch(
                `${APP_URL}/api/messages?room_id=${params}&per_page=20&page=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        // Add other headers if needed
                    },
                }
            );
            const data = await response.json();
            const newMessages = data.data.data;
            console.log('scroll', data)
            // Save the previous scroll height before adding new messages
            previousScrollHeightRef.current = chatContainerRef.current.scrollHeight;

            setMessages((prevMessages) => [...newMessages.toReversed(), ...prevMessages]);
            setCurrentPage(data.data.current_page);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };
    const every10 = async (page) => {
        try {
            const response = await fetch(
                `${APP_URL}/api/messages?room_id=${param}&per_page=20&page=${page}&is_read=false`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        // Add other headers if needed
                    },
                }
            );
            const data = await response.json();
            const newMessages = data.data.data;
            console.log('messages 10', newMessages)
            // console.log(params);

            // if (newMessages.id) {

            // }
            // console.log(newMessages.map((item) => (item.sender_id)) != profile?.id)


            const container = chatContainerRef.current;
            const isAtBottom = container.scrollTop + container.clientHeight + 50 >= container.scrollHeight;
            console.log(isAtBottom)


            // if (chatContainerRef.current.scrollTop + chatContainerRef.current.clientHeight == chatContainerRef.current.scrollHeight) {
            if (isAtBottom) {
                fetchMessages(1)
                console.log('working');
            } else if (newMessages.length > 0) {

                setbottombtn(true)


            }
            // if (newMessages.map((item) => (item.sender_id)) != profile?.id) {
            //     setMessages((prevMessages) => [...prevMessages, ...newMessages]);
            // }

            setfirstLoad(false)
            // setMessages((prevMessages) => [...newMessages.toReversed(), ...prevMessages]);
            // setCurrentPage(data.data.current_page);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchMessages(currentPage);
    }, []);

    useEffect(() => {
        const container = chatContainerRef.current;
        if (firstRun) {
            container.scrollTop = container.scrollHeight;
        } else if (container && container.scrollTop <= 0) {
            
    


            // Calculate the difference in scroll height after adding new messages
            const newScrollHeight = chatContainerRef.current.scrollHeight;
            const scrollHeightDifference = newScrollHeight - previousScrollHeightRef.current - 0;

            // Adjust the scroll position to maintain the previous scroll position
            chatContainerRef.current.scrollTop += scrollHeightDifference;
        }
    }, [messages]);

    const loadMore = () => {
        const nextPage = currentPage + 1;
        fetchMessagess(nextPage);

    };
    const handleScroll = () => {
        const container = chatContainerRef.current;

        // Check if the user has scrolled to the bottom of the div
        if (container && container.scrollTop <= 0) {
            console.log('chr');
            setFirstRun(false)
            // if (container &&
            //     container.scrollHeight - container.scrollTop <= container.clientHeight + 200) {
            loadMore();
            // setfir(false);
        }
    };

    useEffect(() => {
        const container = chatContainerRef.current;

        // Add scroll event listener when the component mounts
        container.addEventListener('scroll', handleScroll);
        console.log('yahi');

        // Remove the event listener when the component unmounts
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);
    useEffect(() => {
        setMessages([])
        fetchMessages(1)
        setFirstRun(true)
        setfirstLoad(true)
        setCurrentPage(1)
        console.log(TabState);
    }, [param])
    const appendCustomDay = (e) => {
        const container = chatContainerRef.current;

        container && container.scrollTop == 0
        e.preventDefault()
        if (NewMessages === '') {
        } else {
            const newMessage = { body: NewMessages, created_at: new Date(), sender: { profile_photo: Userprofile ? { url: Userprofile?.url } : null } }; // 
            console.log(newMessage)
            setMessages((prevMessages) => [...prevMessages, newMessage]);

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
    useEffect(() => {
        console.log(currentPage)
        const interval = setInterval(() => {
            every10(1)
            console.log('im' ,params)
        }, 10000);
        return () => clearInterval(interval);
    }, [params])
    const gotobottom = () => {
        setbottombtn(false)
        fetchMessages(1)
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
    return (
        <>
            <div className='px-3 chat-header'>

                <Link href={`/people/${profile?.id}/activity`} className="d-flex align-items-center py-1 text-decoration-none">
                    <div className="MsgIcon">
                        {profile?.profile_photo === null ?
                            <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100}></Image> :
                            <Image loader={imgurl} src={profile?.profile_photo?.url} alt="" width={100} height={100}></Image>
                        }
                    </div>
                    <p className="para text-black fw-bold mb-0 text-capitalize">{profile?.name}</p>
                </Link>
            </div>

            <div className='flex-1 chat-body px-0 py-0 position-relative' >
                <div className="h-100 overflow-auto" ref={chatContainerRef}>

                    {TabState === 'startchating' ? <StartChat profile={profile} /> : <>
                        {firstLoad ?
                            <div className="d-flex h-100 align-items-center">
                                <div className='border-bottom-dashed w-100'></div>
                                <p className='text-center my-auto px-4'>Loading </p>
                                <div className='border-bottom-dashed w-100'></div>
                            </div>
                            : <>

                                {loading && <p className='para text-center text-black my-3'>Calculating...</p>}
                                {messages?.map((item, i) => {
                                    const date = new Date(item.created_at);
                                    const formattedDate = date.toLocaleString();
                                    const uniqueKey = `${item.sender_id}-${formattedDate}-${i}`;
                                    return <div className={`d-flex py-1 text-decoration-none  ${profile?.id != item.sender_id ? ' flex-row-reverse' : ''}`} key={uniqueKey}>
                                        <Link href={`${profile?.id === item.sender_id ? `/people/${profile?.id}/activity` : '/profile/profile'} `} className="MsgIcon2  ">
                                            {profile?.id != item.sender_id ?
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
                                        <div className={` ${profile?.id != item.sender_id ? 'message-box-user ms-2' : 'message-box me-2'}`}>
                                            <p className="para mb-0 me-2">{item.body}</p>
                                            <p className="para-sm clr-light mb-0 send">{formattedDate} </p>
                                        </div>
                                    </div>
                                })}

                            </>}
                    </>}


                </div>

                <button className={`chat-arrow ${bottombtn ? '' : 'd-none'}`} onClick={gotobottom}><i className="bi bi-arrow-down-circle"></i></button>
            </div>

            <div className='p-3 chat-footer'>
                {TabState != 'startchating' ?
                    <form className="input-group mb-3 chat-box" onSubmit={appendCustomDay}>
                        <input type="text" className="form-control" id="" value={NewMessages} onChange={(e) => setNewMessages(e.target.value)} />
                        <button className="input-group-text " type='submit'><i className="bi bi-send"></i></button>
                    </form>
                    : ''}
            </div>
            {/* <button onClick={loadMore} disabled={loading}>
                Load More
            </button> */}
        </>
    );
};

export default Chat;
