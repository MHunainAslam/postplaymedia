'use client'
import FancyBox from '@/components/FancyBox'
import ChatSideBar from '@/components/chatcomponents/ChatSideBar'
import ActivityHeader from '@/components/layout/ActivityHeader'
import ActivitySidebar from '@/components/layout/ActivitySidebar'
import Coverandtab from '@/components/profile/Coverandtab'
import ProfileTabPane from '@/components/profile/ProfileTabPane'
import Image from 'next/image'
import React, { useState } from 'react'

const UserProfileLayout = ({ children, ProfilePages }) => {
    const images = [{ url: '/assets/images/posts/covers.jpg', comment: '123' }, { url: '/assets/images/posts/cover.jpeg', comment: '321' }, { url: '/assets/images/Modal/Avatar.png', comment: '567' }]; // Replace with your image URLs

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const openModal = (index) => {
        setSelectedImage(index);
        setModalOpen(true);
        console.log(selectedImage, index)
    };

    const closeModal = () => {
        setSelectedImage(null);
        setModalOpen(false);
    };
    return (
        <>
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
                                        <Coverandtab />
                                    </div>
                                    <div className="container py-5">
                                        <div className="border-bottom d-md-block d-none" style={{ marginTop: '120px' }}></div>
                                        <div className="border-bottom d-md-none mt-4" ></div>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-lg-2 col-md-3 d-md-block d-none border-right">
                                                    <div className="d-flex justify-content-center pt-4 border-bottom">
                                                        <div className='mx-2'>
                                                            <p className="heading-m mb-0 clr-primary text-center">1</p>
                                                            <p className="para clr-text text-center">Friends</p>
                                                        </div>
                                                        <div className='mx-2'>
                                                            <p className="heading-m mb-0 clr-primary text-center">1</p>
                                                            <p className="para clr-text text-center">Groups</p>
                                                        </div>
                                                    </div>
                                                    <div>
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
                                                    </div>
                                                </div>
                                                <div className="col-md-9 col-lg-10 ">
                                                    {children}
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
        </>
    )
}

export default UserProfileLayout


