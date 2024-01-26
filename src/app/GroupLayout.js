'use client'
import FancyBox from '@/components/FancyBox'
import ChatSideBar from '@/components/chatcomponents/ChatSideBar'
import ActivityHeader from '@/components/layout/ActivityHeader'
import ActivitySidebar from '@/components/layout/ActivitySidebar'
import ProfileTabPane from '@/components/profile/ProfileTabPane'
import Image from 'next/image'
import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { APP_URL } from '../../config'
import { GetToken } from '@/utils/Token'
import Loader from '@/components/Loader'
import { useParams, useRouter } from 'next/navigation'
import { deleteCookie } from 'cookies-next'
import { useAppContext } from '@/context/AppContext'
import Coverandtab from '@/components/groups/groupbyid/Coverandtab'
export const grpContext = createContext();
const GroupLayout = ({ children, GroupPage }) => {
    const token = GetToken('userdetail')
    const { groupbyid } = useParams()
    const images = [{ url: '/assets/images/posts/covers.jpg', comment: '123' }, { url: '/assets/images/posts/cover.jpeg', comment: '321' }, { url: '/assets/images/Modal/Avatar.png', comment: '567' }]; // Replace with your image URLs
    const router = useRouter()
    const [modalOpen, setModalOpen] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const { UserProfiledata, UserProfileloader } = useAppContext()
    const [Userdata, setUserdata] = useState(UserProfiledata)
    const [grpdata, setgrpdata] = useState(null)
    const [UserdataLoader, setUserdataLoader] = useState(true)

    useEffect(() => {
        axios.get(`${APP_URL}/api/groups/${groupbyid}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('grp by id', response);
                setisLoading(false)
                setgrpdata(response?.data)
            })
            .catch(error => {
                setisLoading(false)
                console.error(error);
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }, [])



    const openModal = (index) => {
        setSelectedImage(index);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setModalOpen(false);
    };



    const childrenWithProps = React.Children.map(children, (child, i) => {
        return React.cloneElement(child, { foo: Userdata })
    })


    return (
        <>
            {/* {UserdataLoader ? <Loader /> : <> */}
            {!GroupPage ? <>{children}</> :
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
                                        <Coverandtab grpdata={grpdata} isLoading={isLoading} />
                                    </div>
                                    <div className="container pb-5">
                                        <div className="border-bottom d-md-block d-none"></div>
                                        <div className="border-bottom d-md-none mt-4" ></div>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-lg-2 col-md-3 d-md-block d-none border-right">
                                                    <div className="d-flex justify-content-center pt-4 border-bottom">
                                                        <div className='mx-2'>
                                                            <p className="heading-m mb-0 clr-primary text-center">{grpdata?.data?.friends_count}</p>
                                                            <p className="para clr-text text-center">Members</p>
                                                        </div>
                                                        
                                                    </div>
                                                   
                                                </div>
                                                <div className="col-md-9 col-lg-10 ">
                                                    <grpContext.Provider value={{ grpdata, setUserdata }}>
                                                        {children}
                                                    </grpContext.Provider>
                                                    {/* {childrenWithProps} */}
                                                    {/* {React.cloneElement(children, { Userdata })} */}
                                                </div>
                                            </div>
                                        </div>
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

export default GroupLayout


