'use client'

import React, { useEffect, useRef, useState } from 'react'
import FancyBox from '../FancyBox';
import FancyboxVideo from './FancyboxVideo';
import { Image } from 'antd';
import axios from 'axios';
import { APP_URL, IMG_URL } from '../../../config';
import { GetToken } from '@/utils/Token';
const AllVideos = () => {
    const token = GetToken('userdetail')
    const [AllMedia, setAllMedia] = useState([])
    const images = [{ url: '/assets/videos/Login_bg.mp4', comment: '123' }]; // Replace with your image URLs

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const openModal = (index) => {
        setSelectedImage(index);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setModalOpen(false);
    };
    useEffect(() => {
        axios.get(`${APP_URL}/api/posted-activity-media`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('grp media', response);
                setAllMedia(response?.data?.data)
            })
            .catch(error => {

                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }, [])
    const [isvideo, setisvideo] = useState(false)
    const videoRefs = useRef(Array(AllMedia.filter(media => media.url.slice(-4) == '.mp4').length).fill(null));
    const currentlyPlayingRef = useRef(null);

    const playVideo = (index) => {
        // Pause the currently playing video if there is one
        if (currentlyPlayingRef.current !== null) {
            currentlyPlayingRef.current.pause();
            console.log('play');
            setisvideo(false)
        }

        // Play the selected video
        const video = videoRefs.current[index];
        if (video) {
            setisvideo((prevState) => ({
                ...prevState,
                [index]: !prevState[index]
            }));
            console.log('object');
            video.play();
            currentlyPlayingRef.current = video;
        } else {
            video.pause();
            console.log('else');
        }
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
            {/* <p className="para text-black mt-3">Sorry !! There&lsquo;s no media found for the request !!</p> */}
            <div className="row">
                <Image.PreviewGroup
                    preview={{
                        onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                    }}
                >
                    {AllMedia.filter(media => media.url.slice(-4) == '.mp4').map((image, index) => (
                        <div className=" col-md-6 mt-3" key={index}>
                            <div className="card gallery-card">
                                <div className="card-body p-0">

                                    <div className={`gallery-img ${isvideo[index] ? '' : 'gallery-video'}`} onClick={() => playVideo(index)}>

                                        {image.url.slice(-4) == '.mp4' ?

                                            <video
                                                className='pointer h-100 postimg w-100 dsd'
                                                ref={(ref) => (videoRefs.current[index] = ref)}
                                                src={IMG_URL + image.url}
                                                controls={isvideo[index]}
                                            // isvideo[index] && controls
                                            // controls
                                            />
                                            :

                                            <Image
                                                className='pointer'
                                                key={index}
                                                src={IMG_URL + image.url}
                                                alt={`Image ${index + 1}`}

                                            // onClick={() => openModal(index)}
                                            // data-bs-toggle="modal" data-bs-target={`#selectedImage`}
                                            // width={500} height={500}
                                            />
                                        }
                                    </div>

                                    <div className="d-flex mt-3 align-items-center">
                                        <img src={'/assets/images/Modal/Avatar.png'} alt="" width={40} height={40} className='post-profile-m'></img>

                                        <p className="heading-sm text-black mb-0 ms-2">Scott</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Image.PreviewGroup >
            </div>

            <FancyboxVideo images={images} modalOpen={modalOpen} closeModal={closeModal} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
        </>
    )
}

export default AllVideos
