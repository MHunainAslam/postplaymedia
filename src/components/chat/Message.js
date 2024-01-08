import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Message = () => {
    return (
        <>
            <div className={"d-flex py-1 text-decoration-none flex-row-reverse"} >
                <Link href={'/profile/profile'} className="MsgIcon  ">


                    <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100}></Image>



                </Link>
                <div className={'message-box-user'} >
                    <p className="para mb-0 me-2">hhh</p>
                    <p className="para-sm clr-light mb-0 send"> send</p>
                </div>
            </div>
        </>
    )
}

export default Message