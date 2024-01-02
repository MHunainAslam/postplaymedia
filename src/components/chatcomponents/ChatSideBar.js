"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const ChatSideBar = () => {
    const [mute, setmute] = useState(false)

    return (
        <>
            {/* <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#chatSidebar" aria-controls="chatSidebar">
                Button with data-bs-target
            </button> */}

            <div className="offcanvas offcanvas-end chat-offcanvas " tabIndex="-1" id="chatSidebar" aria-labelledby="chatSidebarLabel">
                <div className="offcanvas-header chatbar-header justify-content-center">
                    <div className='d-flex align-items-center justify-content-center'>
                        <i className="bi bi-chat "></i>
                        <p className="heading text-black chat-detail ms-2">Messenger</p>
                    </div>
                    <div className='chat-detail'>
                        <li className="nav-item dropdown list-unstyled">
                            <a className="nav-link " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-three-dots"></i>
                            </a>
                            <ul className="dropdown-menu py-1">
                                <li onClick={(e) => { setmute(!mute) }}><a className="text-decoration-none clr-text ms-2 my-1 pointer-event" href="#" >{mute === false ? "unmute" : 'mute'}</a></li>
                            </ul>
                        </li>
                    </div>
                </div>
                <div className="offcanvas-body">
                    <ul className="nav nav-tabs border-0  chat-detail-flex" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="friends-tab" data-bs-toggle="tab" data-bs-target="#friends" type="button" role="tab" aria-controls="friends" aria-selected="false" tabIndex="-1">Friends</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="groups-tab" data-bs-toggle="tab" data-bs-target="#groups" type="button" role="tab" aria-controls="groups" aria-selected="false" tabIndex="-1">Groups</button>
                        </li>
                    </ul>
                    <div className="tab-content " id="myTabContent">
                        <div className="tab-pane fade active show" id="friends" role="tabpanel" aria-labelledby="friends-tab">
                            <div className="custome-inp chat-search chat-detail-flex my-3">
                                <span className="input-group-text bg-transparent">
                                    <i className="bi bi-search "></i>
                                </span>
                                <input type="text" className="form-control border" placeholder="Find Friends" aria-label="Friends" />
                            </div>
                            <Link href={'/messages?chat=1'} className="d-flex align-items-center text-decoration-none">
                                <div className="MsgIcon MsgIconActive ">
                                    <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100}></Image>
                                </div>
                                <p className="para text-black fw-bold mb-0 chat-detail">Scott</p>
                            </Link>

                            <Link href={'/messages?chat=2'} className="d-flex align-items-center text-decoration-none">
                                <div className="MsgIcon MsgIconActive ">
                                    <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100}></Image>
                                </div>
                                <p className="para text-black fw-bold mb-0 chat-detail">Scott</p>
                            </Link>
                        </div>

                        <div className="tab-pane fade" id="groups" role="tabpanel" aria-labelledby="groups-tab">
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

                        </div>
                    </div>

                    <button type="button" class="btn-close closechatmodal d-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-footer py-4 d-flex justify-content-center text-center">
                    <div className='chatarrow primary-btn' data-bs-toggle="offcanvas" data-bs-target="#chatSidebar" aria-controls="chatSidebar">
                        <p><i className="bi bi-chevron-left"></i></p>
                    </div>
                    <p className="heading text-black chat-detail ms-2">Collapse</p>
                </div>
            </div >


            <div className=' primary-btn d-md-none chatcanvasm  ' data-bs-toggle="offcanvas" data-bs-target="#chatSidebar" aria-controls="chatSidebar">
                <p><i className="bi bi-chevron-left"></i></p>
            </div>
        </>
    )
}

export default ChatSideBar