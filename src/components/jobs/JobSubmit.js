'use client'
import Image from 'next/image';
import React, { useState } from 'react'

const JobSubmit = () => {
    const [LogoImg, setLogoImg] = useState(null)
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setLogoImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <>
            <div className="activity-tabs mt-5">
                <ul className="nav nav-tabs border-0 " role="tablist">
                    <li className="nav-item nav-link active heading" id="JobDetails-tab" data-bs-toggle="tab" data-bs-target="#JobDetails" type="button" role="tab" aria-controls="JobDetails" aria-selected="false" tabIndex="-1">
                        Job Details
                    </li>

                </ul>
                <div className="tab-content ">
                    <div className="tab-pane fade active show job-detail" id="JobDetails" role="tabpanel" aria-labelledby="JobDetails-tab">
                        <div className='d-md-flex my-3'>
                            <label htmlFor="">Job Title</label>
                            <input type="text" name="" id="" className='form-control inp' />
                        </div>
                        <div className='d-md-flex my-3'>
                            <label htmlFor="" className=''>Location <span>(optional)</span></label>
                            <input type="text" name="" id="" className='form-control inp' />
                        </div>
                        <div className='d-md-flex my-3'>
                            <label htmlFor="" className=''>Remote Position <span>(optional)</span></label>
                            <input type="checkbox" name="" id="" className='form-check-input ' />
                        </div>
                        <div className='d-md-flex my-3'>
                            <label htmlFor="" className=''>Job type</label>
                            <select name="" className='slct form-select' id="">
                                <option value="">Freelance</option>
                                <option value="">Full Time</option>
                                <option value="">Internship</option>
                                <option value="">Part Time</option>
                                <option value="">Temporary</option>
                            </select>
                        </div>
                        <div className='d-md-flex my-3'>
                            <label htmlFor="" className=''>Description</label>
                            <textarea name="" className='area w-100 form-control' id="" cols="30" rows="10"></textarea>
                        </div>
                        <div className='d-md-flex my-3'>
                            <label htmlFor="" className=''>Application email/URL</label>
                            <input type="email" name="" id="" className='form-control inp' />
                        </div>
                    </div>



                </div>
            </div>
            <div className="activity-tabs mt-5">
                <ul className="nav nav-tabs border-0 " role="tablist">

                    <li className="nav-item nav-link active heading" id="Companydetails-tab" data-bs-toggle="tab" data-bs-target="#Companydetails" type="button" role="tab" aria-controls="Companydetails" aria-selected="false" tabIndex="-1">
                        Company details
                    </li>


                </ul>
                <div className="tab-content ">

                    <div className="tab-pane fade active show job-detail" id="Companydetails" role="tabpanel" aria-labelledby="Companydetails-tab">
                        <div className='d-md-flex my-3'>
                            <label htmlFor="">Company name</label>
                            <input type="text" name="" id="" className='form-control inp' />
                        </div>
                        <div className='d-md-flex my-3'>
                            <label htmlFor="" className=''>Website  <span>(optional)</span></label>
                            <input type="text" name="" id="" className='form-control inp' />
                        </div>
                        <div className='d-md-flex my-3'>
                            <label htmlFor="" className=''>Tagline <span>(optional)</span></label>
                            <input type="text" name="" id="" className='form-control inp' />
                        </div>
                        <div className='d-md-flex my-3'>
                            <label htmlFor="" className=''>Video  <span>(optional)</span></label>
                            <input type="text" name="" id="" className='form-control inp' />
                        </div>
                        <div className='d-md-flex my-3'>
                            <label htmlFor="" className=''>Twitter username <span>(optional)</span></label>
                            <input type="text" name="" id="" className='form-control inp' />
                        </div>
                        <div className='d-md-flex my-3'>
                            <label htmlFor="" className=''>Logo <span>(optional)</span></label>
                            <div className='w-100'>
                                <input type="file" name="" id="" className='form-control inp' onChange={handleImageChange} />
                                {LogoImg && (
                                    <div>
                                        <Image className='post-profile-xl rounded-0 my-3 object-fit-cover' src={LogoImg} alt="Selected" width={500} />
                                    </div>
                                )}
                            </div>
                        </div>

                        <button className='btn primary-btn px-md-5 px-2 me-3'><p>Preview</p></button>
                        <button className='btn secondary-btn px-md-5 px-2'>Save Draft</button>
                    </div>


                </div>
            </div>
        </>
    )
}

export default JobSubmit