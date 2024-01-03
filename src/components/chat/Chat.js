import React from 'react'
import ActivityHeader from '../layout/ActivityHeader'
import Link from 'next/link'
import Image from 'next/image'

const Chat = ({ TabState }) => {
    return (
        <div className='chat-sec'>
            <ActivityHeader />
            <div className='px-3 chat-header'>

                <Link href={'/messages?chat=3'} className="d-flex align-items-center py-1 text-decoration-none">
                    <div className="MsgIcon MsgIconActive ">
                        <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100}></Image>
                    </div>
                    <p className="para text-black fw-bold mb-0">Chat {TabState}</p>
                </Link>
            </div>
            <div className='px-3 flex-1 chat-body pt-2'>
                <div className="d-flex py-1 text-decoration-none">
                    <Link href={'/messages?chat=3'} className="MsgIcon  ">
                        <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100}></Image>
                    </Link>
                    <div className="message-box">
                        <p className="para mb-0 me-2">Lorem ipsum dolor sit amet consectetur adipisicing elit.?</p>
                        <p className="para-sm clr-light mb-0 send">12:30 pm send</p>

                    </div>
                </div>
                <div className="d-flex justify-content-end py-1 text-decoration-none">
                    <Link href={'/messages?chat=3'} className="MsgIcon  ">
                        <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100}></Image>
                    </Link>
                    <div className="message-box-user">
                        <p className="para mb-0 me-2">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p className="text-light mb-0 send ">12:30 pm send</p>

                    </div>
                </div>
                <div className="d-flex justify-content-end py-1 text-decoration-none">
                    <Link href={'/messages?chat=3'} className="MsgIcon  ">
                        <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100}></Image>
                    </Link>
                    <div className="message-box-user">
                        <p className="para mb-0 me-2">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p className="text-light mb-0 send ">12:30 pm send</p>

                    </div>
                </div>
            </div>
            <div className='p-3 chat-footer'>
                <form class="input-group mb-3 chat-box" onSubmit={(e) => e.preventDefault()}>
                    <input type="text" className="form-control" id="" />
                    <button class="input-group-text " type='submit'><i class="bi bi-send"></i></button>
                </form>

            </div>
        </div>
    )
}

export default Chat