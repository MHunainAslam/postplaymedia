'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Invitetabs from './Invitetabs';
import { APP_URL } from '../../../config';
import axios from 'axios';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { GetToken } from '@/utils/Token';
import { message } from 'antd';
const CreateGroups = () => {
    const token = GetToken('userdetail')
    const withFriendIdArray = []
    const [Detail, setDetail] = useState(true)
    const [Setting, setSetting] = useState(false)
    const [Forum, setForum] = useState(false)
    const [Photo, setPhoto] = useState(false)
    const [Media, setMedia] = useState(false)
    const [CoverImage, setCoverImage] = useState(false)
    const [Invite, setInvite] = useState(true)
    const [error, seterror] = useState(false)
    const [grpName, setgrpName] = useState('')
    const [grpDesc, setgrpDesc] = useState('')
    const [PrivacyPolicy, setPrivacyPolicy] = useState('')
    const [GroupInvitation, setGroupInvitation] = useState('')
    const [WantForum, setWantForum] = useState(false)
    const [SelectGrpImg, setSelectGrpImg] = useState(null)
    const [CreateAlbum, setCreateAlbum] = useState('')
    const [inviteuserid, setinviteuserid] = useState([])
    const [GrpCoverImg, setGrpCoverImg] = useState(null)
    const [grpprofile, setgrpprofile] = useState(null)
    const [grpcover, setgrpcover] = useState(null)
    const [btnActive, setbtnActive] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const router = useRouter()
    const handleCoverImageChange = (e) => {

        const formDataimg = new FormData();
        formDataimg.append('media', e.target.files[0]);
        const file = e.target.files[0];
        if (file) {
            setisLoading(true)
            setbtnActive(true)
            const reader = new FileReader();
            reader.onload = () => {
                setGrpCoverImg(reader.result);
                console.log(e.target.files[0])
                axios.post(`${APP_URL}/api/post-media`, formDataimg, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
                    .then(response => {
                        console.log('img', response);
                        setgrpcover(response.data.data.last_inserted_id)
                        setisLoading(false)
                        setbtnActive(false)
                    })
                    .catch(error => {
                        console.error(error);
                        setisLoading(false)
                        setbtnActive(false)
                        message.error(error?.response.data?.message)
                        if (error?.response?.status === 401) {
                            router.push('/')
                            deleteCookie('logged');
                            localStorage.removeItem('userdetail')
                        }
                    });

            };
            reader.readAsDataURL(file);
        }

    };
    const handleImageChange = (e) => {
        const formDataimg = new FormData();
        formDataimg.append('media', e.target.files[0]);
        const file = e.target.files[0];
        if (file) {
            setisLoading(true)
            setbtnActive(true)
            const reader = new FileReader();
            reader.onload = () => {
                setSelectGrpImg(reader.result);
                console.log(e.target.files[0])
                axios.post(`${APP_URL}/api/post-media`, formDataimg, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
                    .then(response => {
                        console.log('img', response);
                        setgrpprofile(response.data.data.last_inserted_id)
                        setbtnActive(false)
                        setisLoading(false)
                    })
                    .catch(error => {
                        console.error(error);
                        message.error(error?.response.data?.message)
                        setisLoading(false)
                        setbtnActive(false)
                        if (error?.response?.status === 401) {
                            router.push('/')
                            deleteCookie('logged');
                            localStorage.removeItem('userdetail')
                        }
                    });

            };
            reader.readAsDataURL(file);
        }

    };
    const DetailSubmit = (e) => {
        e.preventDefault()
        if (grpName === '' || grpDesc === '') {
            seterror(true)
        } else {
            seterror(false)
            setDetail(false)
            setSetting(true)
        }
    }
    const backtoDetail = (e) => {
        e.preventDefault()
        setDetail(true)
        setSetting(false)
    }
    const SettingSubmit = (e) => {
        e.preventDefault()
        if (PrivacyPolicy === '' || GroupInvitation === '') {
            seterror(true)
        } else {
            seterror(false)
            setSetting(false)
            setPhoto(true)
        }
    }
    const backtosetting = (e) => {
        e.preventDefault()
        setSetting(true)
        setPhoto(false)
    }

    const PhotoSubmit = (e) => {
        e.preventDefault()
        setPhoto(false)
        setCoverImage(true)

    }
    const backtoPhoto = (e) => {
        e.preventDefault()
        setPhoto(true)
        setCoverImage(false)
    }

    const CoverImgSubmit = (e) => {
        e.preventDefault()
        setCoverImage(false)
        setInvite(true)
    }
    const backtoCoverimg = (e) => {
        e.preventDefault()
        setCoverImage(true)
        setInvite(false)
    }


    const creategrp = (e) => {
        e.preventDefault()
        setisLoading(true)
        setbtnActive(true)
        axios.post(`${APP_URL}/api/groups`, { group_name: grpName, group_description: grpDesc, privacy: PrivacyPolicy, user_ids: inviteuserid, invitation: GroupInvitation, profile_photo: grpprofile, cover_photo: grpcover }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('create grp', response);
                setbtnActive(false)
                setisLoading(false)
                message.success(response.data.message)
                document.querySelector('#MyGroups-tab').click()
                setDetail(true)
                setInvite(false)
            })
            .catch(error => {
                console.error(error);
                setisLoading(false)
                setbtnActive(false)

                message.error(error?.response.data?.message)
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }
    return (

        <>
            <ul className='create-grp-step'>
                <li className={`${Detail ? 'active-step' : ''}`}>1. Detail</li>
                <li className={`${Setting ? 'active-step' : ''}`}>2. Settings</li>
                {/* <li className={`${Forum ? 'active-step' : ''}`}>3. Forum</li> */}
                <li className={`${Photo ? 'active-step' : ''}`}>3. Photo</li>
                {/* <li className={`${Media ? 'active-step' : ''}`}>5. Media</li> */}
                <li className={`${CoverImage ? 'active-step' : ''}`}>4. Cover Image</li>
                <li className={`${Invite ? 'active-step' : ''}`}>5. Invite</li>
            </ul >
            {
                Detail ?
                    <>
                        <p className="heading clr-text">
                            Enter Group Name & Description
                        </p>
                        <form action="" onSubmit={DetailSubmit}>
                            <label htmlFor="" className='clr-text para  ms-2'>Group Name (required)</label>
                            <input type="text" value={grpName} onChange={(e) => { setgrpName(e.target.value) }} className='inp form-control py-2' name="" id="" />
                            {error ? <> {grpName === '' ? <p className='text-danger para-sm ms-2 mb-0 mt-1'>Enter Your Group Name*</p> : ''} </> : ''}

                            <label htmlFor="" className='clr-text para mt-3 ms-2'>Group Description (required)</label>
                            <textarea className='area border form-control' id="" value={grpDesc} cols="30" rows="5" onChange={(e) => { setgrpDesc(e.target.value) }}></textarea>
                            {error ? <> {grpDesc === '' ? <p className='text-danger para-sm ms-2 mb-0 mt-1'>Enter Your Group Description*</p> : ''} </> : ''}

                            <button className='btn primary-btn mt-3' type="submit"><p>Create Group and Continue</p></button>
                        </form>
                    </>
                    : ''
            }
            {
                Setting ?
                    <>
                        <p className="heading clr-text">
                            Select Group Settings
                        </p>
                        <form action="" onSubmit={SettingSubmit}>
                            <div className="card select-grp-opt mt-4">
                                <p className='select-grp-opt-heading'>Privacy Options</p>
                                <div className="card-body px-md-4">
                                    <div className="d-flex">
                                        <input type="radio" className='form-check-input radio me-2' name="privacypolicy" onChange={(e) => { setPrivacyPolicy(e.target.value) }} value="public" id="publicgroup" checked={PrivacyPolicy === 'public'} />
                                        <label htmlFor='publicgroup' className=''>This is a public group</label>
                                    </div>
                                    <ul>
                                        <li>Any site member can join this group.</li>
                                        <li>This group will be listed in the groups directory and in search results.</li>
                                        <li>Group content and activity will be visible to any site member.</li>
                                    </ul>
                                    <div className="d-flex mt-4">
                                        <input type="radio" className='form-check-input radio me-2' name="privacypolicy" onChange={(e) => { setPrivacyPolicy(e.target.value) }} value="private" id="privategroup" checked={PrivacyPolicy === 'private'} />
                                        <label htmlFor='privategroup' className=''> This is a private group</label>
                                    </div>
                                    <ul>
                                        <li>Only people who request membership and are accepted can join the group.</li>
                                        <li>This group will be listed in the groups directory and in search results.</li>
                                        <li>Group content and activity will only be visible to members of the group.</li>
                                    </ul>
                                    <div className="d-flex mt-4">
                                        <input type="radio" className='form-check-input radio me-2' name="privacypolicy" onChange={(e) => { setPrivacyPolicy(e.target.value) }} value="hidden" id="hiddengroup" checked={PrivacyPolicy === 'hidden'} />
                                        <label htmlFor='hiddengroup' className=''> This is a hidden group</label>
                                    </div>
                                    <ul>
                                        <li>Only people who are invited can join the group.</li>
                                        <li>This group will not be listed in the groups directory or search results.</li>
                                        <li>Group content and activity will only be visible to members of the group.</li>
                                    </ul>
                                </div>
                            </div>
                            {error ? <> {PrivacyPolicy === '' ? <p className='text-danger para-sm ms-2 mb-0 mt-1'>Select Privacy Policy*</p> : ''} </> : ''}
                            <div className="card select-grp-opt mt-5">
                                <p className='select-grp-opt-heading'>Group Invitations</p>
                                <div className="card-body px-md-4">
                                    <p className="">Which members of this group are allowed to invite others?</p>
                                    <div className="d-flex">
                                        <input type="radio" className='form-check-input radio me-2' name="GrpInvitation" onChange={(e) => { setGroupInvitation(e.target.value) }} value="all" id="allgroupmember" checked={GroupInvitation === 'all'} />
                                        <label htmlFor='allgroupmember' className=''> All group members</label>
                                    </div>

                                    <div className="d-flex mt-2">
                                        <input type="radio" className='form-check-input radio me-2' name="GrpInvitation" onChange={(e) => { setGroupInvitation(e.target.value) }} value="admins_and_mods" id="groupadminandmods" checked={GroupInvitation === 'admins_and_mods'} />
                                        <label htmlFor='groupadminandmods' className=''>  Group admins and mods only</label>
                                    </div>

                                    <div className="d-flex mt-2">
                                        <input type="radio" className='form-check-input radio me-2' name="GrpInvitation" onChange={(e) => { setGroupInvitation(e.target.value) }} value="group_admins_only" id="groupadminonly" checked={GroupInvitation === 'group_admins_only'} />
                                        <label htmlFor='groupadminonly' className=''>  Group admins only</label>
                                    </div>

                                </div>
                            </div>
                            {error ? <> {GroupInvitation === '' ? <p className='text-danger para-sm ms-2 mb-0 mt-1'>Select Group Invitation*</p> : ''} </> : ''}
                            <div className="d-flex justify-content-between">
                                <button className='btn secondary-btn mt-4' onClick={backtoDetail}><>Back to Previous Step</></button>
                                <button className='btn primary-btn mt-4 px-5' type="submit"><p>Next Step</p></button>
                            </div>
                        </form>
                    </>
                    : ''
            }
            {/* {
                Forum ?
                    <>
                        <p className="heading clr-text">
                            Group Forum
                        </p>
                        <p className="para clr-text">
                            Create a discussion forum to allow members of this group to communicate in a structured, bulletin-board style fashion.
                        </p>
                        <form action="" onSubmit={ForumSubmit}>
                            <div className="card select-grp-opt mt-4">
                                <p className='select-grp-opt-heading'>Privacy Options</p>
                                <div className="card-body px-md-4">
                                    <div className="d-flex">
                                        <input type="checkbox" className='form-check-input radio me-2' name="privacypolicy" onChange={(e) => { setWantForum(!WantForum) }} value="wantforum" id="wantforum" checked={WantForum} />
                                        <label htmlFor='wantforum' className=''>Yes. I want this group to have a forum.</label>
                                    </div>

                                </div>
                            </div>


                            <div className="d-flex justify-content-between">
                                <button className='btn secondary-btn mt-4' onClick={backtosetting}><>Back to Previous Step</></button>
                                <button className='btn primary-btn mt-4' type="submit"><p>Create Group and Continue</p></button>
                            </div>
                        </form>
                    </>
                    : ''
            } */}
            {
                Photo ?
                    <>
                        <p className="heading clr-text">
                            Upload Group profile photo
                        </p>
                        <div className="d-flex align-items-center">
                            <Image src={'/assets/images/avatar/group.png'} alt="" width={100} height={100} className='post-profile-lg object-fit-cover'></Image>

                            <p className='para clr-text ms-3 mb-0'>Upload an image to use as a profile photo for this group. The image will be shown on the main group page, and in search results.
                                <br />
                                To skip the group profile photo upload process, hit the &ldquo;Next Step&ldquo; button.</p>
                        </div>

                        <form action="" onSubmit={PhotoSubmit}>
                            <div className="card select-grp-opt mt-4">
                                <p className='select-grp-opt-heading'>Upload</p>
                                <div className="card-body px-md-4">
                                    <div className="upload-grp-img">
                                        <p className="para clr-text mb-1">
                                            Drop your file here
                                        </p>
                                        <input className='d-none' type="file" name="" id="GroupProfile" accept="image/*" onChange={handleImageChange} />
                                        <label htmlFor="GroupProfile" className='px-4 secondary-btn btn'>Select Your File</label>

                                        {SelectGrpImg && (
                                            <div>
                                                <Image className='post-profile-xl object-fit-cover' src={SelectGrpImg} alt="Selected" width={500} height={500} />
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>


                            <div className="d-flex justify-content-between">
                                <button className='btn secondary-btn mt-4' onClick={backtosetting}><>Back to Previous Step</></button>
                                <button className='btn primary-btn mt-4' disabled={btnActive} type="submit"><p>Create Group and Continue {isLoading ? <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span> : ''}</p></button>
                            </div>
                        </form>
                    </>
                    : ''
            }
            {/* {
                Media ?
                    <>
                        <p className="heading clr-text">
                            Album Creation Control
                        </p>



                        <form action="" onSubmit={MediaSubmit}>
                            <div className="card select-grp-opt mt-5">
                                <p className='select-grp-opt-heading'>    Who can create Albums in this group?</p>
                                <div className="card-body px-md-4">

                                    <div className="d-flex">
                                        <input type="radio" className='form-check-input radio me-2' name="CreateAlbum" onChange={(e) => { setCreateAlbum(e.target.value) }} value="allgroupmember" id="allgroupmember" checked={CreateAlbum === 'allgroupmember'} />
                                        <label htmlFor='allgroupmember' className=''> All group members</label>
                                    </div>

                                    <div className="d-flex mt-2">
                                        <input type="radio" className='form-check-input radio me-2' name="CreateAlbum" onChange={(e) => { setCreateAlbum(e.target.value) }} value="groupadminandmods" id="groupadminandmods" checked={CreateAlbum === 'groupadminandmods'} />
                                        <label htmlFor='groupadminandmods' className=''>  Group admins and mods only</label>
                                    </div>

                                    <div className="d-flex mt-2">
                                        <input type="radio" className='form-check-input radio me-2' name="CreateAlbum" onChange={(e) => { setCreateAlbum(e.target.value) }} value="groupadminonly" id="groupadminonly" checked={CreateAlbum === 'groupadminonly'} />
                                        <label htmlFor='groupadminonly' className=''>  Group admins only</label>
                                    </div>

                                </div>
                            </div>
                            {error ? <> {CreateAlbum === '' ? <p className='text-danger para-sm ms-2 mb-0 mt-1'>Select Who can create Albums*</p> : ''} </> : ''}


                            <div className="d-flex justify-content-between">
                                <button className='btn secondary-btn mt-4' onClick={backtoPhoto}><>Back to Previous Step</></button>
                                <button className='btn primary-btn mt-4' type="submit"><p>Create Group and Continue</p></button>
                            </div>
                        </form>
                    </>
                    : ''
            } */}
            {
                CoverImage ?
                    <>
                        <p className="heading clr-text">
                            Upload Cover Image
                        </p>


                        <form action="" onSubmit={CoverImgSubmit}>
                            {GrpCoverImg && (
                                <>
                                    <div className='mt-4 '>
                                        <Image className='coverimgdisplay ' src={GrpCoverImg} alt="Selected" width={500} height={500} />
                                    </div>
                                    <p className='para clr-text mt-4'>If you&lsquo;d like to remove the existing group cover image but not upload a new one, please use the delete group cover image button.</p>
                                    <p className='para link-hov pointer text-danger mt-4' onClick={(e) => { setGrpCoverImg(null) }}>Delete Group Cover Image </p>

                                </>
                            )}
                            <div className="card select-grp-opt mt-5">
                                <p className='select-grp-opt-heading'>  The Cover Image will be used to customize the header of your group.</p>
                                <div className="card-body px-md-4">
                                    <div className="upload-grp-img">
                                        <p className="para clr-text mb-1">
                                            Drop your file here
                                        </p>
                                        <input className='d-none' type="file" name="" id="GroupCover" accept="image/*" onChange={handleCoverImageChange} />
                                        <label htmlFor="GroupCover" className='px-4 secondary-btn btn'>Select Your File</label>


                                    </div>

                                </div>
                            </div>


                            <div className="d-flex justify-content-between">
                                <button className='btn secondary-btn mt-4' onClick={backtoPhoto}><>Back to Previous Step</></button>
                                <button className='btn primary-btn mt-4' disabled={btnActive} type="submit"><p>Create Group and Continue {isLoading ? <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span> : ''}</p></button>
                            </div>
                        </form>
                    </>
                    : ''
            }
            {
                Invite ?
                    <>
                        <p className="heading clr-text">
                            Invite Members
                        </p>

                        <Invitetabs setinviteuserid={setinviteuserid}/>

                        <div className="d-flex justify-content-between">
                            <button className='btn secondary-btn mt-4' onClick={backtoCoverimg}><>Back to Previous Step</></button>
                            <button className='btn primary-btn mt-4 px-5' type="button"  disabled={btnActive} onClick={creategrp}><p>Finish {isLoading ? <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span> : ''}</p></button>
                        </div>
                    </>
                    : ''
            }
        </>
    )
}

export default CreateGroups