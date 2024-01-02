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
                    <p className="para text-black fw-bold mb-0">Group</p>
                </Link>
            </div>
            <div className='px-3 flex-1 chat-body'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste perferendis dolore minima sint id molestiae iusto quas fuga ea, numquam tempora ipsa nisi tempore dolor quos unde veniam sit aspernatur ex, voluptate cum dignissimos blanditiis. Itaque accusantium, voluptas numquam distinctio labore tenetur fugit aspernatur magni quidem aut repudiandae recusandae veritatis iure rem ea modi similique qui non dolorem nobis! Eligendi a corporis et sit quos quae. Culpa, voluptatibus dolores nam delectus veniam 
            </div>
            <div className='p-3 chat-footer'>
                <input type="text" className="inp form-control" id="" />
            </div>
        </div>
    )
}

export default Chat