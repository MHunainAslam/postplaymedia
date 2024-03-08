'use client'

import React, { useEffect, useRef, useState } from 'react'
import FancyBox from '../FancyBox';
import FancyboxVideo from './FancyboxVideo';
import { Image } from 'antd';
import axios from 'axios';
import { APP_URL, IMG_URL } from '../../../config';
import { GetToken } from '@/utils/Token';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
const AllVideos = ({ endpoint }) => {
    const { UserProfiledata, UserProfileloader } = useAppContext()
    const router = useRouter()
    const token = GetToken('userdetail')
    const [AllVideos, setAllVideos] = useState([])
    const images = [{ url: '/assets/videos/Login_bg.mp4', comment: '123' }]; // Replace with your image URLs
    const [isvideoloading, setisvideoloading] = useState(true)
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [CurrentPageVideo, setCurrentPageVideo] = useState(1)
    const [TotalPagesVideo, setTotalPagesVideo] = useState()
    const [videoloading, setvideoloading] = useState(1)
    const [loadmoreloader, setloadmoreloader] = useState(1)
    // const [loading, setvideoloading] = useState(false)

    const openModal = (index) => {
        setSelectedImage(index);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setModalOpen(false);
    };
    const fetchVideo = async (page) => {
        setisvideoloading(true);

        try {
            const response = await fetch(`${APP_URL}/api/${endpoint}per_page=50&page=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`,

                },
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok, status: ${response.status}`);
                setisvideoloading(false);
            }
            setisvideoloading(false);
            const { data, meta } = await response.json();


            if (Array.isArray(data) && data.length) {
                setAllVideos(data);
            }


            if (meta && typeof meta === 'object') {
                setCurrentPageVideo(Number(meta.page));
                setTotalPagesVideo(Number(meta.total_pages));
            }
        } catch (error) {
            console.error('Error fetching photos', error);

        } finally {
            setisvideoloading(false);
            setvideoloading(false);
        }
    };

    const fetchVideos = async (page) => {
        setloadmoreloader(true)
        try {
            const response = await fetch(`${APP_URL}/api/${endpoint}per_page=50&page=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`,

                },
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok, status: ${response.status}`);
                setloadmoreloader(false)
            }

            const { data, meta } = await response.json();
            setloadmoreloader(false)

            if (Array.isArray(data) && data.length) {
                setAllVideos((prevMessages) => [...prevMessages, ...data]);
            }


            if (meta && typeof meta === 'object') {
                setCurrentPageVideo(Number(meta.page));
                setTotalPagesVideo(Number(meta.total_pages));
            }
        } catch (error) {
            console.error('Error fetching photos', error);
            setloadmoreloader(false)

        } finally {
            setloadmoreloader(false)
            setvideoloading(false);
        }
    };

    useEffect(() => {
        // Fetch initial messages when the component mounts
        if (CurrentPageVideo === 1 && AllVideos.length === 0) {
            fetchVideo(CurrentPageVideo);
        }
    }, [CurrentPageVideo, token, endpoint]);
    const handleLoadMorefrnd = () => {

        if (CurrentPageVideo < TotalPagesVideo && !videoloading) {
            fetchVideos(CurrentPageVideo + 1);
        }
    };
    const handleScrollfrnd = () => {

        // Check if the user has scrolled to the bottom of the window
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 0) {
            handleLoadMorefrnd();

        }
    };
    useEffect(() => {
        // Add scroll event listener to the window when the component mounts
        window.addEventListener('scroll', handleScrollfrnd);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScrollfrnd);
        };
    }, [handleScrollfrnd]);
    useEffect(() => {
        // getallfrnds()
        fetchVideo(1)
    }, [token])

    const [isvideo, setisvideo] = useState(false)
    const videoRefs = useRef(Array(AllVideos.filter(media => media.url.slice(-4) == '.mp4').length).fill(null));
    const currentlyPlayingRef = useRef(null);

    const playVideo = (index) => {
        // Pause the currently playing video if there is one
        if (currentlyPlayingRef.current !== null) {
            currentlyPlayingRef.current.pause();
            setisvideo(false)
        }

        // Play the selected video
        const video = videoRefs.current[index];
        if (video) {
            setisvideo((prevState) => ({
                ...prevState,
                [index]: !prevState[index]
            }));
            video.play();
            currentlyPlayingRef.current = video;
        } else {
            video.pause();
        }
    };

    return (
        <>
            <div className="border-bottom ">
                {/* <div className="col-lg-3 mb-3 col-md-6 ">
                    <div className=" search-inp mt-3">
                        <span className="input-group-text right-0" ><i className="bi bi-search"></i></span>
                        <input type="text" className="form-control " placeholder="Search Media" aria-label="Username" />
                    </div>
                </div> */}
            </div>
            {/* <p className="para text-black mt-3">Sorry !! There&lsquo;s no media found for the request !!</p> */}
            {isvideoloading ? <div className="w-100 text-center mt-4">
                <span className="spinner-grow spinner-grow-sm mx-2 clr-primary" aria-hidden="true"></span>
                <span className="spinner-grow spinner-grow-sm mx-2 clr-primary" aria-hidden="true"></span>
                <span className="spinner-grow spinner-grow-sm mx-2 clr-primary" aria-hidden="true"></span>
            </div>
                :
                AllVideos.filter(media => media.url.slice(-4) == '.mp4').length == 0 &&
                <div div className=" mt-3 alert-box text-center">
                    <p className='heading-m clr-primary '>No Video Posted!</p>
                </div>
            }
            <div className="row">
                <Image.PreviewGroup
                    preview={{
                        onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                    }}
                >
                    {AllVideos.filter(media => media.url.slice(-4) == '.mp4' || media.url.slice(-4) == '.mov' || media.url.slice(-4) == '.wmv' || media.url.slice(-4) == '.avi').map((image, index) => (
                        <div className=" col-md-6 mt-3" key={index}>
                            <div className="card gallery-card">
                                <div className="card-body p-0">

                                    <div className={`gallery-img ${isvideo[index] ? '' : 'gallery-video'}`} onClick={() => playVideo(index)}>

                                        {image.url.slice(-4) == '.mp4' || image.url.slice(-4) == '.mov' || image.url.slice(-4) == '.wmv' || image.url.slice(-4) == '.avi' ?

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



                                    {/* {image.user_image == null ?
                                            <img src={'/assets/images/Modal/Avatar.png'} alt="" width={40} height={40} className='post-profile-m'></img>
                                            : <img src={IMG_URL + image.user_image} alt="" width={40} height={40} className='post-profile-m object-fit-cover'></img>
                                        } */}
                                    {/* <Link href={UserProfiledata?.data?.id === }></Link> */}
                                    {/* <p className="heading-sm text-black mb-0 ms-2">{image.user_name} </p> */}
                                    <Link href={`${UserProfiledata?.data?.id == image.user_id ? '/profile/activity' : `/people/${image.user_id}/activity`}`} className="link-hov d-flex mt-3 align-items-center">
                                        {image.user_image == null ?
                                            <img src={'/assets/images/Modal/Avatar.png'} alt="" width={40} height={40} className='post-profile-m'></img>
                                            : <img src={IMG_URL + image.user_image} alt="" width={40} height={40} className='post-profile-m object-fit-cover'></img>
                                        }
                                        {/* <Link href={UserProfiledata?.data?.id === }></Link> */}
                                        <p className="heading-sm text-black mb-0 ms-2">{image.user_name}</p>
                                    </Link>

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
