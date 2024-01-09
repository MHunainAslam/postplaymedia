import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

const Chat = ({ TabState }) => {
    // Existing state variables
    // ...

    // ...

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const messagesPerPage = 20;
    const chatBodyRef = useRef(null);

    // useEffect(() => {
    //     fetchInitialMessages();

    //     // Clean-up interval
    //     const interval = setInterval(() => {
    //         fetchInitialMessages();
    //     }, 10000);

    //     return () => clearInterval(interval);
    // }, [TabState, pp, pageBottom]);

    // Function to fetch initial messages
    const fetchInitialMessages = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${APP_URL}/api/messages?room_5&page=${page}&per_page=${messagesPerPage}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            setMessages(response.data.data.data);
            setPage(page + 1);
        } catch (error) {
            console.error('Error fetching initial messages:', error);
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch more messages
    const fetchMoreMessages = async () => {
        if (!loading) {
            setLoading(true);
            try {
                const response = await axios.get(`${APP_URL}/api/messages?room_id=5&page=${page}&per_page=${messagesPerPage}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });

                setMessages(prevMessages => [...prevMessages, ...response.data.data.data]);
                setPage(page + 1);
            } catch (error) {
                console.error('Error fetching more messages:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    // Handle scroll event
    const handleScroll = () => {
        // const chatBody = chatBodyRef.current;
        // if (
        //     chatBody &&
        //     chatBody.scrollTop === chatBody.scrollHeight - chatBody.clientHeight
        // ) {
        //     fetchMoreMessages();
        // }
            fetchMoreMessages();
    };

    useEffect(() => {
        const chatBody = chatBodyRef.current;
        chatBody.scrollTop === chatBody.scrollHeight - chatBody.clientHeight
        chatBody.addEventListener('scroll', handleScroll);
        // return () => {
        //     chatBody.removeEventListener('scroll', handleScroll);
        // };
    }, [loading, page, messagesPerPage]);

    // Existing render logic
    // ...

    return (
        <>
            <div className='px-3 chat-header'>

                <Link href={`/people/${profile?.id}/activity`} className="d-flex align-items-center py-1 text-decoration-none">
                    <div className="MsgIcon MsgIconActive ">
                        {profile?.profile_photo === null ?
                            <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100}></Image> :
                            <Image loader={imgurl} src={profile?.profile_photo.url} alt="" width={100} height={100}></Image>
                        }
                    </div>
                    <p className="para text-black fw-bold mb-0 text-capitalize">{profile?.name}</p>
                </Link>
            </div>


            <div className='px-3 flex-1 chat-body pt-2' ref={chatBodyRef}>
                {Messages?.map((item, i) => {
                    const date = new Date(item.created_at);
                    const formattedDate = date.toLocaleString();
                    return <div className={`d-flex py-1 text-decoration-none ${profile.id != item.sender_id ? ' flex-row-reverse' : ''}`} key={i}>
                        <Link href={`${profile.id == item.sender_id ? '/profile/profile' : `/people/${profile?.id}/activity`} `} className="MsgIcon  ">
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
                                        <Image loader={imgurl} src={profile?.profile_photo.url} alt="" width={100} height={100}></Image>
                                    }
                                </>}
                        </Link>
                        <div className={` ${profile.id != item.sender_id ? 'message-box-user' : 'message-box'}`}>
                            <p className="para mb-0 me-2">{item.body}</p>
                            <p className="para-sm clr-light mb-0 send">{formattedDate} send</p>
                        </div>
                    </div>
                })}



            </div>
            <div className='p-3 chat-footer'>
                <form className="input-group mb-3 chat-box" onSubmit={appendCustomDay}>
                    <input type="text" className="form-control" id="" value={NewMessages} onChange={(e) => setNewMessages(e.target.value)} />
                    <button className="input-group-text " type='submit'><i className="bi bi-send"></i></button>
                </form>

            </div>
        </>
    );
};

export default Chat;
