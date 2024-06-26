'use client'
import FancyBox from '@/components/FancyBox'
import ChatSideBar from '@/components/chatcomponents/ChatSideBar'
import ActivityHeader from '@/components/layout/ActivityHeader'
import ActivitySidebar from '@/components/layout/ActivitySidebar'
import Coverandtab from '@/components/userprofile/Coverandtab'
import ProfileTabPane from '@/components/profile/ProfileTabPane'
import Image from 'next/image'
import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { APP_URL } from '../../config'
import { GetToken } from '@/utils/Token'
import Loader from '@/components/Loader'
import { useRouter } from 'next/navigation'
import { deleteCookie } from 'cookies-next'
import { useAppContext } from '@/context/AppContext'
import Link from 'next/link'
export const UserContext = createContext();
const UserProfileLayout = ({ children, ProfilePages }) => {
    const token = GetToken('userdetail')
    const images = [{ url: '/assets/images/posts/covers.jpg', comment: '123' }, { url: '/assets/images/posts/cover.jpeg', comment: '321' }, { url: '/assets/images/Modal/Avatar.png', comment: '567' }]; // Replace with your image URLs
    const router = useRouter()
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const { UserProfiledata, UserProfileloader } = useAppContext()
    
    const [Userdata, setUserdata] = useState(UserProfiledata)
    const [UserdataLoader, setUserdataLoader] = useState(true)

    const openModal = (index) => {
        setSelectedImage(index);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setModalOpen(false);
    };



   


    return (
        <>
            {/* {UserdataLoader ? <Loader /> : <> */}
            {!ProfilePages ? <>{children}</> :
                <>
                    <div className="container-fluid px-0">
                        <div className="row w-100 mx-0">
                            <div className="sidebar-size people-sidebar-size px-0">
                                <ActivitySidebar />
                            </div>
                            <div className="col px-0">
                                <div className="">
                                    <ActivityHeader Userdata={UserProfiledata} />
                                    <div className="col">
                                        <Coverandtab Userdata={UserProfiledata} UserdataLoader={UserProfileloader} />
                                    </div>
                                    <div className="container py-md-3">
                                        <div className="border-bottom d-md-block d-none" ></div>
                                        <div className="border-bottom d-md-none mt-4" ></div>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-lg-2 col-md-3 d-md-block d-none border-right">
                                                    <div className="d-flex justify-content-center pt-4 border-bottom">
                                                        <Link href={'/profile/friends'} className='text-decoration-none mx-2'>
                                                            <p className="heading-m mb-0 clr-primary text-center">{UserProfiledata?.data?.friends_count}</p>
                                                            <p className="para clr-text text-center">Friends</p>
                                                        </Link>
                                                        <Link href={'/profile/groups'} className='text-decoration-none mx-2'>
                                                            <p className="heading-m mb-0 clr-primary text-center">{UserProfiledata?.data?.group_count} </p>
                                                            <p className="para clr-text text-center">Groups</p>
                                                        </Link>
                                                    </div>
                                                    {/* <div>
                                                        <p className="heading-m text-dark mt-4 text-center">
                                                            My Photos
                                                        </p>
                                                        <div className="row">
                                                            {images.map((image, index) => (
                                                                <div className="px-1 col-xl-4 col-md-6 col-4 mt-1" key={index}>
                                                                    <div className="card gallery-card">
                                                                        <div className="card-body p-0">
                                                                            <div className='gallery-img rounded-2' style={{ height: '60px' }}>
                                                                                <Image
                                                                                    className='pointer h-100 rounded-2'
                                                                                    key={index}
                                                                                    src={image.url}
                                                                                    alt={`Image ${index + 1}`}
                                                                                    onClick={() => openModal(index)}
                                                                                    data-bs-toggle="modal" data-bs-target={`#selectedImage`}
                                                                                    width={500} height={500}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div> */}
                                                </div>
                                                <div className="col-md-9 col-lg-10 ">
                                                    <UserContext.Provider value={{ Userdata, setUserdata }}>
                                                        {children}
                                                    </UserContext.Provider>
                                                    {/* {childrenWithProps} */}
                                                    {/* {React.cloneElement(children, { Userdata })} */}
                                                </div>
                                            </div>
                                        </div>
                                        <FancyBox images={images} modalOpen={modalOpen} closeModal={closeModal} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
                                    </div>
                                </div>
                            </div>
                            <div className="chatbar-size px-0">
                                <ChatSideBar />
                            </div>
                        </div>
                    </div>
                </>}
            {/* </>} */}
        </>
    )
}

export default UserProfileLayout


