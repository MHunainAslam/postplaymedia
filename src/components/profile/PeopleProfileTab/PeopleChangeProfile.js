'use client'
import Image from 'next/image';
import React, { useRef, useState } from 'react'

const PeopleChangeProfile = () => {
    const [ProfileImage, setProfileImage] = useState('')
    const handleImageChange = (e) => {

        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImage(reader.result);
                console.log(e.target.files[0])

            };
            reader.readAsDataURL(file);
        }
    };


    const [imageSrc, setImageSrc] = useState('');
    const videoRef = useRef();

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
        } catch (error) {
            console.error('Error accessing the camera:', error);
        }
    };

    const takePicture = () => {
        const video = videoRef.current;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);

        const imgData = canvas.toDataURL('image/png');
        setImageSrc(imgData);
    };
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
                            <p className="para clr-text mb-0">Take Picture</p>
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
                                    <div className='w-100 text-center '>
                                        <Image className=' rounded-0 my-3 object-fit-cover max-w-100' src={ProfileImage} alt="Selected" height={500} width={500} />
                                    </div>
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
                                            <button onClick={startCamera}>Start Camera</button>
                                            <button onClick={takePicture}>Take Picture</button>
                                            <video ref={videoRef} autoPlay />
                                            {imageSrc && <img src={imageSrc} alt="Captured" />}
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
                                        <button className='btn rounded-5 btn-outline-danger px-md-3'>Delete My Profile Photo</button>
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