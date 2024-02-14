// FancyBox.js
import { GetToken, imgurl } from '@/utils/Token';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import InputEmoji from "react-input-emoji";
// import { ReactPhotoCollage } from 'react-photo-collage';
import { APP_URL, IMG_URL } from '../../config';
import ShowAllImages from './activity/ShowAllImages';
import axios from 'axios';
import DeleteComment from './posts/DeleteComment';
import { message } from 'antd';
import { deleteCookie } from 'cookies-next';
import { useAppContext } from '@/context/AppContext';
const FancyBoxPostColaage = ({ cmntloader, images, modalOpen, closeModal, selectedImage, setSelectedImage, fancyBoxId, name, profile, time, item, likepost, dislikepost, handleToggle, likecount, Comments, getcomment }) => {
    const { UserProfiledata, UserProfileloader } = useAppContext()
    const token = GetToken('userdetail')
    const [EditCmnt, setEditCmnt] = useState(false)
    const [cmnt, setcmnt] = useState('')
    const [CommentArea, setCommentArea] = useState(false)
    const [Commentid, setCommentid] = useState(0)
    const [dltcommentmodal, setdltcommentmodal] = useState(false)
    const [isloading, setisloading] = useState(false)
    const [comntloading, setcomntloading] = useState(false)

    const toggleComments = (postId) => {
        setCommentArea((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    };

    const EditComments = (postId) => {
        setEditCmnt((prevState) => ({
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


    const nextImage = () => {
        setSelectedImage((prevIndex) => (prevIndex === (images.length - 1) ? 0 : prevIndex + 1));

    };

    const prevImage = () => {
        setSelectedImage((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };
    const [text, setText] = useState("");

    const sendcomment = (e) => {
        e.preventDefault()
        if (text === '') {

        } else {
            setisloading(true)
            axios.post(`${APP_URL}/api/comment-on-post`, { post_id: item.id, body: text }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
                .then(response => {
                    // Handle successful response here
                    console.log('comment post', response);
                    setText('')
                    setisloading(false)
                    getcomment(item.id)
                })
                .catch(error => {
                    // Handle error here
                    console.error(error);
                    setisloading(false)
                });
        }
    }
    const sendeditcomment = (e) => {

        if (cmnt === '') {

        } else {

            axios.put(`${APP_URL}/api/edit-comment/${e}`, { body: cmnt }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
                .then(response => {
                    // Handle successful response here
                    console.log('comment post', response);

                    getcomment(item.id)
                    setEditCmnt(false)
                })
                .catch(error => {
                    // Handle error here
                    console.error(error);
                    setisloading(false)
                });
        }
    }
    const dltcomment = (e) => {
        setcomntloading(true)
        axios.delete(`${APP_URL}/api/comment/${e}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('Dlt comment', response);
                getcomment(item.id)
                setcomntloading(false)
                setdltcommentmodal(false)
            })
            .catch(error => {
                console.error(error);
                setcomntloading(false)
                message.error(error?.response.data?.message)
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }
    // useEffect(() => {
    //     getcomment()
    // }, [])


    return (
        <>


            <div className="modal fade fancy-box-modal" id={`${fancyBoxId}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog  modal-dialog-scrollable mx-auto d-flex align-items-center  fanncybox-body ">
                    <div className="modal-content border-0 bg-transparent">

                        <div className="modal-body">
                            {modalOpen && selectedImage !== null && (
                                <>
                                    <div className={`d-md-flex justify-content-center `}>

                                        <div className="fancyimgsec position-relative d-flex align-items-center collage-fancybox">
                                            <div className='w-100'>

                                                {images[selectedImage]?.media?.url.slice(-4) == '.mp4' ?

                                                    <video
                                                        className='pointer h-100 postimg w-100 dsd'
                                                        src={IMG_URL + item?.media[0]?.media?.url}
                                                        controls
                                                    />
                                                    :
                                                    <Image width={5000} height={5000} src={images[selectedImage]?.media?.url} loader={imgurl} className='w-100 postmodalimg object-fit-contain h-100' alt={` ${selectedImage + 1}`} />}
                                                {/* {images.map((item) => (
                                            ))} */}

                                            </div>
                                            <button className='post-back-btn' onClick={prevImage}><i className="bi bi-chevron-left"></i></button>
                                            <button className='post-next-btn' onClick={nextImage}><i className="bi bi-chevron-right"></i></button>
                                        </div>
                                        <div className="col-xl-3 col-md-5 p-2 commentsec">
                                            <div className="d-flex flex-column justify-content-between h-100">
                                                <div>

                                                    <div className="d-flex align-items-center">
                                                        {profile === null ?
                                                            <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile'></Image>
                                                            : <Image loader={imgurl} src={profile?.url} alt="" width={100} height={100} className='object-fit-cover post-profile'></Image>
                                                        }
                                                        <div className="">
                                                            <p className="heading-sm text-black mb-0 ms-3 text-capitalize">{name}</p>
                                                            <p className="para clr-light mb-0 ms-3">{time}</p>
                                                        </div>
                                                        <div className="d-flex justify-content-end ms-auto">
                                                            <span className="close pointer" data-bs-dismiss="modal" onClick={closeModal}><i class="bi bi-x-lg"></i></span>
                                                        </div>
                                                    </div>
                                                    <div className="post-card-actions py-2">
                                                        {item.isLiked ?
                                                            <span className='pointer clr-primary' onClick={() => { handleToggle(item.id), dislikepost(item.id) }}>
                                                                <i className="bi bi-hand-thumbs-up-fill " ></i> {likecount === '' ? item.like_count : item.like_count + likecount}
                                                            </span> :
                                                            <span className='pointer' onClick={() => { handleToggle(item.id), likepost(item.id) }}>
                                                                <i className="bi bi-hand-thumbs-up "></i> {likecount === '' ? item.like_count : item.like_count + likecount}
                                                            </span>
                                                        }
                                                        <span className='pointer'><i class="bi bi-chat-left mb-0 clr-primary"></i> {Comments?.length}</span>

                                                    </div>

                                                </div>
                                                {cmntloader ?
                                                    <div className="w-100 text-center mt-4">
                                                        <span className="spinner-grow spinner-grow-sm mx-2 clr-primary" aria-hidden="true"></span>
                                                        <span className="spinner-grow spinner-grow-sm mx-2 clr-primary" aria-hidden="true"></span>
                                                        <span className="spinner-grow spinner-grow-sm mx-2 clr-primary" aria-hidden="true"></span>
                                                    </div>
                                                    :
                                                    <div className='comment-body'>
                                                        <div className=' pb-3'>
                                                            <div className="post-card-comments ">
                                                                {Comments.map((item, i) => (
                                                                    <div key={i}>
                                                                        <div className="d-flex mt-3" >
                                                                            <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile-m me-2'></Image>
                                                                            <div className='w-100'>
                                                                                {EditCmnt[i] ?
                                                                                    <input type="text" value={cmnt} onChange={(e) => setcmnt(e.target.value)} className='form-control back-border text-black inp' name="" id="" />
                                                                                    : <input type="text" value={item.body} readOnly className='form-control back-border text-black inp' name="" id="" />
                                                                                }
                                                                                <div className="d-flex mt-1 align-items-center">
                                                                                    {/* <p className="para-sm mb-0 ms-3 pointer text-black" onClick={() => RplyComments(i)} >Rply</p> */}
                                                                                    {item.user_id == UserProfiledata?.data?.id &&
                                                                                        <>
                                                                                            {EditCmnt[i] ?
                                                                                                <p className="para-sm mb-0 ms-3 pointer text-black" onClick={() => sendeditcomment(item.id)} >Save</p>
                                                                                                : <p className="para-sm mb-0 ms-3 pointer text-black" onClick={() => { EditComments(i), setcmnt(item.body) }} >Edit</p>
                                                                                            }
                                                                                            <p className="para-sm mb-0 ms-3 pointer text-black" onClick={() => { setdltcommentmodal(true), setCommentid(item.id) }}>Delete </p>
                                                                                        </>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        {RplyArea[i] && (
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

                                                                    </div>
                                                                ))}


                                                            </div>


                                                        </div>
                                                    </div>
                                                }
                                                <form className='pb-3 d-flex align-items-center' onSubmit={sendcomment}>
                                                    <InputEmoji
                                                        className="inp form-control"
                                                        value={text}
                                                        onChange={setText}
                                                        placeholder="Type a message"
                                                    />

                                                    <button className='btn primary-btn commentsendbtn' type='submit'><p>{isloading ? <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span> : <i class="bi bi-send"></i>}</p></button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                </>
                            )}
                        </div>
                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div> */}
                    </div>
                </div>
            </div>

            <DeleteComment dltcommentmodal={dltcommentmodal} setdltcommentmodal={setdltcommentmodal} dltcomment={dltcomment} Commentid={Commentid} comntloading={comntloading} />
        </>

    );
};

export default FancyBoxPostColaage;
