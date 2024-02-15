'use client'

import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { APP_URL, IMG_URL } from '../../../config'
import Link from 'next/link'
import { useAppContext } from '@/context/AppContext'
import axios from 'axios'
import { GetToken } from '@/utils/Token'
import { useParams } from 'next/navigation'
import { message } from 'antd'
import { Mention, MentionsInput } from 'react-mentions'
import { useFrndContext } from '@/context/FriendContext'

const GrpPostArea = ({ postdone, setpostdone }) => {
    const token = GetToken('userdetail')
    const { groupbyid } = useParams()
    const { UserProfiledata } = useAppContext()
    const { Datafrnd } = useFrndContext()

    const [PostArea, setPostArea] = useState(false)
    const [img, setimg] = useState([])
    const [PostText, setPostText] = useState()
    const [PostinGrp, setPostinGrp] = useState('profile')
    const [images, setImages] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [Activebtn, setActivebtn] = useState(false);
    const imgurl = ({ src }) => {
        return `${IMG_URL}${src}`
    }
    const handleImageChange = (e) => {
        const selectedFiles = e.target.files;
        setActivebtn(true)
        for (const file of selectedFiles) {
            const reader = new FileReader();
            const PostMedia = new FormData();
            // Array.from(e.target.files).forEach((file, index) => {
            //     PostMedia.append(`media[${index}]`, file);
            // });
            PostMedia.append('media', e.target.files[0]);
            reader.onload = (event) => {
                axios.post(`${APP_URL}/api/post-media`, PostMedia, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
                    .then(response => {
                        console.log('img', response);
                        setimg((img) => [...img, response.data.data.last_inserted_id])
                        console.log(img)
                        setActivebtn(false)

                    })
                    .catch(error => {
                        console.error(error);
                        message.error(error?.response.data?.message)
                        setActivebtn(false)
                        if (error?.response?.status === 401) {
                            router.push('/')
                            deleteCookie('logged');
                            localStorage.removeItem('userdetail')
                        }
                    });
                setImages((imgs) => [
                    ...imgs,
                    {
                        name: file.name,
                        size: file.size,
                        dataURL: event.target.result,
                    },
                ]);
            };

            reader.readAsDataURL(file);
        }
    };
    const removeImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
        const newImgs = [...img];
        newImgs.splice(index, 1);
        setimg(newImgs);
    };

    const post = ({ e, endpoint }) => {

        setisLoading(true)
        console.log('take', images)
        axios.post(`${APP_URL}/api/post`, {
            post_text: PostText?.toString(),
            status: 'active',
            post_in: 'group',
            group_id: '',
            ...(img.length > 0 && { media: img }),

        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                setisLoading(false)
                console.log('Post', response.data);
                setImages([])
                setimg([])
                setPostArea('')
                setPostText('')
                setpostdone(!postdone)
            })
            .catch(error => {
                setisLoading(false)
                console.error(error);
            });
    }

    const [focusedSuggestionIndex, setFocusedSuggestionIndex] = useState(0);

    // Prepare friends data for mention
    const friendsData = Datafrnd.map(friend => ({
        id: String(friend.friend.id),
        display: String(friend.friend.name),
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
        } else if (event.key === "ArrowUp") {
            event.preventDefault(); // Prevent cursor movement
            setFocusedSuggestionIndex(i => i != 0 ? i - 1 : i = friendsData.length - 1);
            console.log('up')
        }
    };

    return (
        <>
            {/* <div className="form-group">
                <MentionsInput
                    value={PostText}
                    onChange={(event, newValue) => setPostText(newValue)}
                    className="form-control ms-3 t-area"
                    style={{ minWidth: '300px', minHeight: '100px', padding: '10px' }}
                    placeholder={`What's new, ${UserProfiledata?.data?.name}?`}
                    onKeyDown={handleKeyDown}
                >
                    <Mention
                        trigger="@"
                        data={friendsData}
                        renderSuggestion={(entry, search, highlightedDisplay, index, focused) => (
                            <ul>
                                <li className={`suggestion-item ${index === focusedSuggestionIndex ? 'focused' : ''}`}>
                                    {highlightedDisplay}
                                </li>
                            </ul>
                        )}
                    />
                </MentionsInput>
            </div> */}
            <div className="card c-card">
                <div className="card-body p-md-4">
                    <div className="d-flex">
                        <Link href='/profile'>
                            {UserProfiledata?.data?.profile_photo === null ?
                                <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile'></Image>
                                :
                                <Image className='post-profile object-fit-cover' loader={imgurl} src={UserProfiledata?.data?.profile_photo.url} alt="" width={100} height={100}></Image>
                            }
                        </Link>
                        {PostArea === true ?
                            <MentionsInput
                                value={PostText}
                                onChange={(event, newValue) => setPostText(newValue)}
                                className="form-control ms-3 t-area"
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
                            // <textarea name="" className='form-control ms-3 t-area' id="" value={PostText} onChange={(e) => setPostText(e.target.value)} cols="30" rows="4" placeholder={`Whats new, ${UserProfiledata?.data?.name}?`}></textarea> 
                            :
                            <input type="text" placeholder={`Whats new, ${UserProfiledata?.data?.name}?`} onClick={() => { setPostArea(true) }} className='form-control ms-3 inp' name="" id="" />
                        }
                    </div>
                    {PostArea === true ?
                        <>
                            <div className=" border-top ">
                                <div className='d-flex align-items-center'>
                                    <input type="file" accept="image/*,video/*" multiple onChange={handleImageChange} className='d-none' name="" id="postmedia" />
                                    <label className="d-flex pointer mt-3" htmlFor="postmedia">
                                        <li className="header-btns ms-0 ">
                                            <i className="bi bi-paperclip clr-primary"></i>
                                        </li>
                                        <li className="w-auto px-2 rounded-5 header-btns ms-0">
                                            <p className='mb-0 para clr-primary'>Attach Media</p>
                                        </li>
                                    </label>
                                    {/* <p className='m-0 para-sm clr-text mt-3 '>Max. File Size: 64M</p> */}
                                </div>
                                {images.map((item, i) => (
                                    <div className='ShowAttachedFile' key={i}>
                                        <div className='d-flex align-items-center'>

                                            <Image src={item.dataURL} alt="" width={100} height={100} className='post-img '></Image>
                                            {/* <p className="para clr-text mb-0 ms-2">{item.name}</p> */}
                                        </div>
                                        <div className='d-flex align-items-center'>
                                            <p className="para-sm me-3 mb-0">{(item.size / 1024).toString().split('.')[0]} KB</p>

                                            <i className="bi bi-x-circle pointer" onClick={() => removeImage(i)}></i>
                                        </div>
                                    </div>
                                ))}

                            </div>
                            <div className="d-flex border-top  mt-3 align-items-center justify-content-between">
                                <div>
                                    {/* <select name="" id="" onChange={(e) => { setPostinGrp(e.target.value) }} className='form-select mt-3 slct w-auto'>
                                        <option value="profile">Post in: Profile</option>
                                        <option value="group">Post in: Group</option>
                                    </select> */}
                                    {PostinGrp === 'group' ?
                                        <input type="text" className='form-control inp mt-3 w-auto' placeholder="Start Typing in the Group Name" name="" id="" />
                                        : ''}
                                </div>
                                <div className='mt-3 d-flex align-items-center'>
                                    <p className='para clr-primary me-3 mb-0 pointer' onClick={(e) => { setPostArea(false) }}>Cancel</p>
                                    <button className='btn primary-btn px-5' disabled={Activebtn} onClick={post}><p className='para'>Post {isLoading ? <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span> : ''} </p></button>
                                </div>
                            </div>
                        </>

                        : ''}
                </div>
            </div>
        </>
    )
}

export default GrpPostArea
