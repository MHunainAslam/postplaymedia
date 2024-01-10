import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { APP_URL } from '../../../config';
import { Authme, GetToken, imgurl } from '@/utils/Token';
import { useRouter, useSearchParams } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import StartChat from './StartChat';

const Message = ({ TabState }) => {
    const token = GetToken('userdetail')
    const searchParams = useSearchParams()
    const router = useRouter()
    const profile = JSON.parse(searchParams.get('profile'))
    const [Messages, setMessages] = useState([])
    const [Userprofile, setUserprofile] = useState([])
    const [PerPage, setPerPage] = useState(20)
    const [onPage, setonPage] = useState(1)
    const [NewMessages, setNewMessages] = useState('')
    const [firstRun, setFirstRun] = useState(true);
    const [firstLoad, setfirstLoad] = useState(true);
    const chatBodyRef = useRef(null)
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
    useEffect(() => {
        if (firstRun) {
            console.log('han yahi')
            const chatBody = chatBodyRef.current;
            chatBody.scrollTop = chatBody.scrollHeight;
        }

    }, [Messages])
    const getallmsg = () => {
        axios.get(`${APP_URL}/api/messages?room_id=${TabState}&per_page=${PerPage}&page=${onPage}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('GetAllMsgs', response);
                setMessages(response)
                setfirstLoad(false)

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



    useEffect(() => {
        getallmsg()
        setTimeout(() => {

            setFirstRun(false)
        }, 4000);
        const interval = setInterval(() => {
            getallmsg()
        }, 10000);
        return () => clearInterval(interval);
    }, [TabState, onPage])
    const appendCustomDay = (e) => {
        e.preventDefault()
        if (NewMessages === '') {
        } else {
            const newMessage = { body: NewMessages, created_at: new Date().toLocaleString(), sender: { profile_photo: Userprofile ? { url: Userprofile?.url } : null } }; // 
            setMessages(prevMessages => {
                return {
                    ...prevMessages,
                    data: {
                        ...prevMessages.data,
                        data: {
                            ...prevMessages.data.data,
                            data: [newMessage, ...prevMessages.data.data.data],
                        },
                    },
                };
            });

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

    const handleScroll = () => {
        const chatBody = chatBodyRef.current;
        if (
            chatBody &&
            chatBody.scrollTop === 0

        ) {
            console.log(Messages?.data?.data?.total, Messages?.data?.data?.last_page, PerPage, onPage)
            // setFirstRun(false)
            // setPerPage(prevPerPage => prevPerPage + 20)
            if (onPage == Messages?.data?.data?.last_page) {
                setonPage(prevonPage => prevonPage + 0)
            } else {
                setonPage(prevonPage => prevonPage + 1)
                chatBody.scrollTop = chatBody.scrollHeight - chatBody.clientHeight - 10;
            }
        }
        else if (
            chatBody &&
            chatBody.scrollTop === chatBody.scrollHeight - chatBody.clientHeight

        ) {
            console.log(Messages?.data?.data?.total, PerPage, onPage)
            setFirstRun(false)
            // setPerPage(prevPerPage => prevPerPage + 20)
            setonPage(prevonPage => prevonPage > 1 ? - 1 : 1)
        }

    };

    useEffect(() => {
        const chatBody = chatBodyRef.current;
        chatBody.addEventListener('scroll', handleScroll);

        return () => {
            // Clean up the event listener when the component unmounts
            chatBody.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll, onPage]);
    useEffect(() => {
        setfirstLoad(true)
        setPerPage(20)
        setFirstRun(true)
        setonPage(1)
    }, [TabState])

    return (
        <>
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
                <div className="h-100 overflow-auto" ref={chatBodyRef}>

                    {TabState === 'startchating' ? <StartChat profile={profile} /> : <>
                        {firstLoad ?
                            <div className="d-flex h-100 align-items-center">
                                <div className='border-bottom-dashed w-100'></div>
                                <p className='text-center my-auto px-4'>Loading </p>
                                <div className='border-bottom-dashed w-100'></div>
                            </div>
                            : <>
                                {Messages?.data?.data?.data?.toReversed().map((item, i) => {
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

export default Message;
