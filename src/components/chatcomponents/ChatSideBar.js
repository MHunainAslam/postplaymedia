"use client"
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { APP_URL } from '../../../config'
import { GetLocaldata, GetToken, imgurl } from '@/utils/Token'
import { useRouter } from 'next/navigation'
import { deleteCookie } from 'cookies-next'
import { message } from 'antd'

const ChatSideBar = () => {
    const userdata = GetLocaldata('userdetail')
    const token = GetToken('userdetail')
    const router = useRouter()
    const [mute, setmute] = useState(false)
    const [isDisable, setisDisable] = useState(false)
    const [recentchat, setrecentchat] = useState([])
    const [spamchat, setspamchat] = useState([])
    const [AllFrndsData, setAllFrndsData] = useState([])

    const recentchatfunc = () => {
        axios.get(`${APP_URL}/api/get-my-recent-chats?status=accepted`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('recent chat', response);
                setrecentchat(response)
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
        recentchatfunc()
    }, [])
    const statusValues = ['pending', 'declined'];
    const spamchatfunc = () => {
        axios.get(`${APP_URL}/api/room?status=pending`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('spam chat', response);
                setspamchat(response)
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
        spamchatfunc()
    }, [])
    const getallfrnds = () => {
        axios.get(`${APP_URL}/api/friendships`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('chatfrnds', response);
                setAllFrndsData(response)
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
        getallfrnds()
    }, [])

    const cancelspam = (e) => {
        setisDisable(true)
        axios.put(`${APP_URL}/api/room/${e}`, { status: 'rejected' }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log(response);
                setisDisable(false)
                spamchatfunc()
            })
            .catch(error => {
                console.error(error);
                setisDisable(false)
                message.error(error?.response.data?.message)
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }
    const accptspam = (e) => {
        setisDisable(true)
        axios.put(`${APP_URL}/api/room/${e}`, { status: 'accepted' }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log(response);
                setisDisable(false)
                spamchatfunc()
            })
            .catch(error => {
                console.error(error);
                setisDisable(false)
                message.error(error?.response.data?.message)
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }
    useEffect(() => {
        const interval = setInterval(() => {
            recentchatfunc()
        }, 10000);
        return () => clearInterval(interval);
    }, [])
    return (
        <>

            <div className="offcanvas offcanvas-end chat-offcanvas " tabIndex="-1" id="chatSidebar" aria-labelledby="chatSidebarLabel">
                <div className="offcanvas-header chatbar-header justify-content-center">
                    <div className='d-flex align-items-center justify-content-center'>
                        <i className="bi bi-chat "></i>
                        <p className="heading text-black chat-detail ms-2">Messenger</p>
                    </div>
                    {/* <div className='chat-detail'>
                        <li className="nav-item dropdown list-unstyled">
                            <a className="nav-link " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-three-dots"></i>
                            </a>
                            <ul className="dropdown-menu py-1">
                                <li onClick={(e) => { setmute(!mute) }}><a className="text-decoration-none clr-text ms-2 my-1 pointer-event" href="#" >{mute === false ? "unmute" : 'mute'}</a></li>
                            </ul>
                        </li>
                    </div> */}
                </div>
                <div className="offcanvas-body">
                    <ul className="nav nav-tabs border-0  chat-detail-flex" id="myTab" role="tablist">
                        <li className="nav-item " role="presentation" onClick={recentchatfunc}>
                            <button className="nav-link active" id="recentchat-tab" data-bs-toggle="tab" data-bs-target="#recentchat" type="button" role="tab" aria-controls="recentchat" aria-selected="false" tabIndex="-1">Chats</button>
                        </li>
                        <li className="nav-item" role="presentation" onClick={getallfrnds}>
                            <button className="nav-link " id="friends-tab" data-bs-toggle="tab" data-bs-target="#friends" type="button" role="tab" aria-controls="friends" aria-selected="false" tabIndex="-1">Friends</button>
                        </li>
                        <li className={`nav-item  ${spamchat?.data?.data?.length > 0 ? 'chatactive' : ''}`} role="presentation" onClick={spamchatfunc}>
                            <button className="nav-link " id="spam-tab" data-bs-toggle="tab" data-bs-target="#spam" type="button" role="tab" aria-controls="spam" aria-selected="false" tabIndex="-1">Spam</button>
                        </li>
                        {/* <li className="nav-item" role="presentation">
                            <button className="nav-link" id="groups-tab" data-bs-toggle="tab" data-bs-target="#groups" type="button" role="tab" aria-controls="groups" aria-selected="false" tabIndex="-1">Groups</button>
                        </li> */}

                    </ul>

                    <div className="tab-content " id="myTabContent">
                        <div className="tab-pane fade active show" id="recentchat" role="tabpanel" aria-labelledby="recentchat-tab">
                            <div className="custome-inp chat-search chat-detail-flex my-3">
                                <span className="input-group-text bg-transparent">
                                    <i className="bi bi-search "></i>
                                </span>
                                <input type="text" className="form-control border" placeholder="Find Chat" aria-label="Groups" />
                            </div>
                            {recentchat?.data?.data.length === 0 ?
                                <p className="para text-center text-dark fw-bold">No Chat Found</p> :
                                <>
                                    {recentchat?.data?.data?.map((item, i) => (
                                        //   <Link href={{pathname: `/businessclubpartners/${item.id}`, query: {state : JSON.stringify(item.image)}}}  
                                        <Link href={{ pathname: `/messages`, query: { profile: JSON.stringify(item.room_user), chat: (item.romid) } }} className="d-flex align-items-center text-decoration-none" key={i}>
                                            <div className={`MsgIcon  ${item.message_count > 0 ? 'MsgIconActive' : ''}`}>
                                                {item.room_user?.profile_photo === null ?
                                                    <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100}></Image>
                                                    :
                                                    <Image loader={imgurl} src={item.room_user?.profile_photo.url} alt="" width={100} height={100}></Image>
                                                }
                                            </div>
                                            <p className="para text-black fw-bold mb-0 chat-detail">{item.room_user?.name}</p>
                                        </Link>
                                    ))}
                                </>
                            }

                        </div>
                        <div className="tab-pane fade " id="friends" role="tabpanel" aria-labelledby="friends-tab">
                            <div className="custome-inp chat-search chat-detail-flex my-3">
                                <span className="input-group-text bg-transparent">
                                    <i className="bi bi-search "></i>
                                </span>
                                <input type="text" className="form-control border" placeholder="Find Friends" aria-label="Friends" />
                            </div>
                            {AllFrndsData?.data?.message.length === 0 ?
                                <p className="para text-center text-dark fw-bold">No Friend Found</p> :
                                <>
                                    {AllFrndsData?.data?.message?.map((item, i) => (
                                        <Link href={item.room_id === null ? { pathname: `/messages`, query: { chat: 'startchating', profile: JSON.stringify(userdata.user_id == item?.friend?.id ? item.user : item.friend) } } : { pathname: `/messages`, query: { profile: JSON.stringify(userdata.user_id == item?.friend?.id ? item.user : item.friend), chat: (item.room_id) } }} className="d-flex align-items-center text-decoration-none" key={i}>
                                            <div className={`MsgIcon  ${item.message_count > 0 ? 'MsgIconActive' : ''}`}>

                                                {userdata.user_id == item.friend?.id ?
                                                    <>
                                                        {
                                                            item.user?.profile_photo === null ?
                                                                <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100}></Image> :
                                                                <Image loader={imgurl} src={item.user?.profile_photo?.url} alt="" width={100} height={100}></Image>
                                                        }
                                                    </>
                                                    :
                                                    <>
                                                        {
                                                            item.friend?.profile_photo === null ?
                                                                <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100}></Image> :
                                                                <Image loader={imgurl} src={item.friend?.profile_photo?.url} alt="" width={100} height={100}></Image>
                                                        }
                                                    </>
                                                }
                                            </div>
                                            <p className="para text-black fw-bold mb-0 chat-detail">{userdata.user_id == item.friend?.id ? item.user?.name : item.friend?.name}</p>
                                        </Link>
                                    ))}
                                </>

                            }

                        </div>
                        <div className="tab-pane fade " id="spam" role="tabpanel" aria-labelledby="spam-tab">
                            <div className="custome-inp chat-search chat-detail-flex my-3">
                                <span className="input-group-text bg-transparent">
                                    <i className="bi bi-search "></i>
                                </span>
                                <input type="text" className="form-control border" placeholder="Find Spam" aria-label="Friends" />
                            </div>

                            {spamchat?.data?.data?.data?.length === 0 ?
                                <p className="para text-center text-dark fw-bold">No Spam Found</p> :
                                <>
                                    {spamchat?.data?.data?.data?.map((item, i) => (
                                        <div className="d-flex align-items-center text-decoration-none" key={i}>
                                            <div className={`MsgIcon  ${item.message_count > 0 ? 'MsgIconActive' : ''}`}>
                                                {item.room_user?.profile_photo === null ?
                                                    <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100}></Image>
                                                    :
                                                    <Image loader={imgurl} src={item.room_user?.profile_photo?.url} alt="" width={100} height={100}></Image>
                                                }
                                            </div>
                                            <div>
                                                <p className="para text-capitalize text-black fw-bold mb-0 chat-detail">{item.room_user?.name}</p>
                                                <p className="para-sm clr-text mb-0 chat-detail">{item.last_message}</p>
                                            </div>
                                            <div className='d-flex ms-auto'>
                                                <button className='btn secondary-btn-rounded p-1 rounded-5 mx-1 chat-detail' disabled={isDisable} onClick={() => cancelspam(item.id)}>
                                                    <i className="bi bi-x-lg"></i>
                                                </button>
                                                <button className='btn secondary-btn-rounded p-1 rounded-5 mx-1 chat-detail' disabled={isDisable} onClick={() => accptspam(item.id)}>
                                                    <i className="bi bi-check2"></i>
                                                </button>
                                            </div>
                                        </div>

                                    ))}
                                </>
                            }
                        </div>
                        {/* <div className="tab-pane fade" id="groups" role="tabpanel" aria-labelledby="groups-tab">
                            <div className="custome-inp chat-search chat-detail-flex my-3">
                                <span className="input-group-text bg-transparent">
                                    <i className="bi bi-search "></i>
                                </span>
                                <input type="text" className="form-control border" placeholder="Find Groups" aria-label="Groups" />
                            </div>
                            <Link href={'/messages?chat=3'} className="d-flex align-items-center  text-decoration-none">
                                <div className="MsgIcon MsgIconActive ">
                                    <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100}></Image>
                                </div>
                                <p className="para text-black fw-bold mb-0 chat-detail">Group</p>
                            </Link>

                        </div> */}

                    </div>

                    <button type="button" className="btn-close closechatmodal d-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-footer py-4 d-flex justify-content-center text-center">
                    <div className='chatarrow primary-btn' data-bs-toggle="offcanvas" data-bs-target="#chatSidebar" aria-controls="chatSidebar">
                        <p><i className="bi bi-chevron-left"></i></p>
                    </div>
                    <p className="heading text-black chat-detail ms-2">Collapse</p>
                </div>
            </div>


            <div className=' primary-btn d-lg-none chatcanvasm  pointer' data-bs-toggle="offcanvas" data-bs-target="#chatSidebar" aria-controls="chatSidebar">
                <p><i class="bi bi-chat-left"></i></p>
            </div>
        </>
    )
}

export default ChatSideBar