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
    const [Datafrnd, setDatafrnd] = useState([])
    const [AllMedia, setAllMedia] = useState([])
    const [loading, setLoading] = useState(1)
    const openModal = (index) => {
        setSelectedImage(index);
        setModalOpen(true);
        console.log(selectedImage, index)
    };

    const closeModal = () => {
        setSelectedImage(null);
        setModalOpen(false);
    };

    useEffect(() => {
        axios.get(`${APP_URL}/api/${endpoint}per_page=20&page=1`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('grp media', response);
                // setAllMedia(response?.data?.data)
            })
            .catch(error => {

                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }, [])


    const fetchphotos = async (page) => {
        setLoading(true); // Maan lijiye ki ye state aapko loading indicator manage karne ke liye chahiye

        try {
            const response = await fetch(`${APP_URL}/api/${endpoint}?per_page=20&page=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    // Yadi aur headers hain toh yahan add karein
                },
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok, status: ${response.status}`);
            }

            const { data, meta } = await response.json(); // Destructuring se data aur meta ko alag kiya ja raha hai

            // Yadi data array hai aur usme elements hain, toh unhe process karein
            if (Array.isArray(data) && data.length) {
                console.log(data, 'all')
                setAllMedia(data); // Maan lijiye setAllMedia existing media array me new media add karta hai
            }

            // Meta object ko handle karein, jaise ki current page aur total pages set karna
            if (meta && typeof meta === 'object') {
                // setCurrentPage(meta.current_page); 
                // setTotalPages(meta.last_page); 
                console.log(meta)
            }
        } catch (error) {
            console.error('Error fetching photos', error);
            // Error handling logic yahan likhein, jaise ki user ko error message dikhana
        } finally {
            setLoading(false); // Finally block me setLoading ko false set karke loading indicator ko band karein
        }
    };
    // const fetchphotos = async (page) => {
    //     try {
    //         const response = await fetch(
    //             `${APP_URL}/api/posted-activity-media?per_page=20&page=${page}`,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                     // Add other headers if needed
    //                 },
    //             }
    //         );
    //         const data = await response.json();
    //         if (data.meta) {
    //             console.log('All Images', data)
    //             setAllMedia(data.data.data);
    //             console.log(data)
    //             setCurrentPagefrnd(data.data.current_page);
    //             setTotalPagesfrnd(data.data.last_page);
    //             settotalMemberfrnd(data.data.total);
    //             setUserDataLoader(false)
    //         } else {
    //             console.error('Failed to fetch messages');
    //             setUserDataLoader(false)
    //         }
    //     } catch (error) {
    //         console.error('Error fetching messages', error);
    //         setUserDataLoader(false)
    //         if (error?.response?.status === 401) {
    //             router.push('/')
    //             deleteCookie('logged');
    //             localStorage.removeItem('userdetail')
    //         }
    //     } finally {
    //         setLoading(false);
    //         setUserDataLoader(false)
    //     }
    // };
    const fetchphotoss = async (page) => {
        try {
            const response = await fetch(
                `${APP_URL}/api/${endpoint}per_page=20&page=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        // Add other headers if needed
                    },
                }
            );

            const data = await response?.data?.json();

            if (data.success) {
                // Prepend new messages to the beginning of the array
                console.log('all images prepend', data)
                setAllMedia((prevMessages) => [...prevMessages, ...data?.data?.data]);
                setCurrentPagefrnd(data.data.current_page);
                setTotalPagesfrnd(data.data.last_page);
                console.log((prevMessages) => [...prevMessages, data?.data?.data], 'hn')
            } else {
                console.error('Failed to fetch messages');
            }
        } catch (error) {
            console.error('Error fetching messages', error);
            if (error?.response?.status === 401) {
                router.push('/')
                deleteCookie('logged');
                localStorage.removeItem('userdetail')
            }
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
                <div className="col-lg-3 mb-3 col-md-6 ">
                    <div className=" search-inp mt-3">
                        <span className="input-group-text right-0" ><i className="bi bi-search"></i></span>
                        <input type="text" className="form-control " placeholder="Search Media" aria-label="Username" />
                    </div>
                </div>
            </div>
            {AllMedia.length == 0 &&
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
                        <div className="col-xxl-3 col-lg-4 col-6 mt-3" key={index}>
                            <div className="card gallery-card">
                                <div className="card-body p-0">

                                    <div className='gallery-img'>

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

                                    <div className="d-flex mt-3 align-items-center">
                                        {image.user_image == null ?
                                            <img src={'/assets/images/Modal/Avatar.png'} alt="" width={40} height={40} className='post-profile-m'></img>
                                            : <img src={IMG_URL + image.user_image} alt="" width={40} height={40} className='post-profile-m object-fit-cover'></img>
                                        }
                                        {/* <Link href={UserProfiledata?.data?.id === }></Link> */}
                                        <p className="heading-sm text-black mb-0 ms-2">{image.user_name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Image.PreviewGroup >
            </div >

            <FancyBox images={images} modalOpen={modalOpen} closeModal={closeModal} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />

        </>
    )
}

export default AllPhotos