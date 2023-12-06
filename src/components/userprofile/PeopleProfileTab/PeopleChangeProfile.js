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
import Webcam from 'react-webcam'
const WebcamComponent = () => <Webcam />
const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: 'user',
}

const PeopleChangeProfile = () => {
    const token = GetToken('userdetail')
    const { Userdata } = useContext(UserContext);
    const [isloading, setisloading] = useState(false)
    const [ProfileImage, setProfileImage] = useState('')
    const [ChangeDP, setChangeDP] = useState()
    const router = useRouter()
    const handleImageChange = (e) => {
        const formDataimg = new FormData();
        formDataimg.append('media', e.target.files[0]);
        const file = e.target.files[0];
        if (file) {

            const reader = new FileReader();
            reader.onload = () => {
                setProfileImage(reader.result);
                console.log(e.target.files[0])
                axios.post(`${APP_URL}/api/post-media`, formDataimg, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
                    .then(response => {
                        console.log('img', response);
                        setChangeDP(response.data.data.last_inserted_id)

                    })
                    .catch(error => {
                        console.error(error);
                        message.error(error?.response.data?.message)
                        if (error.response.status === 401) {
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
        axios.patch(`${APP_URL}/api/user/${Userdata?.data?.id}`, { profile_photo: ChangeDP?.toString() }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('profile edit', response);
                message.success(response.data?.message)
                router.push('/profile/activity')
                setisloading(false)
            })
            .catch(error => {
                console.error(error);
                message.error(error?.response?.data?.message)
                if (error.response.status === 401) {
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
        axios.patch(`${APP_URL}/api/user/${Userdata?.data?.id}`, { profile_photo: 'null' }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('profile edit', response);
                message.success(response.data?.message)
                router.push('/profile/activity')
                setisloading(false)
            })
            .catch(error => {
                console.error(error);
                message.error(error?.response?.data?.message)
                if (error.response.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
                setisloading(false)


            });
    }



    const [picture, setPicture] = useState('')
    const webcamRef = React.useRef(null)
    const capture = React.useCallback(() => {
        const pictureSrc = webcamRef.current.getScreenshot()
        setPicture(pictureSrc)
    })



    return (
        <>
            <p className="heading mt-3 clr-text">Change Profile</p>

            <div className="row">
                <div className="mt-3 profile-tabs underline-tab">
                    <ul className="peopletab nav nav-tabs border-0 border-b-0  " role="tablist">

                        <li className="nav-item nav-link text-center active" id="UploadProfile-tab" data-bs-toggle="tab" data-bs-target="#UploadProfile" type="button" role="tab" aria-controls="UploadProfile" aria-selected="false" tabIndex="-1">
                            <p className="para clr-text mb-0">Upload Picture</p>
                        </li>

                        <li className="nav-item nav-link text-center" id="TakePicture-tab" data-bs-toggle="tab" data-bs-target="#TakePicture" type="button" role="tab" aria-controls="TakePicture" aria-selected="false" tabIndex="-1">
                            <p className="para clr-text mb-0">Take Picture </p>
                        </li>
                        <li className="nav-item nav-link text-center" id="DeletePicture-tab" data-bs-toggle="tab" data-bs-target="#DeletePicture" type="button" role="tab" aria-controls="DeletePicture" aria-selected="false" tabIndex="-1">
                            <p className="para clr-text mb-0">Delete Picture</p>
                        </li>
                    </ul>
                </div>
                <div className="tab-content ">

                    <div className="tab-pane fade active show" id="UploadProfile" role="tabpanel" aria-labelledby="UploadProfile-tab">
                        <div className="row">
                            <div className="col">
                                <div className="card changeprofile-card mt-5">
                                    <div className="card-body py-5 mx-auto ">
                                        <input type="file" className='d-none' name="" id="uploadprofileimg" onChange={handleImageChange} />
                                        <p className="para-m clr-text mb-1">
                                            Drop your file here
                                        </p>
                                        <label htmlFor="uploadprofileimg" className='btn secondary-btn px-md-3'>Select Your File</label>
                                    </div>
                                </div>
                                {ProfileImage && (
                                    <>
                                        <div className='w-100 text-center img-preview mt-4'>
                                            <Image className=' rounded-0 my-3 object-fit-cover max-w-100' src={ProfileImage} alt="Selected" height={500} width={500} />
                                        </div>
                                        <button className='btn primary-btn mt-4' onClick={ChangeProfile}><p>Save Changes {isloading ? <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span> : ''}</p></button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade " id="TakePicture" role="tabpanel" aria-labelledby="TakePicture-tab">
                        <div className="row">
                            <div className="col">
                                <div className="card changeprofile-card mt-5">
                                    <div className="card-body py-5 mx-auto ">
                                        <button className='btn secondary-btn px-md-3'><i className="bi bi-camera me-2"></i> Take A Picture</button>
                                        <div>
                                            <h2 className="mb-5 text-center">
                                                React Photo Capture using Webcam Examle
                                            </h2>
                                            <div>
                                                {picture == '' ? (
                                                    <Webcam
                                                        audio={false}
                                                        height={400}
                                                        ref={webcamRef}
                                                        width={400}
                                                        screenshotFormat="image/jpeg"
                                                        videoConstraints={videoConstraints}
                                                    />
                                                ) : (
                                                    <img src={picture} />
                                                )}
                                            </div>
                                            <div>
                                                {picture != '' ? (
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            setPicture()
                                                        }}
                                                        className="btn btn-primary"
                                                    >
                                                        Retake
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            capture()
                                                        }}
                                                        className="btn btn-danger"
                                                    >
                                                        Capture
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade " id="DeletePicture" role="tabpanel" aria-labelledby="DeletePicture-tab">
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

export default PeopleChangeProfile