'use client'
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { APP_URL } from '../../../config';
import { DatePicker, message } from 'antd';
import Editor from '../Editor';
import AddCategory from './AddCategory';
import { GetToken } from '@/utils/Token';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

const JobEdit = ({ JobCategorydd, handleComponentChange, JobId }) => {
    const token = GetToken('userdetail')
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
    const [ImgId, setImgId] = useState('')
    const [Error, setError] = useState(false)
    const [UserName, setUserName] = useState('')
    const [Expdate, setExpdate] = useState('')

    const [editorLoaded, setEditorLoaded] = useState(false);

    const router = useRouter()


    useEffect(() => {
        setEditorLoaded(true);
    }, []);


    useEffect(() => {
        setUserName(JSON.parse(localStorage.getItem('userdetail'))?.response?.data?.data?.name)
    }, [])




    const SubmitJob = (e) => {
        e.preventDefault()
        if (JobTitle === '' || JobType === '' || JobDesc === '' || ApplicationUrl === '' || CompanyName === '') {
            setError(true)
        }
        else {
            setisLoading(true)
            axios.put(`${APP_URL}/api/job/${JobId}/update`,
                { title: JobTitle, category_id: JobCategory, location: CityLocation + ' ' + CountryLocation, remote_postion: RemotePosition ? 'yes' : 'no', job_type: JobType, description: JobDesc, email_url: ApplicationUrl, company_name: CompanyName, website: Website, tagline: TagLine, video: Video, twitter_username: TwitterUsername, created_by: UserName, image_id: ImgId, expiry_date: Expdate }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
                // formData
            )
                .then(response => {
                    // Handle successful response here
                    // message.success(response.data.message)
                    setisLoading(false)
                    document.getElementById('AllJobs-tab').click()
                    handleComponentChange('table')
                    setJobTitle('')
                    setJobCategory('')
                    setCityLocation('')
                    setCountryLocation('')
                    setRemotePosition(false)
                    setJobType('')
                    setJobDesc('')
                    setApplicationUrl('')
                    setCompanyName('')
                    setWebsite('')
                    setTagLine('')
                    setVideo('')
                    setTwitterUsername('')
                    setImgId('')


                })
                .catch(error => {

                    message.error(error.response.data.message)
                    console.error(error);
                    setisLoading(false)
                    if (error?.response?.status === 401) {
                        router.push('/')
                        deleteCookie('logged');
                        localStorage.removeItem('userdetail')
                    }
                });

            setError(false)
        }
    }

    const handleImageChange = (e) => {
        const formDataimg = new FormData();
        formDataimg.append('media', e.target.files[0]);
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setLogoImg(reader.result);
                axios.post(`${APP_URL}/api/post-media`, formDataimg, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
                    .then(response => {
                        setImgId(response.data.data.last_inserted_id)
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
    const handleVideoChange = (e) => {
        const formDataVideo = new FormData();
        formDataVideo.append('media', e.target.files[0]);
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                axios.post(`${APP_URL}/api/post-media`, formDataVideo, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
                    .then(response => {
                        setVideo(response?.data?.data?.last_inserted_id)
                        message.success(response?.data?.message)

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
    const addcat = (e) => {
        if (e.target.value === 'addcat') {
            document.querySelector('.addcat').click()
        } else {
            setJobCategory(e.target.value)
        }
    }
    const onChange = (date, dateString) => {
        setExpdate(date)
    };
    return (
        <>
            <form action="" onSubmit={SubmitJob}>
                <div className="activity-tabs mt-5">
                    <ul className="nav nav-tabs border-0 justify-content-between " role="tablist">
                        <li className="nav-item nav-link active heading" id="JobDetails-tab" data-bs-toggle="tab" data-bs-target="#JobDetails" type="button" role="tab" aria-controls="JobDetails" aria-selected="false" tabIndex="-1">
                            Job Details
                        </li>
                        <li>
                            <button type='button' className='btn secondary-btn px-md-5 px-2' onClick={() => handleComponentChange('table')}>Cancel</button>
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
                                <input type="text" name="" id="" placeholder='City' className='form-control inp me-md-2 mb-2 mb-md-0' value={CityLocation} onChange={(e) => setCityLocation(e.target.value)} />
                                <input type="text" name="" id="" placeholder='Country' className='form-control inp' value={CountryLocation} onChange={(e) => setCountryLocation(e.target.value)} />
                            </div>
                            <div className='d-md-flex my-3'>
                                <label htmlFor="" className='col-md-2'>Expires At</label>
                                {/* <input type="text" name="" id="" className='form-control inp' value={Expdate} onChange={(e) => setExpdate(e.target.value)} /> */}
                                <div className="col">
                                    <DatePicker onChange={onChange} className='inp' />
                                    {Error ? Expdate === '' ? <p className='mb-0 para text-danger'>Required*</p> : '' : ''}
                                </div>
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
                                    <select name="" className='slct form-select' id="" value={JobCategory} onChange={addcat}>
                                        <option value="" selected hidden>-- Select Category --</option>
                                        {JobCategorydd?.data?.data?.map((item, i) => (
                                            <>
                                                <option value={item.id}>{item.name}</option>
                                            </>
                                        ))}
                                        <option value="addcat" >Add Category</option>
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
                                <label htmlFor="" className='col-md-2'>Application email</label>
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
                                <input type="file" name="" id="" className='form-control inp' onChange={handleVideoChange} />
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
                            <button type='button' className='btn secondary-btn px-md-5 px-2' onClick={() => handleComponentChange('table')}>Cancel</button>
                        </div>


                    </div>
                </div>
            </form>
            <AddCategory />
        </>
    )
}

export default JobEdit