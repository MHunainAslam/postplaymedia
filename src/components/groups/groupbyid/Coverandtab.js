'use client'
// import Image from 'next/image'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Image, Skeleton } from 'antd'
import UserProfileTabs from '@/components/userprofile/UserProfileTabs'
import { IMG_URL } from '../../../../config'
import GroupProfileTab from './GroupProfileTab'
import { imgurl } from '@/utils/Token'

const Coverandtab = ({ grpdata, isLoading ,Btn_Trigger, getgrpdata}) => {

    const router = useRouter()

    const movetoedit = () => {
        router.push('/profile/profile?profile-tab=editprofile')
    }
    const movetochangecover = () => {
        router.push('/profile/profile?profile-tab=changecover')
    }
    const movetochangedp = () => {
        router.push('/profile/profile?profile-tab=changeprofile')
    }
    const [showMore, setShowMore] = useState(false);
    const [text, settext] = useState()
    const [truncatedText, settruncatedText] = useState()
    const [maxLength, setmaxLength] = useState(350)
    useEffect(() => {
        settext(grpdata?.data?.group?.group_description)
        settruncatedText(showMore ? text : text?.slice(0, maxLength));
        console.log('text', text)
    }, [grpdata, showMore])


    return (
        <>
            <div className="position-relative">
                <div className="profile-page-cover">
                    {isLoading ?
                        <Skeleton.Image active />
                        : <>
                            {grpdata?.data?.group?.cover_photo === null ?
                                <Skeleton.Image /> :
                                <Image src={IMG_URL + grpdata?.data?.group?.cover_photo.url} alt=''></Image>
                            }
                        </>}
                </div>
                <div className="container position-relative">
                    <div className="profile-page-user" style={{ marginTop: '-70px' }}>
                        <div className="card mb-3">
                            <div className=" g-0 justify-content-center">
                                <div className="img-p grp-img mx-auto" style={isLoading ? { height: '200px' } : {}}>

                                    {isLoading ?
                                        <Skeleton.Image active style={{ height: '200px' }} className='' /> :
                                        <>
                                            {grpdata?.data?.group?.profile_photo === null ?
                                                <Image src="/assets/images/avatar/user.jpg"  alt='' className="img-fluid rounded-start user-img" /> :
                                                <Image src={IMG_URL + grpdata?.data?.group?.profile_photo.url}  alt='' className="img-fluid rounded-start user-img" />
                                            }
                                        </>}

                                </div>
                                {isLoading ? <div className='text-skeleton-2 skel-w-100 my-auto w-50 mx-auto mt-3' > <Skeleton active paragraph={{ rows: 0 }} height={50} /> </div> :
                                    <p className="heading text-center mt-2 clr-dark text-capitalize">{grpdata?.data?.group?.group_name}</p>
                                }
                                <p className={`para fw-bold text-center mt-2 clr-dark text-capitalize`}>{grpdata?.data?.group?.privacy} Group</p>
                                <p className={`para text-center mt-2 clr-dark text-capitalize`}>
                                    {truncatedText}


                                    {text?.length > maxLength && (
                                        <span onClick={() => setShowMore(!showMore)} style={{ cursor: 'pointer', color: 'blue' }}>
                                            {showMore ? ' Show less' : '...Show more'}
                                        </span>
                                    )}
                                </p>

                            </div>
                            <div className="mx-auto mt-auto">

                                <div className=" profile-tabs d-md-flex d-none  my-3">
                                    <GroupProfileTab grpdata={grpdata} Btn_Trigger={Btn_Trigger} getgrpdata={getgrpdata}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className="container d-md-none">
                <div className="profile-tabs  " >
                    <GroupProfileTab grpdata={grpdata} Btn_Trigger={Btn_Trigger} getgrpdata={getgrpdata}/>
                </div>
            </div>

        </>
    )
}

export default Coverandtab