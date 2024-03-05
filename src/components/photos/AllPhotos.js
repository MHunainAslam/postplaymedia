'use client'
// import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Fancybox from './Fancybox';
import FancyBox from '../FancyBox';
import { GetToken } from '@/utils/Token';
import { APP_URL, IMG_URL } from '../../../config';
import axios from 'axios';
import { deleteCookie } from 'cookies-next';
import { Image } from 'antd';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';



const AllPhotos = ({ endpoint }) => {
    const token = GetToken('userdetail')
    const { UserProfiledata, UserProfileloader } = useAppContext()
    const images = [{ url: '/assets/images/posts/covers.jpg', comment: '123' }, { url: '/assets/images/posts/cover.jpeg', comment: '321' }, { url: '/assets/images/Modal/Avatar.png', comment: '567' }]; // Replace with your image URLs
    const [AllPosts, setAllPosts] = useState([])
    const [CurrentPagefrnd, setCurrentPagefrnd] = useState(1)
    const [TotalPagesfrnd, setTotalPagesfrnd] = useState()
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [UserDataLoader, setUserDataLoader] = useState(true)
    const [loadmoreloader, setloadmoreloader] = useState(true)
    const [Datafrnd, setDatafrnd] = useState([])
    const [AllMedia, setAllMedia] = useState([])
    const [isloading, setisloading] = useState(true)
    const [loading, setLoading] = useState(false)
    const openModal = (index) => {
        setSelectedImage(index);
        setModalOpen(true);
        console.log(selectedImage, index)
    };

    const closeModal = () => {
        setSelectedImage(null);
        setModalOpen(false);
    };



    const fetchphotos = async (page) => {

        try {
            const response = await fetch(`${APP_URL}/api/${endpoint}per_page=20&page=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`,

                },
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok, status: ${response.status}`);
            }
            setisloading(false)
            const { data, meta } = await response.json();


            if (Array.isArray(data) && data.length) {
                console.log(data, 'all cfgdf')
                setAllMedia(data);
            }


            if (meta && typeof meta === 'object') {
                console.log(meta, 'meta')
                setCurrentPagefrnd(Number(meta.page));
                setTotalPagesfrnd(Number(meta.total_pages));
                console.log(meta)
            }
        } catch (error) {
            setisloading(false)
            console.error('Error fetching photos', error);

        } finally {
            setLoading(false);
            setisloading(false)
        }
    };

    const fetchphotoss = async (page) => {
        console.log('fetch photo')
        try {
            const response = await fetch(`${APP_URL}/api/${endpoint}per_page=20&page=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`,

                },
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok, status: ${response.status}`);
            }

            const { data, meta } = await response.json();


            if (Array.isArray(data) && data.length) {
                console.log(data, 'all cfgdf')
                setAllMedia((prevMessages) => [...prevMessages, ...data]);
            }


            if (meta && typeof meta === 'object') {
                setCurrentPagefrnd(Number(meta.page));
                setTotalPagesfrnd(Number(meta.total_pages));
                console.log(meta)
            }
        } catch (error) {
            console.error('Error fetching photos', error);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch initial messages when the component mounts
        if (CurrentPagefrnd === 1 && AllMedia.length === 0) {
            fetchphotos(CurrentPagefrnd);
        }
    }, [CurrentPagefrnd, token]);
    const handleLoadMorefrnd = () => {

        if (CurrentPagefrnd < TotalPagesfrnd && !loading) {
            console.log('adssa')
            setLoading(true);
            fetchphotoss(CurrentPagefrnd + 1);
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
        fetchphotos(1)
    }, [token])

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
            {isloading ? <div className="w-100 text-center mt-4">
                <span className="spinner-grow spinner-grow-sm mx-2 clr-primary" aria-hidden="true"></span>
                <span className="spinner-grow spinner-grow-sm mx-2 clr-primary" aria-hidden="true"></span>
                <span className="spinner-grow spinner-grow-sm mx-2 clr-primary" aria-hidden="true"></span>
            </div>
                : AllMedia.length == 0 &&
                <div div className=" mt-3 alert-box text-center">
                    <p className='heading-m clr-primary '>No Media Posted!</p>
                </div>
            }
            <div className="row">

                <Image.PreviewGroup
                    preview={{
                        onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                    }}
                >
                    {AllMedia.filter(media => media.url.slice(-4) !== '.mp4').map((image, index) => (
                        <div className="col-xxl-3 col-lg-4 col-12 mt-3" key={index}>
                            <div className="card gallery-card">
                                <div className="card-body p-0">

                                    <div className='gallery-img ' >

                                        {image.url.slice(-4) == '.mp4' ?

                                            <video
                                                className='pointer h-100 postimg w-100 dsd'
                                                src={IMG_URL + image.url}
                                                controls
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
            </div >
            {loading && <div className="w-100 text-center mt-4">
                <span className="spinner-grow spinner-grow-sm mx-2 clr-primary" aria-hidden="true"></span>
                <span className="spinner-grow spinner-grow-sm mx-2 clr-primary" aria-hidden="true"></span>
                <span className="spinner-grow spinner-grow-sm mx-2 clr-primary" aria-hidden="true"></span>
            </div>}
            <FancyBox images={images} modalOpen={modalOpen} closeModal={closeModal} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />

        </>
    )
}

export default AllPhotos