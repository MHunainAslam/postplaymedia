'use client'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import axios from 'axios';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { GetToken, imgurl } from '@/utils/Token';
import { message } from 'antd';
import { APP_URL } from '../../../../config';
import { grpContext } from '@/app/GroupLayout';
const GroupSetting = () => {
    const { grpdata } = useContext(grpContext)
    console.log(grpdata)
    const token = GetToken('userdetail')
    const withFriendIdArray = []
    const [Detail, setDetail] = useState(true)
    const [Setting, setSetting] = useState(false)
    const [Forum, setForum] = useState(false)
    const [Photo, setPhoto] = useState(false)
    const [Media, setMedia] = useState(false)
    const [CoverImage, setCoverImage] = useState(false)
    const [Invite, setInvite] = useState(false)
    const [error, seterror] = useState(false)
    const [grpName, setgrpName] = useState('')
    const [grpDesc, setgrpDesc] = useState('')
    const [PrivacyPolicy, setPrivacyPolicy] = useState('')
    const [GroupInvitation, setGroupInvitation] = useState('')
    const [WantForum, setWantForum] = useState(false)
    const [SelectGrpImg, setSelectGrpImg] = useState(null)
    const [CoverImg, setCoverImg] = useState()
    const [CreateAlbum, setCreateAlbum] = useState('')
    const [inviteuserid, setinviteuserid] = useState([])
    const [GrpCoverImg, setGrpCoverImg] = useState(null)
    const [showGrpCoverImg, setshowGrpCoverImg] = useState(null)
    const [grpprofile, setgrpprofile] = useState(null)
    const [showgrpprofile, setshowgrpprofile] = useState(null)
    const [grpcover, setgrpcover] = useState(null)
    const [btnActive, setbtnActive] = useState(false)
    const [grpId, setgrpId] = useState('')
    const [isLoading, setisLoading] = useState(false)
    const router = useRouter()
    useEffect(() => {
        setshowgrpprofile(grpdata?.data?.group?.profile_photo)
        setshowGrpCoverImg(grpdata?.data?.group?.cover_photo)
        setPrivacyPolicy(grpdata?.data?.group?.privacy)
        setGroupInvitation(grpdata?.data?.group?.invitation)
        setgrpName(grpdata?.data?.group?.group_name)
        setgrpDesc(grpdata?.data?.group?.group_description)
        setgrpId(grpdata?.data?.group?.id)
    }, [grpdata])

    const handleCoverImageChange = (e) => {

        const formDataimg = new FormData();
        formDataimg.append('media', e.target.files[0]);
        const file = e.target.files[0];
        if (file) {
            setisLoading(true)
            setbtnActive(true)
            const reader = new FileReader();
            reader.onload = () => {
                setshowGrpCoverImg(null)
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
            setshowgrpprofile(null)
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

    const updategrp = (e) => {
        e.preventDefault()
        setisLoading(true)
        setbtnActive(true)
        axios.put(`${APP_URL}/api/groups/${grpId}`, { group_name: grpName, group_description: grpDesc, privacy: PrivacyPolicy, user_ids: inviteuserid, invitation: GroupInvitation, profile_photo: showgrpprofile ? showgrpprofile.id : grpprofile, cover_photo: showGrpCoverImg ? showGrpCoverImg.id : grpcover }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('create grp', response);
                setbtnActive(false)
                setisLoading(false)
                message.success(response.data.message)
                setDetail(true)
                setInvite(false)
            })
            .catch(error => {
                console.error(error);
                setisLoading(false)
                setbtnActive(false)

                message.error(error?.response?.data?.message)
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }
    return (

        <>


            <form action="" onSubmit={updategrp} className='mt-4'>

                <div className="card select-grp-opt mt-4">
                    <p className='select-grp-opt-heading'>Change Profile</p>
                    <div className="card-body px-md-4">
                        <div className="upload-grp-img">
                            <p className="para clr-text mb-1">
                                Drop your file here
                            </p>
                            <input className='d-none' type="file" name="" id="GroupProfile" accept="image/*" onChange={handleImageChange} />
                            <label htmlFor="GroupProfile" className='px-4 secondary-btn btn'>Select Your File</label>
                            {

                                SelectGrpImg && (
                                    <>
                                        <div>
                                            <Image className='post-profile-xl object-fit-cover' src={SelectGrpImg} alt="Selected" width={500} height={500} />
                                        </div>
                                        <button className='btn btn-outline-danger rounded-5 mt-3' onClick={() => setSelectGrpImg(null)}>Delete</button>
                                    </>
                                )

                            }
                            {

                                showgrpprofile && (
                                    <>
                                        <div>
                                            <Image className='post-profile-xl object-fit-cover' loader={imgurl} src={showgrpprofile.url} alt="Selected" width={500} height={500} />
                                        </div>
                                        <button className='btn btn-outline-danger rounded-5 mt-3' onClick={() => setshowgrpprofile(null)}>Delete</button>
                                    </>
                                )

                            }
                        </div>
                    </div>
                </div>
                <div className="card select-grp-opt mt-5">
                    <p className='select-grp-opt-heading'>Change Cover Image</p>
                    <div className="card-body px-md-4">
                        <div className="upload-grp-img">
                            <p className="para clr-text mb-1">
                                Drop your file here
                            </p>
                            <input className='d-none' type="file" name="" id="GroupCover" accept="image/*" onChange={handleCoverImageChange} />
                            <label htmlFor="GroupCover" className='px-4 secondary-btn btn'>Select Your File</label>
                            <div className="px-4">
                                {GrpCoverImg && (
                                    <>
                                        <Image className='coverimgdisplay ' src={GrpCoverImg} alt="Selected" width={500} height={500} />

                                        <button className='btn btn-outline-danger rounded-5 mt-3 mx-auto' onClick={() => setGrpCoverImg(null)}>Delete</button>
                                    </>
                                )}
                                {showGrpCoverImg && (
                                    <>
                                        <Image className='coverimgdisplay  ' loader={imgurl} src={showGrpCoverImg.url} alt="Selected" width={500} height={500} />

                                        <button className='btn btn-outline-danger rounded-5 mt-3 mx-auto' onClick={() => setshowGrpCoverImg(null)}>Delete</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>


                </div>


                <label htmlFor="" className='clr-text para mt-4 ms-2'>Change Group Name</label>
                <input type="text" value={grpName} onChange={(e) => { setgrpName(e.target.value) }} className='inp form-control py-2' name="" id="" />
                {error ? <> {grpName === '' ? <p className='text-danger para-sm ms-2 mb-0 mt-1'>Enter Your Group Name*</p> : ''} </> : ''}

                <label htmlFor="" className='clr-text para mt-3 ms-2'>Change Group Description</label>
                <textarea className='area border form-control' id="" value={grpDesc} cols="30" rows="5" onChange={(e) => { setgrpDesc(e.target.value) }}></textarea>
                {error ? <> {grpDesc === '' ? <p className='text-danger para-sm ms-2 mb-0 mt-1'>Enter Your Group Description*</p> : ''} </> : ''}


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
                <div className="card select-grp-opt mt-4">
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







                <div className="d-flex justify-content-end">
                    <button className='btn primary-btn mt-4' disabled={btnActive} type="submit"><p>Save Changes {isLoading ? <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span> : ''}</p></button>
                </div>
            </form>


        </>
    )
}

export default GroupSetting