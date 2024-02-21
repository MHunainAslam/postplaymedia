'use client'
import ActivityLayout from '@/app/ActivityLayout'
import ShowAllImages from '@/components/activity/ShowAllImages'
import FancyBoxPost from '@/components/activity/fancyboxes/allmembers/FancyBoxPost'
import FancyBoxPostColaage from '@/components/activity/fancyboxes/allmembers/FancyBoxPostColaage'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { APP_URL, IMG_URL } from '../../../../config'
import axios from 'axios'
import { GetToken } from '@/utils/Token'
import { deleteCookie } from 'cookies-next'
import { formatMentionsToLinks } from '@/utils/GrpFunctions'
import { useAppContext } from '@/context/AppContext'
import DeletePost from '@/components/activity/DeletePost'
import EditPostModal from '@/components/posts/EditPostModal'
import Link from 'next/link'
import { Image } from 'antd'

const Page = () => {
    const token = GetToken('userdetail')
    const [grpid, setgrpid] = useState()
    const [isdlt, setisdlt] = useState(true)
    const [PostText, setPostText] = useState()
    const [prevData, setprevData] = useState()
    const [EditDone, setEditDone] = useState(false)
    const [cmntloader, setcmntloader] = useState(false)
    const { UserProfiledata, UserProfileloader } = useAppContext()
    const [likecount, setlikecount] = useState('')
    const [loadmoreloader, setloadmoreloader] = useState(false)
    const [Data, setData] = useState()
    const [AllPosts, setAllPosts] = useState([])
    const [PostmodalOpen, setPostModalOpen] = useState(false);
    const [PostselectedImage, setPostSelectedImage] = useState(null);
    const [Comments, setComments] = useState([])
    const { postbyid } = useParams()
    const router = useRouter()
    const PostopenModal = (index) => {
        setPostSelectedImage(index);
        setPostModalOpen(true);
    };
    const PostcloseModal = () => {
        setPostSelectedImage(null);
        setPostModalOpen(false);
    };
    useEffect(() => {
        axios.get(`${APP_URL}/api/post/${postbyid}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('post by id', response);
                setAllPosts([response.data.data])
            })
            .catch(error => {
                console.error(error);
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }, [postbyid])


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
    return (
        <ActivityLayout ActivityPages>
            <>
                <ul className='px-0 mt-5'>
                    {AllPosts?.map((item, i) => {
                        const providedTimestamp = item?.created_at;
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
                            timeDiffString = `${providedTimestamp?.slice(0, 10)}`;
                        }
                        return (
                            <div className='post-card mt-4 justify-content-center' key={i}>
                                <div className='post-card-body ms-md-3 mb-3 back-border rounded-3   col-lg-7 col-md-8' >
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
                                                    <span>  {item.created_by.name}&nbsp;</span>
                                                    {item?.media?.length > 0 &&
                                                        'added a post'
                                                    }
                                                </p>
                                                {item?.post_in == 'group' &&
                                                    <p className='mb-0 text-black para'>
                                                        {item?.media?.length <= 0 ?
                                                            'posted in' : <> &nbsp;in</>
                                                        }
                                                        <span className='text-capitalize'>&nbsp;<Link href={`/groups/${item?.group_id}`} className='link-hov clr-primary'>
                                                            {item?.group_name} </Link>  </span>
                                                    </p>
                                                }
                                            </div>
                                            <span className='clr-light mt-md-0 mb-0 mt-2 para fw-light '>{timeDiffString}</span>
                                        </div>

                                        {item?.created_by?.id === UserProfiledata?.data?.id &&
                                            <li className='ms-auto'>
                                                <i className="bi bi-three-dots-vertical fs-5 nav-link" data-bs-toggle="dropdown" aria-expanded="false"></i>
                                                <ul className="dropdown-menu">
                                                    <li><Link className="dropdown-item " href={`#`} onClick={() => setgrpid(item?.id)} data-bs-toggle="modal" data-bs-target="#DltPostAll" >Delete Post</Link></li>
                                                    <li><Link className="dropdown-item " href={`#`} data-bs-toggle="modal" onClick={() => setprevData(item)} data-bs-target="#allmembereditpost" >Edit Post</Link></li>
                                                </ul>
                                            </li>
                                        }
                                    </div>

                                    <p className="px-3 post-text">{formatMentionsToLinks(item?.post_text, UserProfiledata?.data?.id)}</p>
                                    <div className="px-3">

                                    </div>
                                    <br />

                                    {item?.media?.length > 0 ?
                                        <div className={`post-card-main ${item?.media.length === 2 ? 'flex-collage' : ''}`}  >


                                            {item?.media.length > 1 ?
                                                <>


                                                    <div className='cvxc' >
                                                        <ShowAllImages images={item?.media} item={item} />

                                                    </div>
                                                    <FancyBoxPostColaage images={item?.media} fancyBoxId={`AllMembersFancyBox${i}`} modalOpen={PostmodalOpen} closeModal={PostcloseModal} selectedImage={PostselectedImage} setSelectedImage={setPostSelectedImage} name={item?.created_by.name} profile={item?.created_by?.profile_photo} time={timeDiffString} item={item} dislikepost={dislikepost} handleToggle={handleToggle} likepost={likepost} likecount={likecount} Comments={Comments} getcomment={getcomment} cmntloader={cmntloader} />
                                                </>
                                                :

                                                item?.media.map((media, i) => (

                                                    media?.media?.url.slice(-4) == '.mp4' ?

                                                        <video
                                                            className='pointer h-100 postimg w-100 dsd'
                                                            src={IMG_URL + media?.media?.url}
                                                            controls
                                                            key={i}
                                                        />
                                                        :
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
                                    <FancyBoxPost images={item?.media?.media?.url} fancyBoxId={`AllMembersFancyBox${i}`} modalOpen={PostmodalOpen} closeModal={PostcloseModal} selectedImage={PostselectedImage} setSelectedImage={setPostSelectedImage} para={item?.post_text} name={item?.created_by.name} profile={item?.created_by?.profile_photo} time={timeDiffString} item={item} dislikepost={dislikepost} handleToggle={handleToggle} likepost={likepost} likecount={likecount} Comments={Comments} getcomment={getcomment} cmntloader={cmntloader} />


                                    <hr className='my-0' />


                                    <div className="d-flex">
                                        <p className='para mb-0 p-2 clr-primary'>
                                            <i className="bi bi-hand-thumbs-up-fill "></i> {likecount === '' ? item?.like_count : item?.like_count + likecount}
                                        </p>
                                        <p className='para text-black mb-0 p-2 clr-primary' ><i className="bi bi-chat-left"></i> {item?.comment_count} </p>
                                    </div>


                                    <hr className='my-0' />


                                    <div className="post-card-actions mt-0 px-3 py-0">
                                        <div className="d-flex ">
                                            <div className="col-6 text-center border-right-dark py-2">
                                                {item?.isLiked ?
                                                    <span className='pointer clr-primary' onClick={() => { handleToggle(item?.id), dislikepost(item?.id) }}>
                                                        <i className="bi bi-hand-thumbs-up-fill " ></i> Like
                                                    </span> :
                                                    <span className='pointer' onClick={() => { handleToggle(item?.id), likepost(item?.id) }}>
                                                        <i className="bi bi-hand-thumbs-up "></i> Like
                                                    </span>
                                                }
                                            </div>
                                            <div className="col-6 text-center py-2">
                                                <span className='pointer' onClick={() => { PostopenModal(0), getcomment(item?.id), setcmntloader(true) }}
                                                    data-bs-toggle="modal" data-bs-target={`#AllMembersFancyBox${i}`}>
                                                    <i className="bi bi-chat-left"></i> Comment
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        )


                    })}
                    {
                        loadmoreloader && <div className="w-100 text-center mt-4">
                            <span className="spinner-grow spinner-grow-sm mx-2 clr-primary" aria-hidden="true"></span>
                            <span className="spinner-grow spinner-grow-sm mx-2 clr-primary" aria-hidden="true"></span>
                            <span className="spinner-grow spinner-grow-sm mx-2 clr-primary" aria-hidden="true"></span>
                        </div>
                    }


                </ul>
                <DeletePost grpid={grpid} setisdlt={setisdlt} isdlt={isdlt} modalid={'DltPostAll'} />
                <EditPostModal postin={'profile'} prevData={prevData} setEditDone={setEditDone} EditDone={EditDone} editmodalid={'allmembereditpost'} />
            </>
        </ActivityLayout>
    )
}

export default Page