'use client'
import FancyBox from '@/components/FancyBox'
import ChatSideBar from '@/components/chatcomponents/ChatSideBar'
import ActivityHeader from '@/components/layout/ActivityHeader'
import ActivitySidebar from '@/components/layout/ActivitySidebar'
import Coverandtab from '@/components/profile/Coverandtab'
import ProfileTabPane from '@/components/profile/ProfileTabPane'
import Image from 'next/image'
import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { APP_URL } from '../../config'
import { GetToken } from '@/utils/Token'
import Loader from '@/components/Loader'
import { useParams, useRouter } from 'next/navigation'
import { deleteCookie } from 'cookies-next'
export const UserContext = createContext();
const ProfileLayout = ({ children, ProfilePages }) => {
    const token = GetToken('userdetail')
    const images = [{ url: '/assets/images/posts/covers.jpg', comment: '123' }, { url: '/assets/images/posts/cover.jpeg', comment: '321' }, { url: '/assets/images/Modal/Avatar.png', comment: '567' }]; // Replace with your image URLs
    const router = useRouter()
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [Userdata, setUserdata] = useState('')
    const [UserdataLoader, setUserdataLoader] = useState(true)
    const { userprofile } = useParams()
   

    const closeModal = () => {
        setSelectedImage(null);
        setModalOpen(false);
    };


    useEffect(() => {
        axios.get(`${APP_URL}/api/user/${userprofile}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                setUserdata(response?.data)
                setUserdataLoader(false)
            })
            .catch(error => {
                setUserdataLoader(false)
                console.error(error);
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }, [])
    const childrenWithProps = React.Children.map(children, (child, i) => {
        return React.cloneElement(child, { foo: Userdata })
    })
  
    

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
                                    <ActivityHeader />
                                    <div className="col">
                                        <Coverandtab Userdata={Userdata} UserdataLoader={UserdataLoader} />
                                    </div>
                                    <div className="container py-md-3">
                                        <div className="border-bottom d-md-block d-none" ></div>
                                        <div className="border-bottom d-md-none mt-4" ></div>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-lg-2 col-md-3 d-md-block d-none border-right">
                                                    <div className="d-flex justify-content-center pt-4 border-bottom">
                                                        <div className='mx-2'>
                                                            <p className="heading-m mb-0 clr-primary text-center">{Userdata?.data?.friends_count}</p>
                                                            <p className="para clr-text text-center">Friends </p>
                                                        </div>
                                                        <div className='mx-2'>
                                                            <p className="heading-m mb-0 clr-primary text-center">{Userdata?.data?.group_count}</p>
                                                            <p className="para clr-text text-center">Groups</p>
                                                        </div>
                                                    </div>
                                                   
                                                </div>
                                                <div className="col-md-9 col-lg-10 ">
                                                    <UserContext.Provider value={{ Userdata, setUserdata }}>
                                                        {children}
                                                    </UserContext.Provider>
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

export default ProfileLayout

