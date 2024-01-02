'use client'
import FancyBoxPost from '@/components/FancyBoxPost';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

const MentionTab = () => {
    // for comment area 
    const [CommentArea, setCommentArea] = useState(false)
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
    return (
        <>
            <div className="border-bottom d-flex justify-content-end ">
                
            </div>
            <ul className='post-border mt-5'>
             

                <div className='post-card mt-4'>
                    <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile d-md-block d-none'></Image>
                    <div className='post-card-body ms-md-3 mb-3'>
                        <div className='head-content'>
                            <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile d-block d-md-none me-2'></Image>
                            <p className='mb-0 text-black para'><span> User  </span>  posted an update</p>

                        </div>
                        <p className='clr-light mt-md-0 mt-2 para'>2 minutes ago</p>
                        <div className="post-card-main border-0 shadow-none">

                            <p className="para text-dark">
                            <Link className='link-hov' href={'#'}>@admin</Link> hi
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
                </div>

            </ul>

        </>
    )
}

export default MentionTab