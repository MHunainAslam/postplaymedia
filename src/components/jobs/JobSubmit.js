'use client'
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { APP_URL } from '../../../config';
import { message } from 'antd';
import Editor from '../Editor';

const JobSubmit = () => {
    const [LogoImg, setLogoImg] = useState(null)
    const [JobTitle, setJobTitle] = useState('')
    const [CityLocation, setCityLocation] = useState('')
    const [CountryLocation, setCountryLocation] = useState('')
    const [RemotePosition, setRemotePosition] = useState(false)
    const [JobType, setJobType] = useState('')
    const [JobCategory, setJobCategory] = useState('')
    const [JobDesc, setJobDesc] = useState('')
    const [ApplicationUrl, setApplicationUrl] = useState('')
    const [CompanyName, setCompanyName] = useState('')
    const [Website, setWebsite] = useState('')
    const [TagLine, setTagLine] = useState('')
    const [Video, setVideo] = useState('')
    const [TwitterUsername, setTwitterUsername] = useState('')
    const [isLoading, setisLoading] = useState(false)
    const [Error, setError] = useState(false)

    const [editorLoaded, setEditorLoaded] = useState(false);


    useEffect(() => {
        setEditorLoaded(true);
    }, []);
   console.log(JobDesc)

    const UserName = (JSON.parse(localStorage.getItem('userdetail'))?.response?.data?.data?.name)
    const formData = new FormData();
    formData.append('image_id', '1');
    formData.append('title', JobTitle);
    formData.append('category_id', JobCategory);
    formData.append('location', CityLocation + ' ' + CountryLocation);
    formData.append('remote_postion', RemotePosition);
    formData.append('job_type', JobType);
    formData.append('description', JobDesc);
    formData.append('email_url', ApplicationUrl);
    formData.append('company_name', CompanyName);
    formData.append('website', Website);
    formData.append('tagline', TagLine);
    formData.append('video', Video);
    formData.append('twitter_username', TwitterUsername);
    formData.append('created_by', UserName);
    const SubmitJob = (e) => {
        e.preventDefault()
        if (JobTitle === '' || JobType === '' || JobDesc === '' || ApplicationUrl === '' || CompanyName === '') {
            setError(true)
        }
        else {
            setisLoading(true)
            // console.log(UserName, Email, Password, C_Password, Name, MemberType)
            axios.post(`${APP_URL}/api/jobs-post`,
                // { title: JobTitle, category_id: JobCategory, location: CityLocation + ' ' + CountryLocation, remote_postion: RemotePosition ? 'yes' : 'no', job_type: JobType, description: JobDesc, email_url: ApplicationUrl, company_name: CompanyName, website: Website, tagline: TagLine, video: Video, twitter_username: TwitterUsername, created_by: UserName, formData }
                formData
            )
                .then(response => {
                    // Handle successful response here
                    // message.success(response.data.message)
                    console.log(response.data);


                    setisLoading(false)
                })
                .catch(error => {
                    // Handle error here
                    // message.error(error.data.message)
                    console.error(error);
                    setisLoading(false)
                });

            setError(false)
        }
    }



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
            <form action="" onSubmit={SubmitJob}>
                <div className="activity-tabs mt-5">
                    <ul className="nav nav-tabs border-0 " role="tablist">
                        <li className="nav-item nav-link active heading" id="JobDetails-tab" data-bs-toggle="tab" data-bs-target="#JobDetails" type="button" role="tab" aria-controls="JobDetails" aria-selected="false" tabIndex="-1">
                            Job Details
                        </li>

                    </ul>
                    <div className="tab-content ">
                        <div className="tab-pane fade active show job-detail" id="JobDetails" role="tabpanel" aria-labelledby="JobDetails-tab">

                            <div className='d-md-flex my-3'>
                                <label htmlFor="" className='col-md-2'>Job Title</label>
                                <div className="col">
                                    <input type="text" name="" id="" className='form-control inp col-m' value={JobTitle} onChange={(e) => setJobTitle(e.target.value)} />
                                    {Error ? JobTitle === '' ? <p className='mb-0 para text-danger'>Required*</p> : '' : ''}
                                </div>
                            </div>
                            <div className='d-md-flex my-3'>
                                <label htmlFor="" className='col-md-2'>Location <span>(optional)</span></label>
                                <input type="text" name="" id="" className='form-control inp me-md-2 mb-2 mb-md-0' value={CityLocation} onChange={(e) => setCityLocation(e.target.value)} />
                                <input type="text" name="" id="" className='form-control inp' value={CountryLocation} onChange={(e) => setCountryLocation(e.target.value)} />
                            </div>
                            <div className='d-md-flex my-3'>
                                <label htmlFor="" className='col-md-2'>Remote Position <span>(optional)</span></label>
                                <input type="checkbox" name="" id="" className='form-check-input ms-md-0 ms-3' checked={RemotePosition} onChange={(e) => setRemotePosition(!RemotePosition)} />
                            </div>
                            <div className='d-md-flex my-3'>
                                <label htmlFor="" className='col-md-2'>Job type</label>
                                <div className="col">
                                    <select name="" className='slct form-select' id="" value={JobType} onChange={(e) => setJobType(e.target.value)}>
                                        <option value="" selected hidden>-- Select Job Type --</option>
                                        <option value="Freelance">Freelance</option>
                                        <option value="Fulltime">Full Time</option>
                                        <option value="Internship">Internship</option>
                                        <option value="Parttime">Part Time</option>
                                        <option value="Temporary">Temporary</option>
                                    </select>
                                    {Error ? JobType === '' ? <p className='mb-0 para text-danger'>Required*</p> : '' : ''}
                                </div>
                            </div>
                            <div className='d-md-flex my-3'>
                                <label htmlFor="" className='col-md-2'>Job Category</label>
                                <div className="col">
                                    <select name="" className='slct form-select' id="" value={JobCategory} onChange={(e) => setJobCategory(e.target.value)}>
                                        <option value="" selected hidden>-- Select Category --</option>
                                        <option value="cricket">Cricket</option>
                                        <option value="football">Foot Ball</option>
                                    </select>
                                    {Error ? JobCategory === '' ? <p className='mb-0 para text-danger'>Required*</p> : '' : ''}
                                </div>
                            </div>
                            <div className='d-md-flex my-3'>
                                <label htmlFor="" className='col-md-2'>Description</label>
                                <div className="col">
                                    <Editor
                                        name="description"
                                        onChange={(data) => {
                                            setJobDesc(data);
                                        }}
                                        editorLoaded={editorLoaded}
                                    />
                                    {/* <textarea name="" className='area w-100 form-control' id="" cols="30" rows="10" value={JobDesc} onChange={(e) => setJobDesc(e.target.value)}></textarea> */}
                                    {Error ? JobDesc === '' ? <p className='mb-0 para text-danger'>Required*</p> : '' : ''}
                                </div>
                            </div>
                            <div className='d-md-flex my-3'>
                                <label htmlFor="" className='col-md-2'>Application email/URL</label>
                                <div className="col">
                                    <input type="email" name="" id="" className='form-control inp' value={ApplicationUrl} onChange={(e) => setApplicationUrl(e.target.value)} />
                                    {Error ? ApplicationUrl === '' ? <p className='mb-0 para text-danger'>Required*</p> : '' : ''}
                                </div>
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
                                <label htmlFor="" className='col-md-2'>Company name</label>
                                <div className='col'>
                                    <input type="text" name="" id="" className='form-control inp' value={CompanyName} onChange={(e) => setCompanyName(e.target.value)} />
                                    {Error ? CompanyName === '' ? <p className='mb-0 para text-danger'>Required*</p> : '' : ''}
                                </div>
                            </div>
                            <div className='d-md-flex my-3'>
                                <label htmlFor="" className='col-md-2'>Website  <span>(optional)</span></label>
                                <input type="url" name="" id="" className='form-control inp' value={Website} onChange={(e) => setWebsite(e.target.value)} />
                            </div>
                            <div className='d-md-flex my-3'>
                                <label htmlFor="" className='col-md-2'>Tagline <span>(optional)</span></label>
                                <input type="text" name="" id="" className='form-control inp' value={TagLine} onChange={(e) => setTagLine(e.target.value)} />
                            </div>
                            <div className='d-md-flex my-3'>
                                <label htmlFor="" className='col-md-2'>Video  <span>(optional)</span></label>
                                <input type="url" name="" id="" className='form-control inp' value={Video} onChange={(e) => setVideo(e.target.value)} />
                            </div>
                            <div className='d-md-flex my-3'>
                                <label htmlFor="" className='col-md-2'>Twitter username <span>(optional)</span></label>
                                <input type="text" name="" id="" className='form-control inp' value={TwitterUsername} onChange={(e) => setTwitterUsername(e.target.value)} />
                            </div>
                            <div className='d-md-flex my-3'>
                                <label htmlFor="" className='col-md-2'>Logo <span>(optional)</span></label>
                                <div className='w-100'>
                                    <input type="file" name="" id="" className='form-control inp' onChange={handleImageChange} />
                                    {LogoImg && (
                                        <div>
                                            <Image className='post-profile-xl rounded-0 my-3 object-fit-cover' src={LogoImg} alt="Selected" height={100} width={500} />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button className='btn primary-btn px-md-5 px-2 me-3'><p>Preview</p></button>
                            <button className='btn secondary-btn px-md-5 px-2'>Save Draft</button>
                        </div>


                    </div>
                </div>
            </form>
        </>
    )
}

export default JobSubmit