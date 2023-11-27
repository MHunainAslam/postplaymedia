'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import Fancybox from './Fancybox';
import FancyBox from '../FancyBox';



const AllPhotos = () => {

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
            <div className="border-bottom ">
                <div className="col-lg-3 mb-3 col-md-6 ">
                    <div className=" search-inp mt-3">
                        <span className="input-group-text right-0" ><i className="bi bi-search"></i></span>
                        <input type="text" className="form-control " placeholder="Search Media" aria-label="Username" />
                    </div>
                </div>
            </div>
            <div className="row">
                {images.map((image, index) => (
                    <div className="col-xl-3 col-lg-4 col-md-6 mt-3" key={index}>
                        <div className="card gallery-card">
                            <div className="card-body p-0">

                                <div className='gallery-img'>
                                    <Image
                                        className='pointer'
                                        key={index}
                                        src={image.url}
                                        alt={`Image ${index + 1}`}
                                        onClick={() => openModal(index)}
                                        data-bs-toggle="modal" data-bs-target={`#selectedImage`}
                                        width={500} height={500}
                                    />
                                </div>

                                <div className="d-flex mt-3 align-items-center">
                                    <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile-m'></Image>
                                    <p className="heading-sm text-black mb-0 ms-2">Scott</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <FancyBox images={images} modalOpen={modalOpen} closeModal={closeModal} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />

        </>
    )
}

export default AllPhotos