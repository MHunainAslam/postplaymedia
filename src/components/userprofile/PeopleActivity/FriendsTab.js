'use client'
import FancyBox from '@/components/FancyBox'
import FancyBoxPost from '@/components/activity/fancyboxes/allmembers/FancyBoxPost'
import PostArea from '@/components/posts/PostArea'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const FriendsTab = () => {
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
    };

    const PostcloseModal = () => {
        setPostSelectedImage(null);
        setPostModalOpen(false);
    };
    return (
        <>
          
            <div className="border-bottom d-flex justify-content-end ">
                <div className="col-lg-4 col-md-6">
                    <select className='form-select slct my-4'>
                        <option value="0">— Everything —</option>
                        <option value="Updates">Updates</option>
                        <option value="rtMedia">rtMedia Updates</option>
                        <option value="Friendships">Friendships</option>
                        <option value="NewGroups">New Groups</option>
                        <option value="GroupMemberships">Group Memberships</option>
                        <option value="GroupUpdates">Group Updates</option>
                        <option value="Topics">Topics</option>
                        <option value="Replies">Replies</option>
                    </select>
                </div>
            </div>
            <ul className='post-border mt-5'>
                <div className='post-card mt-4'>
                    <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile d-md-block d-none'></Image>
                    <div className='post-card-body ms-md-3 mb-3'>
                        <div className='head-content'>
                            <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile d-block d-md-none me-2'></Image>
                            <p className='mb-0 text-black para'><span> admin  </span>  added a Photo</p>

                        </div>
                        <p className='clr-light mt-md-0 mt-2 para'>2 minutes ago</p>
                        <div className="post-card-main">
                            {postimages.map((image, index) => (
                                <>
                                    <Image
                                        className='pointer h-100 rounded w-100'
                                        key={index}
                                        src={'/assets/images/posts/cover.jpeg'}
                                        alt={`Image ${index + 1}`}
                                        onClick={() => PostopenModal(index)}
                                        data-bs-toggle="modal" data-bs-target={`#friendpostimages`}
                                        width={500} height={500}

                                    />
                                    <FancyBoxPost images={'/assets/images/posts/cover.jpeg'} fancyBoxId={'friendpostimages'} modalOpen={PostmodalOpen} closeModal={PostcloseModal} selectedImage={PostselectedImage} setSelectedImage={setPostSelectedImage} />
                                </>
                            ))}


                        </div>
                        <div className="post-card-actions">
                            <span><i className="bi bi-hand-thumbs-up "></i> Like</span>
                            <span className='pointer' onClick={() => toggleComments(1)}> Comment</span>
                            <span className='comment-active'> 1</span>
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

                <div className='post-card mt-4'>
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
                </div>

            </ul>


        </>
    )
}

export default FriendsTab
