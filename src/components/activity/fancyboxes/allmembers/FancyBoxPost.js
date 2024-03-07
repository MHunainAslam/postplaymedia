// FancyBox.js
import { GetToken, imgurl } from '@/utils/Token';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import InputEmoji from "react-input-emoji";
import { APP_URL, IMG_URL } from '../../../../../config';
import { useAppContext } from '@/context/AppContext';
import DeleteComment from '../../../posts/DeleteComment';
import axios from 'axios';
import { useFrndContext } from '@/context/FriendContext';
import { Mention, MentionsInput } from 'react-mentions';
import Link from 'next/link';
import { formatMentionsToLinks } from '@/utils/GrpFunctions';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
const FancyBoxPost = ({ i, cmntloader, images, modalOpen, closeModal, selectedImage, setSelectedImage, fancyBoxId, para, name, profile, time, item, likepost, dislikepost, handleToggle, likecount, Comments, getcomment }) => {
    const { Datafrnd } = useFrndContext()
    const router = useRouter()
    const { UserProfiledata, UserProfileloader } = useAppContext()
    const token = GetToken('userdetail')
    const [EditCmnt, setEditCmnt] = useState(false)
    const [cmnt, setcmnt] = useState('')
    const [CommentArea, setCommentArea] = useState(false)
    const [Commentid, setCommentid] = useState(0)
    const [dltcommentmodal, setdltcommentmodal] = useState(false)
    const [isloading, setisloading] = useState(false)
    const [comntloading, setcomntloading] = useState(false)
    const [mentionuserid, setmentionuserid] = useState([])
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
    const sendcomment = (e) => {
        e.preventDefault()
        if (text === '') {

        } else {
            setisloading(true)
            axios.post(`${APP_URL}/api/comment-on-post`, { post_id: item.id, body: text, mentioned_users: mentionuserid }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
                .then(response => {
                    // Handle successful response here
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

            axios.put(`${APP_URL}/api/edit-comment/${e}`, { body: cmnt, mentioned_users: mentionuserid }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
                .then(response => {
                    // Handle successful response here

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


    const nextImage = () => {
        setSelectedImage((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const prevImage = () => {
        setSelectedImage((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };
    const [text, setText] = useState("");

    const [focusedSuggestionIndex, setFocusedSuggestionIndex] = useState(0);

    // Prepare friends data for mention
    const friendsData = Datafrnd.map(friend => ({
        id: String(friend.friend.id),
        display: String(friend.friend.name),
    }));

    useEffect(() => {
        // Reset suggestion focus when setText changes
        setFocusedSuggestionIndex(0);
    }, [setText]);

    const handleKeyDown = (event) => {
        if (event.key === "ArrowDown") {
            event.preventDefault(); // Prevent cursor movement
            // setFocusedSuggestionIndex(i => i != friendsData.length - 1 && Math.min(i + 1, friendsData.length - 1));
            setFocusedSuggestionIndex(i => friendsData.length - 1 != i && i + 1);
        } else if (event.key === "ArrowUp") {
            event.preventDefault(); // Prevent cursor movement
            setFocusedSuggestionIndex(i => i != 0 ? i - 1 : i = friendsData.length - 1);
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
        const ids = parseMentionsForIds(text);
        setmentionuserid(ids);
    }, [text]);
    useEffect(() => {
        const ids = parseMentionsForIds(cmnt);
        setmentionuserid(ids);
    }, [cmnt]);
   
    useEffect(() => {
        // document.querySelectorAll('.close-fancybox-s').forEach(element => {
        //     element.click();
        // });
        closeModal()
    }, [router])
    return (

        <>
            <div className="modal fade fancy-box-modal" id={`${fancyBoxId}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog  modal-dialog-scrollable mx-auto d-flex align-items-center  fanncybox-body ">
                    <div className="modal-content border-0 bg-transparent">

                        <div className="modal-body">
                            {modalOpen && selectedImage !== null && (
                                <>
                                    <div className={`d-md-flex justify-content-center `}>
                                        <div className=" fancyimgsec position-relative d-flex align-items-center">
                                            <div className="w-100">

                                                {images ?
                                                    <>
                                                        {images?.slice(-4) == '.mp4' ?
                                                            <video
                                                                className='pointer h-100 postimg w-100 dsd postmodalimg'
                                                                src={IMG_URL + item?.media[0]?.media?.url}
                                                                controls
                                                            /> :
                                                            <Image width={5000} height={5000} src={images} loader={imgurl} className='w-100 postmodalimg object-fit-contain h-100' alt={` ${selectedImage + 1}`} />
                                                        }
                                                    </>
                                                    : <p className='para-lg w-100 text-white text-center px-5'>{formatMentionsToLinks(para, UserProfiledata?.data?.id)}</p>}
                                                {/* <button className='post-back-btn' onClick={prevImage}><i className="bi bi-chevron-left"></i></button>
                                        <button className='post-next-btn' onClick={nextImage}><i className="bi bi-chevron-right"></i></button> */}
                                            </div>
                                        </div>
                                        <div className="col-xl-3 col-md-5 p-2 commentsec">
                                            <div className="d-flex flex-column justify-content-between h-100">
                                                <div>

                                                    <div className="d-flex align-items-center">
                                                        <Link href={`${item?.created_by?.id === UserProfiledata?.data?.id ? '/profile/activity' : `/people/${item?.created_by?.id}/activity`}`} onClick={closeModal}>
                                                            {profile === null ?
                                                                <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile'></Image>
                                                                : <Image loader={imgurl} src={profile?.url} alt="" width={100} height={100} className='object-fit-cover post-profile'></Image>
                                                            }
                                                        </Link>
                                                        <div className="">
                                                            <p className="heading-sm text-black mb-0 ms-3 text-capitalize">{name}</p>
                                                            <p className="para clr-light mb-0 ms-3">{time}</p>
                                                        </div>
                                                        <div className="d-flex justify-content-end ms-auto">
                                                            
                                                            <span className={`close pointer close-fancybox-s ${fancyBoxId}close${i}`} data-bs-dismiss="modal" onClick={closeModal}><i className="bi bi-x-lg"></i></span>
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
                                                        <span className='pointer'><i className="bi bi-chat-left mb-0 clr-primary"></i> {Comments?.length}</span>

                                                    </div>

                                                </div>
                                                {cmntloader ?
                                                    <div className="w-100 text-center mt-4">
                                                        <span className="spinner-grow spinner-grow-sm mx-2 clr-primary" aria-hidden="true"></span>
                                                        <span className="spinner-grow spinner-grow-sm mx-2 clr-primary" aria-hidden="true"></span>
                                                        <span className="spinner-grow spinner-grow-sm mx-2 clr-primary" aria-hidden="true"></span>
                                                    </div> :
                                                    <div className='comment-body'>
                                                        <div className=' pb-3'>
                                                            <div className="post-card-comments ">
                                                                {Comments.map((item, i) => (
                                                                    <div key={i}>
                                                                        <div className="d-flex mt-3" >
                                                                            <Link href={`${item?.user?.id === UserProfiledata?.data?.id ? '/profile/profile' : `/people/${item?.user?.id}/activity`}`} onClick={closeModal}>
                                                                                {item?.user?.profile_photo == null ?
                                                                                    <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile-m me-2'></Image> :
                                                                                    <Image loader={imgurl} src={item?.user?.profile_photo?.url} alt="" width={100} height={100} className='post-profile-m me-2 object-fit-cover'></Image>
                                                                                }
                                                                            </Link>
                                                                            <div className='w-100'>
                                                                                {EditCmnt[i] ?
                                                                                    <>
                                                                                        <MentionsInput
                                                                                            value={cmnt}
                                                                                            onChange={(event, newValue) => setcmnt(newValue)}
                                                                                            className=" cmnt-e-i"
                                                                                            style={{ width: '100%', height: '35px' }}
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
                                                                                    :
                                                                                    <p className='form-control back-border text-black inp mb-0' name="" id="" >
                                                                                        {formatMentionsToLinks(item.body, UserProfiledata?.data?.id)}
                                                                                    </p>
                                                                                }
                                                                                <div className="d-flex mt-1 align-items-center">
                                                                                    {/* <p className="para-sm mb-0 ms-3 pointer text-black" onClick={() => RplyComments(i)} >Rply</p> */}
                                                                                    {item.user_id == UserProfiledata?.data?.id &&
                                                                                        <>
                                                                                            {EditCmnt[i] ?
                                                                                                <>
                                                                                                    <p className="para-sm mb-0 ms-3 pointer text-black" onClick={() => sendeditcomment(item.id)} >Save</p>
                                                                                                    <p className="para-sm mb-0 ms-3 pointer text-black" onClick={() => { EditComments(i) }} >Cancel</p>
                                                                                                </>
                                                                                                :
                                                                                                <> <p className="para-sm mb-0 ms-3 pointer text-black" onClick={() => { EditComments(i), setcmnt(item.body) }} >Edit</p>
                                                                                                    <p className="para-sm mb-0 ms-3 pointer text-black" onClick={() => { setdltcommentmodal(true), setCommentid(item.id) }}>Delete </p>
                                                                                                </>}
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
                                                <form className='pb-3 d-flex align-items-center justify-content-between' onSubmit={sendcomment}>
                                                    {/* <InputEmoji
                                                        className="inp form-control"
                                                        value={text}
                                                        onChange={setText}
                                                        placeholder="Type a message"
                                                    /> */}
                                                    <MentionsInput
                                                        value={text}
                                                        onChange={(event, newValue) => setText(newValue)}
                                                        className=" cmnt-i"
                                                        style={{ width: '85%', height: '40px' }}
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

                                                    <button className='btn primary-btn commentsendbtn' type='submit'><p>{isloading ? <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span> : <i className="bi bi-send"></i>}</p></button>
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

export default FancyBoxPost;

