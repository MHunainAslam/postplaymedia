'use client'
import { GetToken, imgurl } from '@/utils/Token'
import { deleteCookie } from 'cookies-next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FancyBoxPost from '../FancyBoxPost'
import { APP_URL } from '../../../config'
import axios from 'axios'

const AllMembers = ({ postdone }) => {
    const [Liked, setLiked] = useState([])
    const token = GetToken('userdetail')
    const [CommentArea, setCommentArea] = useState(false)
    const [AllPosts, setAllPosts] = useState([])
    const [likecount, setlikecount] = useState('')
    const [loading, setLoading] = useState(1)
    const [CurrentPagefrnd, setCurrentPagefrnd] = useState(1)
    const [TotalPagesfrnd, setTotalPagesfrnd] = useState()
    const [Datafrnd, setDatafrnd] = useState([])
    const [totalMemberfrnd, settotalMemberfrnd] = useState(1)
    const router = useRouter()
    const [AllFrndsData, setAllFrndsData] = useState([])
    const [UserDataLoader, setUserDataLoader] = useState(true)
    const handleLike = (index, like) => {
        const newLiked = [...Liked];
        newLiked[index] = !newLiked[index];
        setLiked(newLiked);
    };
    const toggleComments = (postId) => {
        setCommentArea((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    };
    const [RplyArea, setRplyArea] = useState(false)
    const RplyComments = (postId) => {
        setRplyArea((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    };



    // for fancy box 
    const postimages = [{}]; // Replace with your image URLs

    const [PostmodalOpen, setPostModalOpen] = useState(false);
    const [PostselectedImage, setPostSelectedImage] = useState(null);

    const PostopenModal = (index) => {
        setPostSelectedImage(index);
        setPostModalOpen(true);
        console.log(PostselectedImage, index)
    };

    const PostcloseModal = () => {
        setPostSelectedImage(null);
        setPostModalOpen(false);
    };




    const fetchPosts = async (page) => {
        try {
            const response = await fetch(
                `${APP_URL}/api/post?section=all&per_page=20&page=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        // Add other headers if needed
                    },
                }
            );
            const data = await response.json();
            if (data.success) {
                // Prepend new messages to the beginning of the array
                console.log('posts', data)
                setAllPosts(data.data.data);
                console.log(data)
                setCurrentPagefrnd(data.data.current_page);
                setTotalPagesfrnd(data.data.last_page);
                settotalMemberfrnd(data.data.total);
                setUserDataLoader(false)
            } else {
                console.error('Failed to fetch messages');
                setUserDataLoader(false)
            }
        } catch (error) {
            console.error('Error fetching messages', error);
            setUserDataLoader(false)
            if (error?.response?.status === 401) {
                router.push('/')
                deleteCookie('logged');
                localStorage.removeItem('userdetail')
            }
        } finally {
            setLoading(false);
            setUserDataLoader(false)
        }
    };
    const fetchPostss = async (page) => {
        try {
            const response = await fetch(
                `${APP_URL}/api/post?section=all&per_page=20&page=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        // Add other headers if needed
                    },
                }
            );

            const data = await response.json();

            if (data.success) {
                // Prepend new messages to the beginning of the array
                console.log('data', data)
                setAllPosts((prevMessages) => [...prevMessages, ...data?.data?.data]);
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
        if (CurrentPagefrnd === 1 && Datafrnd.length === 0) {
            fetchPosts(CurrentPagefrnd);
        }
    }, [CurrentPagefrnd, token]);
    const handleLoadMorefrnd = () => {
        if (CurrentPagefrnd < TotalPagesfrnd && !loading) {
            setLoading(true);
            fetchPostss(CurrentPagefrnd + 1);
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
        fetchPosts()
    }, [postdone])
    const handleToggle = (postId) => {
        setAllPosts(prevData => prevData.map(post => {
            if (post.id === postId) {
                return { ...post, isLiked: !post.isLiked }

            }
            return post;
        }));
    };
    const likepost = (postId) => {
        setAllPosts(prevData => prevData.map(post => {
            if (post.id === postId) {
                return { ...post, like_count: post.like_count + 1 }

            }
            return post;
        }));
    };
    const dislikepost = (postId) => {
        setAllPosts(prevData => prevData.map(post => {
            if (post.id === postId) {
                return { ...post, like_count: post.like_count - 1 }

            }
            return post;
        }));
    };
    return (
        <>
            <ul className='px-0 mt-5'>
                {AllPosts?.map((item, i) => {
                    const providedTimestamp = item.created_at;

                    // Parse the provided timestamp into a Date object
                    const providedDate = new Date(providedTimestamp);

                    // Get the current time
                    const currentDate = new Date();

                    // Calculate the time difference in milliseconds
                    const timeDifferenceMs = currentDate - providedDate;

                    // Convert milliseconds to minutes, hours, and days
                    const minutesDifference = Math.floor(timeDifferenceMs / (1000 * 60));
                    const hoursDifference = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
                    const daysDifference = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));

                    // Calculate remaining hours after calculating minutes
                    const remainingHours = hoursDifference - (daysDifference * 24);

                    // Display the time difference
                    let timeDiffString;

                    if (minutesDifference >= 0 && minutesDifference <= 59) {
                        timeDiffString = `${minutesDifference} minutes ago`;
                    } else if (hoursDifference >= 1 && hoursDifference <= 24) {
                        timeDiffString = `${hoursDifference} hours ago`;
                    } else {
                        timeDiffString = `${daysDifference} days ago`;
                    }
                    return <>

                        <div className='post-card mt-4 ' key={i}>
                            {/* {item?.created_by?.profile_photo === null ?
                                <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile d-md-block d-none object-fit-cover'></Image>
                                :
                                <Image loader={imgurl} src={item?.created_by?.profile_photo?.url} alt="" width={100} height={100} className='post-profile d-md-block d-none object-fit-cover'></Image>
                            } */}
                            <div className='post-card-body ms-md-3 mb-3 back-border rounded-3 '>
                                <div className='head-content p-3'>
                                    {item?.created_by?.profile_photo === null ?
                                        <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile  d-block me-2 object-fit-cover'></Image>
                                        :
                                        <Image loader={imgurl} src={item?.created_by?.profile_photo?.url} alt="" width={100} height={100} className='post-profile d-block  me-2 object-fit-cover'></Image>
                                    }
                                    <p className='mb-0 text-black para'>
                                        <span> {item.created_by.name}  </span>
                                        {item?.media?.length > 0 &&
                                            'added a Photo'
                                        }
                                        <p className='clr-light mt-md-0 mb-0 mt-2 para'>{timeDiffString}</p>
                                    </p>

                                </div>
                                <p className='px-3'>{item.post_text}</p>

                                {item?.media?.length > 0 ?

                                    item?.media?.map((image, index) => (
                                        <>
                                            <div className="post-card-main" key={index} >
                                                <>
                                                    {/* {image.id} */}
                                                    <Image
                                                        className='pointer h-100 postimg w-100 dsd'
                                                        key={index}
                                                        loader={imgurl}
                                                        src={image?.media?.url}
                                                        alt={`Image ${index + 1}`}
                                                        onClick={() => PostopenModal(index)}
                                                        data-bs-toggle="modal" data-bs-target={`#postimages${i}`}
                                                        width={500} height={500}

                                                    />
                                                    <FancyBoxPost images={image?.media?.url} fancyBoxId={`postimages${i}`} modalOpen={PostmodalOpen} closeModal={PostcloseModal} selectedImage={PostselectedImage} setSelectedImage={setPostSelectedImage} />
                                                </>
                                            </div>

                                        </>
                                    ))

                                    :
                                    ''

                                }
                                <hr className='my-0' />
                                <div className="d-flex">
                                    <p className='para mb-0 p-2 clr-primary'> <i className="bi bi-hand-thumbs-up-fill "></i> {likecount === '' ? item.like_count : item.like_count + likecount}</p>
                                    <p className='para text-black mb-0 p-2 clr-primary' ><i class="bi bi-chat-left"></i> {item.comment_count} </p>
                                </div>
                                <hr className='my-0' />

                                <div className="post-card-actions mt-0 px-3 py-0">
                                    <div className="d-flex ">
                                        <div className="col-6 text-center border-right-dark py-2">
                                            {item.isLiked ?
                                                <span className='pointer clr-primary' onClick={() => { handleToggle(item.id), dislikepost(item.id) }}>
                                                    <i className="bi bi-hand-thumbs-up-fill " ></i> Like
                                                </span> :
                                                <span className='pointer' onClick={() => { handleToggle(item.id), likepost(item.id) }}>
                                                    <i className="bi bi-hand-thumbs-up "></i> Like
                                                </span>
                                            }
                                            {/* {Liked[i] ?
                                                <span className='pointer clr-primary' onClick={() => { handleLike(i), setlikecount(Number(likecount) - 1) }}>
                                                    <i className="bi bi-hand-thumbs-up-fill " ></i> Like
                                                </span> :
                                                <span className='pointer' onClick={() => { handleLike(i), setlikecount(Number(likecount) + 1) }}>
                                                    <i className="bi bi-hand-thumbs-up "></i> Like
                                                </span>
                                            } */}
                                        </div>
                                        <div className="col-6 text-center py-2">
                                            <span className='pointer' onClick={() => toggleComments(1)}> <i class="bi bi-chat-left"></i> Comment</span>
                                        </div>
                                    </div>
                                    {/* <span className='comment-active'> 1</span> */}
                                </div>
                                {CommentArea[1] && (
                                    <>
                                        <div className="post-card-comments">
                                            <div className="d-flex mt-3">
                                                <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile me-3'></Image>
                                                <div className='w-100'>
                                                    <input type="text" value={'Hello'} readOnly className='form-control back-border text-black inp' name="" id="" />
                                                    <div className="d-flex mt-1 align-items-center">
                                                        <p className="para mb-0 ms-3 pointer text-black" onClick={() => RplyComments(1)} >Rply</p>
                                                        <p className="para mb-0 ms-3 pointer text-black" >Delete</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {RplyArea[1] && (
                                            <div className="post-card-comments ms-5">
                                                <div className="d-flex mt-3">
                                                    <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile me-3'></Image>
                                                    <div className='w-100'>
                                                        <input type="text" placeholder='Whats new, admin?' className='form-control inp' name="" id="" />
                                                        <p className="para-sm ms-2 mb-0 clr-primary">Rply to @admin</p>
                                                        <div className="d-flex mt-3 align-items-center">
                                                            <button className='btn primary-btn py-0 px-3 '><p className='para '>Post</p></button>
                                                            <p className="para mb-0 ms-3 pointer clr-primary" onClick={(e) => { setRplyArea(false) }}>Cancel</p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        )}
                                        <div className="post-card-comments">
                                            <div className="d-flex mt-3">
                                                <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile me-3'></Image>
                                                <div className='w-100'>
                                                    <input type="text" placeholder='Whats new, admin?' className='form-control inp' name="" id="" />
                                                    <div className="d-flex mt-3 align-items-center">
                                                        <button className='btn primary-btn py-0 px-3 '><p className='para '>Post</p></button>
                                                        <p className="para mb-0 ms-3 pointer clr-primary" onClick={(e) => { toggleComments(1) }}>Cancel</p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </>
                                )}
                            </div>

                        </div>

                    </>
                })}

                {/* <div className='post-card mt-4'>
                    <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile d-md-block d-none'></Image>
                    <div className='post-card-body ms-md-3 mb-3'>
                        <div className='head-content'>
                            <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile d-block d-md-none me-2'></Image>
                            <p className='mb-0 text-black para'><span> admin  </span> joined the group</p>
                            <div className="person-w-name ms-2">
                                <li><i className="bi bi-people-fill"></i></li>
                                <Link className='ms-1 text-black para' href={'#'}>Division III coaches </Link>
                            </div>
                        </div>
                        <p className='clr-light mt-md-0 mt-2 para'>2 minutes ago</p>
                        <div className="post-card-main">
                            <div className="cover-img">
                                <Image src={'/assets/images/posts/cover.jpeg'} alt="" width={900} height={900} className=''></Image>
                            </div>
                            <div className="post-card-content">
                                <div className="profile">
                                    <Image src={'/assets/images/avatar/group.png'} alt="" width={100} height={100} className=''></Image>
                                </div>
                                <div className="name ms-3">
                                    <Link href={'#'} className=" text-black">Division III coaches</Link>
                                    <p className="para mb-0 clr-light">
                                        <i className="bi bi-globe me-2"></i>
                                        Public
                                    </p>
                                </div>
                                <div className="action text-end">
                                    <button className='btn add-btn '><i className="bi bi-dash"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="post-card-actions">
                            <span><i className="bi bi-hand-thumbs-up "></i> Like</span>
                            <span className='pointer' onClick={() => toggleComments(2)}> Comment</span>
                            <span className='comment-active'> 1</span>
                        </div>
                        {CommentArea[2] && (
                            <>
                                <div className="post-card-comments">
                                    <div className="d-flex mt-3">
                                        <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile me-3'></Image>
                                        <div className='w-100'>
                                            <input type="text" value={'Hello'} readOnly className='form-control back-border text-black inp' name="" id="" />
                                            <div className="d-flex mt-1 align-items-center">
                                                <p className="para mb-0 ms-3 pointer text-black" onClick={() => RplyComments(2)}>Rply</p>
                                                <p className="para mb-0 ms-3 pointer text-black" >Delete</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {RplyArea[2] && (
                                    <div className="post-card-comments ms-5">
                                        <div className="d-flex mt-3">
                                            <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile me-3'></Image>
                                            <div className='w-100'>
                                                <input type="text" placeholder='Whats new, admin?' className='form-control inp' name="" id="" />
                                                <p className="para-sm ms-2 mb-0 clr-primary">Rply to @admin</p>
                                                <div className="d-flex mt-3 align-items-center">
                                                    <button className='btn primary-btn py-0 px-3 '><p className='para '>Post</p></button>
                                                    <p className="para mb-0 ms-3 pointer clr-primary" onClick={(e) => { RplyComments(2) }}>Cancel</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )}
                                <div className="post-card-comments">
                                    <div className="d-flex mt-3">
                                        <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile me-3'></Image>
                                        <div className='w-100'>
                                            <input type="text" placeholder='Whats new, admin?' className='form-control inp' name="" id="" />
                                            <div className="d-flex mt-3 align-items-center">
                                                <button className='btn primary-btn py-0 px-3 '><p className='para '>Post</p></button>
                                                <p className="para mb-0 ms-3 pointer clr-primary" onClick={(e) => { toggleComments(2) }}>Cancel</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </>)}
                    </div>
                </div>

                <div className='post-card mt-4'>
                    <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile d-md-block d-none'></Image>
                    <div className='post-card-body ms-md-3 mb-3'>
                        <div className='head-content'>
                            <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile d-block d-md-none me-2'></Image>
                            <p className='mb-0 text-black para'><span> admin  </span> posted a new activity</p>

                        </div>
                        <p className='clr-light mt-md-0 mt-2 para'>2 minutes ago</p>
                        <div className="post-card-main border-0 shadow-none">

                            <p className="para text-dark">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus labore vero, rem minus dolorum dolor, officia laboriosam aut nisi in magnam delectus! Neque exercitationem voluptatum impedit beatae asperiores sequi quas.
                            </p>
                        </div>
                        <div className="post-card-actions">
                            <span><i className="bi bi-hand-thumbs-up "></i> Like</span>
                            <span className='pointer' onClick={() => toggleComments(3)}> Comment</span>
                            <span className='comment-active'> 1</span>
                        </div>
                        {CommentArea[3] && (
                            <>
                                <div className="post-card-comments">
                                    <div className="d-flex mt-3">
                                        <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile me-3'></Image>
                                        <div className='w-100'>
                                            <input type="text" value={'Hello'} readOnly className='form-control back-border text-black inp' name="" id="" />
                                            <div className="d-flex mt-1 align-items-center">
                                                <p className="para mb-0 ms-3 pointer text-black" onClick={() => RplyComments(3)}>Rply</p>
                                                <p className="para mb-0 ms-3 pointer text-black" >Delete</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {RplyArea[3] && (
                                    <div className="post-card-comments ms-5">
                                        <div className="d-flex mt-3">
                                            <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile me-3'></Image>
                                            <div className='w-100'>
                                                <input type="text" placeholder='Whats new, admin?' className='form-control inp' name="" id="" />
                                                <p className="para-sm ms-2 mb-0 clr-primary">Rply to @admin</p>
                                                <div className="d-flex mt-3 align-items-center">
                                                    <button className='btn primary-btn py-0 px-3 '><p className='para '>Post</p></button>
                                                    <p className="para mb-0 ms-3 pointer clr-primary" onClick={(e) => { RplyComments(3) }}>Cancel</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )}
                                <div className="post-card-comments">
                                    <div className="d-flex mt-3">
                                        <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile me-3'></Image>
                                        <div className='w-100'>
                                            <input type="text" placeholder='Whats new, admin?' className='form-control inp' name="" id="" />
                                            <div className="d-flex mt-3 align-items-center">
                                                <button className='btn primary-btn py-0 px-3 '><p className='para '>Post</p></button>
                                                <p className="para mb-0 ms-3 pointer clr-primary" onClick={(e) => { toggleComments(3) }}>Cancel</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </>)}
                    </div>
                </div> */}

            </ul>
        </>
    )
}

export default AllMembers