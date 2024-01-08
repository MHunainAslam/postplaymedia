import React, { useEffect, useState } from 'react'
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
    const [Messages, setMessages] = useState([])
    const [Userprofile, setUserprofile] = useState([])
    const [NewMessages, setNewMessages] = useState('')
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
        axios.get(`${APP_URL}/api/messages?room_${TabState}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('GetAllMsgs', response.data?.data?.data.reverse());
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
    useEffect(() => {
        getallmsg()
        const interval = setInterval(() => {
            getallmsg()
        }, 10000);
        return () => clearInterval(interval);
    }, [TabState])



    const appendCustomDay = (e) => {
        e.preventDefault()
        if (NewMessages === '') {

        } else {
            const newMessage = { body: NewMessages, created_at: new Date().toLocaleString(), sender: { profile_photo: Userprofile ? { url: Userprofile?.url } : null } }; // Creating a new object to append


            setMessages(prevMessages => {
                return {
                    ...prevMessages,
                    data: {
                        ...prevMessages.data,
                        data: {
                            ...prevMessages.data.data,
                            data: [...prevMessages.data.data.data, newMessage],
                        },
                    },
                };
            });
            setNewMessages('')
            console.log(newMessage)
        }
    };
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

            <div className='px-3 flex-1 chat-body pt-2'>
                {Messages?.data?.data?.data?.reverse().map((item, i) => {
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

                <div id='chat-div'></div>

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