// 'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'

import React, { useState } from 'react'
import Reply from './slugtopictheme/Reply'
import Edit from './slugtopictheme/Edit'

const SlugTopicTheme = () => {
    const { Detailslug, slug } = useParams()
    const [activeComponent, setActiveComponent] = useState('Reply');

    const handleComponentChange = (componentName) => {
        setActiveComponent(componentName);
    };
    return (
        <>

            <div className="alert-box mt-4">
                <p>
                    This topic has 0 replies, 1 voice, and was last updated 3 years, 10 months ago by
                </p>
                <Link href={''} className="mini-user ms-2 link-hov">
                    <Image src={'/assets/images/Modal/Avatar.png'} width={100} height={100} alt=''></Image>
                    admin
                </Link>
            </div>
            <div className="border-bottom py-3 text-end">
                <Link href={"#"} className="para link-hov clr-primary mb-0 ">
                    | Subscribe
                </Link>
            </div>

            <div className="border-bottom py-3 d-flex flex-wrap align-items-center justify-content-between">
                <p className="para clr-light mb-0 mt-1">
                    January 24, 2020 at 9:23 pm
                </p>
                <div className="d-flex flex-wrap align-items-center">
                    <ul className='d-flex p-0 m-0 justify-content-end flex-wrap mt-1'>
                        <li className='list-unstyled border-right px-1' onClick={() => handleComponentChange('Edit')}><Link href={'#'} className='para-sm text-decoration-none clr-light' >Edit</Link></li>
                        <li className='list-unstyled border-right px-1'><Link href={'#'} className='para-sm text-decoration-none clr-light'>Trash</Link></li>
                        <li className='list-unstyled border-right px-1'><Link href={'#'} className='para-sm text-decoration-none clr-light'>Spam</Link></li>
                        <li className='list-unstyled border-right px-1'><Link href={'#'} className='para-sm text-decoration-none clr-light'>Unapprove</Link></li>
                        <li className='list-unstyled px-2' onClick={() => handleComponentChange('Reply')}><Link href={'#'} className='para-sm text-decoration-none clr-light'>Reply</Link></li>
                    </ul>

                    <p className="para fw-bold mb-0 mt-1 clr-primary ms-md-3">
                        #1243
                    </p>
                </div>

            </div>
            {activeComponent === 'Reply' && <Reply Detailslug={Detailslug} />}
            {activeComponent === 'Edit' && <Edit Detailslug={Detailslug} />}





        </>
    )
}



export default SlugTopicTheme