import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { APP_URL } from '../../../config';
import { Authme, GetToken, imgurl } from '@/utils/Token';
import { useRouter, useSearchParams } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import StartChat from './StartChat';
import { useAppContext } from '@/context/AppContext';

const Message = ({ TabState }) => {
    const token = GetToken('userdetail')
    const searchParams = useSearchParams()
    const router = useRouter()
    const profile = JSON.parse(searchParams.get('profile'))
    console.log('first', profile)
    const [Messages, setMessages] = useState([])
    const { UserProfiledata, UserProfileloader } = useAppContext()
    const [Userprofile, setUserprofile] = useState(UserProfiledata)
    const [PerPage, setPerPage] = useState(50)
    const [onPage, setonPage] = useState(1)
    const [NewMessages, setNewMessages] = useState('')
    const [firstRun, setFirstRun] = useState(true);
    const [firstLoad, setfirstLoad] = useState(true);
    const [scroll, setscroll] = useState(false);
    const [toploading, settoploading] = useState(false);
    const [bottomloading, setbottomloading] = useState(false);
    const chatBodyRef = useRef(null)
  
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
                console.log('GetAllMsgs', TabState, response);
                setMessages(response)
                setfirstLoad(false)
                console.log('pages')
                setbottomloading(false)
                settoploading(false)
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
    const getallmsgb = (e) => {
        axios.get(`${APP_URL}/api/messages?room_id=${TabState}&per_page=${PerPage}&page=${e}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('GetAllMsgs   ddd', response.data.data.data.length, PerPage, TabState, response);
                setMessages(response)
                setfirstLoad(false)
                setbottomloading(false)
                settoploading(false)

                chatBodyRef.current.scrollTop = 80;
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
    const getallmsgt = (e) => {
        const chatBody = chatBodyRef.current;
        axios.get(`${APP_URL}/api/messages?room_id=${TabState}&per_page=${PerPage}&page=${e}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('GetAllMsgst', TabState, response);
                setMessages(response)
                setfirstLoad(false)
                setbottomloading(false)
                settoploading(false)
                // if (response.data.data.data.length < PerPage) {
                //     console.log('hai to')
                //     setPerPage(pre => pre + response.data.data.data.length)
                //     setonPage(pre => pre - 1)
                // }
                chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight - chatBodyRef.current.clientHeight - 50;
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
    }, [TabState, onPage, PerPage])
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
            settoploading(true)
            console.log(Messages?.data?.data?.total, Messages?.data?.data?.last_page, PerPage, onPage + 1, 'pppps')
            // setFirstRun(false)
            // setPerPage(prevPerPage => prevPerPage + 20)
            if (onPage != Messages?.data?.data?.last_page) {
                setonPage(prevonPage => prevonPage + 1)
                setscroll(false)
                getallmsgt(onPage + 1)
            } else {
                setonPage(prevonPage => prevonPage + 0)
                // chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight - chatBodyRef.current.clientHeight - 10;
                if (scroll) {
                    // setPerPage(21)

                }
            }
        }
        else if (
            chatBody &&
            chatBody.scrollTop === chatBody.scrollHeight - chatBody.clientHeight

        ) {
            // setbottomloading(true)

            console.log(Messages?.data?.data?.total, PerPage, onPage, 'lll')
            setFirstRun(false)
            // setPerPage(prevPerPage => prevPerPage + 20)
            if (onPage > 1) {
                getallmsgb(onPage - 1)
                setonPage(prevonPage => prevonPage - 1)
            }
            else {

                setonPage(1)
            }


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
        setPerPage(50)
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
                                {toploading &&
                                    <div className="d-flex pt-5 pb-3 align-items-center">
                                        <div className='border-bottom-dashed w-100'></div>
                                        <p className='text-center my-auto px-4'>Loading </p>
                                        <div className='border-bottom-dashed w-100'></div>
                                    </div>
                                }

                                {Messages?.data?.data?.data?.toReversed().map((item, i) => {
                                    const date = new Date(item.created_at);
                                    const formattedDate = date.toLocaleString();
                                    return <div className={`d-flex py-1 text-decoration-none ${profile.id != item.sender_id ? ' flex-row-reverse' : ''}`} key={i}>
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
                                {bottomloading &&
                                    <div className="d-flex pt-5 pb-3 align-items-center">
                                        <div className='border-bottom-dashed w-100'></div>
                                        <p className='text-center my-auto px-4'>Loading </p>
                                        <div className='border-bottom-dashed w-100'></div>
                                    </div>
                                }
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
