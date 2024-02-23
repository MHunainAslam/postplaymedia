'use client'
import { GetToken, imgurl } from '@/utils/Token'
import { deleteCookie } from 'cookies-next'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FancyBoxPost from './fancyboxes/allmembers/FancyBoxPost'
import { APP_URL, IMG_URL } from '../../../config'
import axios from 'axios'
// import { ReactPhotoCollage } from 'react-photo-collage'
import FancyBoxPostColaage from './fancyboxes/allmembers/FancyBoxPostColaage'
import DeletePost from './DeletePost'
import { useAppContext } from '@/context/AppContext'
import ShowAllImages from './ShowAllImages'
import { Image } from 'antd'
import { formatMentionsToLinks } from '@/utils/GrpFunctions'
import { Mention, MentionsInput } from 'react-mentions'
import { useFrndContext } from '@/context/FriendContext'
import EditPostModal from '../posts/EditPostModal'

const AllMembers = ({ postdone, endpoint }) => {
    const { UserProfiledata, UserProfileloader } = useAppContext()
    const [Comments, setComments] = useState([])
    const [isloading, setisloading] = useState(true)
    const [grpid, setgrpid] = useState()
    const [isdlt, setisdlt] = useState(true)
    const [cmntloader, setcmntloader] = useState(false)
    const [Liked, setLiked] = useState([])
    const token = GetToken('userdetail')
    const [CommentArea, setCommentArea] = useState(false)
    const [AllPosts, setAllPosts] = useState([])
    const [likecount, setlikecount] = useState('')
    const [loading, setLoading] = useState(1)
    const [CurrentPagefrnd, setCurrentPagefrnd] = useState(1)
    const [TotalPagesfrnd, setTotalPagesfrnd] = useState()
    const [Datafrnds, setDatafrnds] = useState([])
    const [totalMemberfrnd, settotalMemberfrnd] = useState(1)
    const router = useRouter()
    const [AllFrndsData, setAllFrndsData] = useState([])
    const [UserDataLoader, setUserDataLoader] = useState(true)
    const [PostmodalOpen, setPostModalOpen] = useState(false);
    const [PostselectedImage, setPostSelectedImage] = useState(null);
    const [loadmoreloader, setloadmoreloader] = useState(false)
    const [EditDone, setEditDone] = useState(false)
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
    const PostopenModal = (index) => {
        setPostSelectedImage(index);
        setPostModalOpen(true);
    };
    const PostcloseModal = () => {
        setPostSelectedImage(null);
        setPostModalOpen(false);
    };
    const fetchPosts = async (page) => {
        try {
            const response = await fetch(
                // `${APP_URL}/api/post?{section=all}&per_page=20&page=${page}`,
                `${APP_URL}/api/post${endpoint}per_page=20&page=${page}`,
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
                console.log('posts xx', data)
                setAllPosts(data.data.data);
                console.log(data)
                setCurrentPagefrnd(data.data.current_page);
                setTotalPagesfrnd(data.data.last_page);
                settotalMemberfrnd(data.data.total);
                setUserDataLoader(false)
                setisloading(false)
            } else {
                console.error('Failed to fetch messages');
                setUserDataLoader(false)
                setisloading(false)
            }
        } catch (error) {
            console.error('Error fetching messages', error);
            setUserDataLoader(false)
            setisloading(false)
            if (error?.response?.status === 401) {
                router.push('/')
                deleteCookie('logged');
                localStorage.removeItem('userdetail')
            }
        } finally {
            setisloading(false)
            setLoading(false);
            setUserDataLoader(false)
        }
    };
    const fetchPostss = async (page) => {
        setloadmoreloader(true)
        try {
            const response = await fetch(
                `${APP_URL}/api/post${endpoint}per_page=20&page=${page}`,
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
                setloadmoreloader(false)
            } else {
                console.error('Failed to fetch messages');
                setloadmoreloader(false)
            }
        } catch (error) {
            console.error('Error fetching messages', error);
            setloadmoreloader(false)
            if (error?.response?.status === 401) {
                router.push('/')
                deleteCookie('logged');
                localStorage.removeItem('userdetail')
            }
        } finally {
            setLoading(false);
            setloadmoreloader(false)

        }
    };
    useEffect(() => {
        // Fetch initial messages when the component mounts
        if (CurrentPagefrnd === 1 && Datafrnds.length === 0) {
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
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
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
    }, [postdone, isdlt, EditDone, endpoint])
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
        axios.post(`${APP_URL}/api/like-post`, { post_id: postId }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                // Handle successful response here
                console.log('liked post', response.data);
            })
            .catch(error => {
                // Handle error here
                console.error(error);
            });

    };
    const dislikepost = (postId) => {
        setAllPosts(prevData => prevData.map(post => {
            if (post.id === postId) {
                return { ...post, like_count: post.like_count - 1 }

            }
            return post;
        }));
        axios.post(`${APP_URL}/api/like-post`, { post_id: postId }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                // Handle successful response here
                console.log('disliked post', response.data);
            })
            .catch(error => {
                // Handle error here
                console.error(error);
            });
    };
    const getcomment = (e) => {
        axios.get(`${APP_URL}/api/comments/${e}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                // Handle successful response here
                console.log('get comment', response);
                setComments(response?.data?.data)
                setcmntloader(false)
            })
            .catch(error => {
                // Handle error here
                console.error(error);
                setcmntloader(false)
            });
    }


    const [focusedSuggestionIndex, setFocusedSuggestionIndex] = useState(0);
    const [PostText, setPostText] = useState()
    const [prevData, setprevData] = useState()
    const [EditPost, setEditPost] = useState(false)
    const [mentionuserid, setmentionuserid] = useState([])
    // Prepare friends data for mention
    const { Datafrnd } = useFrndContext()
    const friendsData = Datafrnd.map(friend => ({

        id: String(UserProfiledata?.data?.id == friend?.friend?.id ? friend?.user?.id : friend?.friend?.id),
        display: String(UserProfiledata?.data?.name == friend?.friend?.name ? friend?.user?.name : friend?.friend?.name),

    }));

    useEffect(() => {
        // Reset suggestion focus when PostText changes
        setFocusedSuggestionIndex(0);
    }, [PostText]);

    const handleKeyDown = (event) => {
        if (event.key === "ArrowDown") {
            event.preventDefault(); // Prevent cursor movement
            // setFocusedSuggestionIndex(i => i != friendsData.length - 1 && Math.min(i + 1, friendsData.length - 1));
            setFocusedSuggestionIndex(i => friendsData.length - 1 != i && i + 1);
            console.log('doewn', focusedSuggestionIndex, friendsData.length)
            console.log(friendsData)
        } else if (event.key === "ArrowUp") {
            event.preventDefault(); // Prevent cursor movement
            setFocusedSuggestionIndex(i => i != 0 ? i - 1 : i = friendsData.length - 1);
            console.log('up')
        }
    };
    const parseMentionsForIds = (text) => {
        const mentionRegex = /\@\[([^\]]+)\]\((\d+)\)/g; // Adjusted regex to capture ID within parentheses
        let match;
        const ids = [];

        while ((match = mentionRegex.exec(text)) !== null) {
            ids.push(match[2]); // match[2] is the captured group for the ID
        }

        return ids;
    };

    useEffect(() => {
        const ids = parseMentionsForIds(PostText);
        setmentionuserid(ids);
        console.log(ids)
    }, [PostText]);
    const editpost = (postId) => {
        setEditPost((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    }

    return (
        <>
            {isloading ? <div className="w-100 text-center mt-4">
                <span className="spinner-grow spinner-grow-sm mx-2 clr-primary" aria-hidden="true"></span>
                <span className="spinner-grow spinner-grow-sm mx-2 clr-primary" aria-hidden="true"></span>
                <span className="spinner-grow spinner-grow-sm mx-2 clr-primary" aria-hidden="true"></span>
            </div> :
                AllPosts.length == 0 &&
                <div div className=" mt-3 alert-box text-center">
                    <p className='heading-m clr-primary '>No Post Avaiable!</p>
                </div>
            }


            <ul className='px-0 mt-5'>
                {AllPosts?.map((item, i) => {
                    const providedTimestamp = item.created_at;
                    const providedDate = new Date(providedTimestamp);
                    const currentDate = new Date();
                    const timeDifferenceMs = currentDate - providedDate;
                    const minutesDifference = Math.floor(timeDifferenceMs / (1000 * 60));
                    const hoursDifference = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
                    const daysDifference = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));
                    const remainingHours = hoursDifference - (daysDifference * 24);
                    let timeDiffString;
                    if (minutesDifference >= 0 && minutesDifference <= 59) {
                        timeDiffString = `${minutesDifference} minutes ago`;
                    } else if (hoursDifference >= 1 && hoursDifference <= 24) {
                        timeDiffString = `${hoursDifference} hours ago`;
                    } else if (daysDifference >= 1 && daysDifference <= 7) {
                        timeDiffString = `${daysDifference} days ago`;
                    } else {
                        timeDiffString = `${providedTimestamp.slice(0, 10)}`;
                    }
                    // const formattedText = formatMentionsToLinks(item.post_text, UserProfiledata?.data?.id);
                    return (<div className='post-card mt-4 ' key={i}>
                        <div className='post-card-body ms-md-3 mb-3 back-border rounded-3 col-xxl-5 col-lg-7 col-md-8' >

                            <div className='head-content p-3'>
                                <Link href={item?.created_by?.id === UserProfiledata?.data?.id ? '/profile/activity' : `/people/${item?.created_by?.id}/activity`}>
                                    {item?.created_by?.profile_photo === null ?
                                        <img src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile  d-block me-2 object-fit-cover'></img>
                                        :
                                        <img src={IMG_URL + item?.created_by?.profile_photo?.url} alt="" width={100} height={100} className='post-profile d-block  me-2 object-fit-cover'></img>
                                    }
                                </Link>
                                <div className="">
                                    <div className="d-flex">
                                        <p className='mb-0 text-black para'>
                                            <span className='text-capitalize'> {item.created_by.name}&nbsp;</span>
                                            {item?.media?.length > 0 &&
                                                'added a post'
                                            }

                                            {item.post_in == 'group' &&
                                                <>
                                                    {item?.media?.length <= 0 ?
                                                        'posted in' : <> &nbsp;in</>
                                                    }
                                                    <span className='text-capitalize'>&nbsp;<Link href={`/groups/${item.group_id}`} className='link-hov clr-primary'>
                                                        {item.group_name} </Link>  </span>

                                                </>
                                            }
                                        </p>
                                    </div>
                                    <span className='clr-light mt-md-0 mb-0 mt-2 para fw-light '>{timeDiffString}</span>
                                </div>

                                {item?.created_by?.id === UserProfiledata?.data?.id &&
                                    <li className='ms-auto'>
                                        <i className="bi bi-three-dots-vertical fs-5 nav-link" data-bs-toggle="dropdown" aria-expanded="false"></i>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item " href={`#`} onClick={() => setgrpid(item.id)} data-bs-toggle="modal" data-bs-target="#DltPostAll" >Delete Post</Link></li>
                                            <li><Link className="dropdown-item " href={`#`} data-bs-toggle="modal" onClick={() => setprevData(item)} data-bs-target="#allmembereditpost" >Edit Post</Link></li>
                                            {/* <li><Link className="dropdown-item " href={`#`} onClick={() => { editpost(i), setPostText(item.post_text) }} >Edit Post</Link></li> */}
                                        </ul>
                                    </li>
                                }
                            </div>
                            {/* dangerouslySetInnerHTML={{ __html: formattedText }} */}
                            {/* <p className='px-3' dangerouslySetInnerHTML={{ __html: formattedText }}></p> */}
                            {/* <p className='px-3' > {renderText(item.post_text)}</p> */}
                            {/* <p className='px-3'
                                    dangerouslySetInnerHTML={{ __html: formattedText }}

                                /> */}
                            {/* {formattedText} */}
                            <p className="px-3 post-text">{formatMentionsToLinks(item.post_text, UserProfiledata?.data?.id)}</p>
                            <div className="px-3">
                                {/* {EditPost[i] &&
                                        <>
                                            <MentionsInput
                                                value={PostText}
                                                onChange={(event, newValue) => setPostText(newValue)}
                                                className="form-control t-area "
                                                style={{ minWidth: '300px', minHeight: '100px', padding: '10px' }}
                                                placeholder={`What's new, ${UserProfiledata?.data?.name}?`}
                                                onKeyUp={handleKeyDown}
                                            >

                                                <Mention
                                                    trigger="@"
                                                    data={friendsData}
                                                    renderSuggestion={(entry, search, highlightedDisplay, index, focused) => (
                                                        <ul className='suggestion-item'>
                                                            <li className={` para  ${index == focusedSuggestionIndex ? 'focused' : ''}`}
                                                                style={{ color: index == focusedSuggestionIndex ? 'white' : '#1763ac' }}
                                                            >
                                                                {highlightedDisplay}
                                                            </li>
                                                        </ul>
                                                    )}
                                                />
                                            </MentionsInput>
                                            
                                        </>
                                    } */}
                            </div>
                            <br />
                            {/* {item.post_text} */}
                            {/* <Link href={'/'} className='text-decoration-none'>lll</Link> */}
                            {/* <p>{formattedText}</p> */}

                            {item?.media?.length > 0 ?
                                <div className={`post-card-main ${item.media.length === 2 ? 'flex-collage' : ''}`}  >


                                    {item.media.length > 1 ?
                                        <>


                                            <div className='cvxc' >
                                                <ShowAllImages images={item.media} item={item} />

                                            </div>
                                            <FancyBoxPostColaage i={i} images={item?.media} fancyBoxId={`AllMembersFancyBox${i}`} modalOpen={PostmodalOpen} closeModal={PostcloseModal} selectedImage={PostselectedImage} setSelectedImage={setPostSelectedImage} name={item.created_by.name} profile={item?.created_by?.profile_photo} time={timeDiffString} item={item} dislikepost={dislikepost} handleToggle={handleToggle} likepost={likepost} likecount={likecount} Comments={Comments} getcomment={getcomment} cmntloader={cmntloader} />
                                        </>
                                        :

                                        item.media.map((media, i) => (

                                            media?.media?.url.slice(-4) == '.mp4' ?

                                                <video
                                                    className='pointer h-100 postimg w-100 dsd'
                                                    src={IMG_URL + media?.media?.url}
                                                    controls
                                                    key={i}
                                                />
                                                :
                                                // IMG_URL + media?.media?.url
                                                <Image
                                                    className='pointer h-100 postimg w-100 dsd'
                                                    src={IMG_URL + media?.media?.url}
                                                    key={i}
                                                />


                                        ))

                                    }


                                </div>
                                : ''
                            }
                            <FancyBoxPost i={i} images={item?.media[0]?.media?.url} fancyBoxId={`AllMembersFancyBox${i}`} modalOpen={PostmodalOpen} closeModal={PostcloseModal} selectedImage={PostselectedImage} setSelectedImage={setPostSelectedImage} para={item.post_text} name={item.created_by.name} profile={item?.created_by?.profile_photo} time={timeDiffString} item={item} dislikepost={dislikepost} handleToggle={handleToggle} likepost={likepost} likecount={likecount} Comments={Comments} getcomment={getcomment} cmntloader={cmntloader} />


                            <hr className='my-0' />


                            <div className="d-flex">
                                <p className='para mb-0 p-2 clr-primary'>
                                    <i className="bi bi-hand-thumbs-up-fill "></i> {likecount === '' ? item.like_count : item.like_count + likecount}
                                </p>
                                <p className='para text-black mb-0 p-2 clr-primary' ><i className="bi bi-chat-left"></i> {item.comment_count} </p>
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
                                    </div>
                                    <div className="col-6 text-center py-2">
                                        <span className='pointer' onClick={() => { PostopenModal(0), getcomment(item.id), setcmntloader(true) }}
                                            data-bs-toggle="modal" data-bs-target={`#AllMembersFancyBox${i}`}>
                                            <i className="bi bi-chat-left"></i> Comment
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* <span className='comment-active'> 1</span> */}

                            {/* {CommentArea[i] && (
                                    <div className='px-3 pb-3'>
                                        <div className="post-card-comments ">
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
                                    </div>
                                )} */}
                        </div>

                    </div>
                    )


                })}
                {loadmoreloader && <div className="w-100 text-center mt-4">
                    <span className="spinner-grow spinner-grow-sm mx-2 clr-primary" aria-hidden="true"></span>
                    <span className="spinner-grow spinner-grow-sm mx-2 clr-primary" aria-hidden="true"></span>
                    <span className="spinner-grow spinner-grow-sm mx-2 clr-primary" aria-hidden="true"></span>
                </div>}


            </ul>
            <DeletePost grpid={grpid} setisdlt={setisdlt} isdlt={isdlt} modalid={'DltPostAll'} />
            <EditPostModal postin={'profile'} prevData={prevData} setEditDone={setEditDone} EditDone={EditDone} editmodalid={'allmembereditpost'} />
        </>
    )
}

export default AllMembers