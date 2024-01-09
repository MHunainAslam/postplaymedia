import React, { useEffect, useRef, useState } from 'react'
import ActivityHeader from '../layout/ActivityHeader'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { Authme, GetToken, imgurl } from '@/utils/Token'
import axios from 'axios'
import { APP_URL } from '../../../config'
import { deleteCookie } from 'cookies-next'
import Message from './Message'

const Chat = ({ TabState }) => {
    const token = GetToken('userdetail')
    const searchParams = useSearchParams()
    const router = useRouter()
    const profile = JSON.parse(searchParams.get('profile'))
    // const [Messages, setMessages] = useState([])
    const [Userprofile, setUserprofile] = useState([])
    const [NewMessages, setNewMessages] = useState('')
    const [pp, setpp] = useState(20)
    const chatBodyRefa = useRef(null);
    const [pageTop, setPageTop] = useState(1);
    const [pageBottom, setPageBottom] = useState(1);


    const [Messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const messagesPerPage = 20;
    const chatBodyRef = useRef(null);
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
    const getallmsg = () => {
        axios.get(`${APP_URL}/api/messages?room_${TabState}&per_page=${pp}&page=${pageBottom}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('GetAllMsgs', response);
                setMessages(response)
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

    // useEffect(() => {
    //     getallmsg()
    //     const interval = setInterval(() => {
    //         getallmsg()
    //     }, 10000);
    //     return () => clearInterval(interval);
    // }, [TabState, pp, pageBottom])
    const appendCustomDay = (e) => {
        e.preventDefault()
        if (NewMessages === '') {
        } else {
            const newMessage = { body: NewMessages, created_at: new Date().toLocaleString(), sender: { profile_photo: Userprofile ? { url: Userprofile?.url } : null } }; // Creating a new object to append
            const newArray = [...Messages, newMessage];
            setMessages(newArray)
            // setMessages(prevMessages => {
            //     return {
            //         ...prevMessages,
            //         data: {
            //             ...prevMessages.data,
            //             data: {
            //                 ...prevMessages.data.data,
            //                 data: [...prevMessages.data.data.data, newMessage],
            //             },
            //         },
            //     };
            // });
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
    const fetchInitialMessages = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${APP_URL}/api/messages?room_5&page=${page}&per_page=${messagesPerPage}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', // adjust Content-Type if needed
                }
            });
            console.log(response, 'allmsg')
            setMessages(response.data.data.data.reverse());
            setPage(page + 1);
        } catch (error) {
            console.error('Error fetching initial messages:', error);
        } finally {
            setLoading(false);
        }
    };



    const fetchMoreMessages = async () => {
        if (!loading) {
            setLoading(true);
            try {
                const response = await axios.get(`${APP_URL}/api/messages?room_5&page=${page}&per_page=${messagesPerPage}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json', // adjust Content-Type if needed
                    }
                });
                console.log(response, 'allmsg')
                setMessages(prevMessages => [...prevMessages, ...response.data.data.data.reverse()]);
                setPage(page + 1);
            } catch (error) {
                console.error('Error fetching more messages:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleScroll = () => {
        const chatBody = chatBodyRef.current;
        if (
            chatBody &&
            // chatBody.scrollTop + chatBody.clientHeight >= chatBody.scrollHeight
            chatBody.scrollTop === chatBody.scrollHeight - chatBody.clientHeight
        ) {

            fetchMoreMessages();
        }
    };

    useEffect(() => {
        const chatBody = chatBodyRef.current;
        chatBody.addEventListener('scroll', handleScroll);
        return () => {
            chatBody.removeEventListener('scroll', handleScroll);
        };
    }, [loading, page, messagesPerPage]);

    useEffect(() => {
        fetchInitialMessages()
        const interval = setInterval(() => {
            fetchInitialMessages()
        }, 10000);
        return () => clearInterval(interval);
    }, [TabState, pp, pageBottom])

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
    )
}

export default Chat