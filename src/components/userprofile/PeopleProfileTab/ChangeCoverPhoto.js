'use client'
import { message } from 'antd';
import axios from 'axios';
import { deleteCookie } from 'cookies-next';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useContext, useRef, useState } from 'react'
import { APP_URL } from '../../../../config';
import { GetToken } from '@/utils/Token';
import { UserContext } from '@/app/UserProfileLayout';
import { useAppContext } from '@/context/AppContext';

const ChangeCoverPhoto = () => {
    const { UserProfiledata, UserProfileloader, authme } = useAppContext()
    const token = GetToken('userdetail')
    const { Userdata } = useContext(UserContext);
    const [isloading, setisloading] = useState(false)
    const [ProfileImage, setProfileImage] = useState('')
    const [ChangeCover, setChangeCover] = useState()
    const [btnActive, setbtnActive] = useState(false)
    const router = useRouter()
    const handleImageChange = (e) => {
        const formDataimg = new FormData();
        formDataimg.append('media', e.target.files[0]);
        const file = e.target.files[0];
        if (file) {

            const reader = new FileReader();
            reader.onload = () => {
                setProfileImage(reader.result);
                axios.post(`${APP_URL}/api/post-media`, formDataimg, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
                    .then(response => {
                        setChangeCover(response.data.data.last_inserted_id)
                        setbtnActive(true)
                    })
                    .catch(error => {
                        console.error(error);
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
    const ChangeProfile = (e) => {
        setisloading(true)
        e.preventDefault()
        axios.patch(`${APP_URL}/api/user/${Userdata?.data?.id}`, { cover_photo: ChangeCover.toString() }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                message.success(response.data?.message)
                router.push('/profile/activity')
                setisloading(false)
                authme()
            })
            .catch(error => {
                console.error(error);
                message.error(error?.response?.data?.message)
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
                setisloading(false)
                


            });
    }
    const DeleteProfile = (e) => {
        setisloading(true)
        e.preventDefault()
        axios.patch(`${APP_URL}/api/user/${Userdata?.data?.id}`, { cover_photo: 'null' }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                message.success(response.data?.message)
                router.push('/profile/activity')
                setisloading(false)
                authme()
            })
            .catch(error => {
                console.error(error);
                message.error(error?.response?.data?.message)
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
                setisloading(false)


            });
    }





    return (
        <>
            <p className="heading mt-3 clr-text">Change Cover</p>

            <div className="row">
                <div className="mt-3 profile-tabs underline-tab">
                    <ul className="peopletab nav nav-tabs border-0 border-b-0  " role="tablist">

                        <li className="nav-item nav-link text-center active" id="UploadCover-tab" data-bs-toggle="tab" data-bs-target="#UploadCover" type="button" role="tab" aria-controls="UploadCover" aria-selected="false" tabIndex="-1">
                            <p className="para clr-text mb-0">Upload Picture</p>
                        </li>


                        <li className="nav-item nav-link text-center" id="DeleteCoverPicture-tab" data-bs-toggle="tab" data-bs-target="#DeleteCoverPicture" type="button" role="tab" aria-controls="DeleteCoverPicture" aria-selected="false" tabIndex="-1">
                            <p className="para clr-text mb-0">Delete Picture</p>
                        </li>
                    </ul>
                </div>
                <div className="tab-content ">

                    <div className="tab-pane fade active show" id="UploadCover" role="tabpanel" aria-labelledby="UploadCover-tab">
                        <div className="row">
                            <div className="col">
                                <div className="card changeprofile-card mt-5">
                                    <div className="card-body py-5 mx-auto ">
                                        <input type="file" className='d-none' name="" id="UploadCoverimg" onChange={handleImageChange} />
                                        <p className="para-m clr-text mb-1">
                                            Drop your file here
                                        </p>
                                        <label htmlFor="UploadCoverimg" className='btn secondary-btn px-md-3'>Select Your File</label>
                                    </div>
                                </div>
                                {ProfileImage && (
                                    <>
                                        <div className='w-100 text-center img-preview mt-4'>
                                            <Image className='w-auto rounded-0 my-3 object-fit-cover max-w-100' src={ProfileImage} alt="Selected" height={500} width={100} />
                                        </div>
                                        <button className='btn primary-btn mt-4' disabled={!btnActive} onClick={ChangeProfile}><p>Save Changes {isloading ? <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span> : ''}</p></button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="tab-pane fade " id="DeleteCoverPicture" role="tabpanel" aria-labelledby="DeleteCoverPicture-tab">
                        <div className="row">
                            <div className="col">
                                <div className="card changeprofile-card mt-5">
                                    <div className="card-body py-5 mx-auto ">
                                        <button className='btn rounded-5 btn-outline-danger px-md-3' onClick={DeleteProfile}>Delete My Profile Photo {isloading ? <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span> : ''}</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangeCoverPhoto
