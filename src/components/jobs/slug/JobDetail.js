'use client'
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { APP_URL, IMG_URL } from '../../../../config';
import Link from 'next/link';
import Image from 'next/image';
import { GetToken } from '@/utils/Token';
import { deleteCookie } from 'cookies-next';
import Loader from '@/components/Loader';

const JobDetail = () => {
    const token = GetToken('userdetail')
    const [Jobdata, setJobdata] = useState('')
    const [isLoading, setisLoading] = useState(true)
    const { JobDetail } = useParams()
    const router = useRouter()
    useEffect(() => {
        axios.get(`${APP_URL}/api/job/${JobDetail}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('job slug', response);
                setJobdata(response.data.data)
                setisLoading(false)
            })
            .catch(error => {
                console.error(error);
                setisLoading(false)
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }, [])
    const imgurl = ({ src }) => {
        return `${IMG_URL}${src}`
    }

    return (
        <div className='position-relative'>
            {isLoading ? <Loader /> :
                <>
                    <div className="card n-card my-4 py-3 shadow-none" >
                        <div className="row g-0">
                            <div className="col-lg-1 col-md-2 text-center my-auto">
                                <Image loader={Jobdata.image === null ? '' : imgurl} src={`${Jobdata.image === null ? '/assets/images/avatar/img.png' : Jobdata?.image?.url}`} height={300} width={300} className="img-fluid rounded-start rounded-0 post-profile-lg" alt="..." />
                            </div>
                            <div className="col-lg col-md">
                                <div className="card-body">
                                    <Link href={'#'} className="link-hov heading-m fw-bold text-black">{Jobdata.title} ss</Link>
                                    <p className="card-text para clr-text my-3">{Jobdata.location}</p>
                                    <p className="clr-primary para mb-0">{Jobdata.company_name}</p>

                                </div>
                            </div>
                            <div className="col-lg-2 col-md-3 profile-page-user  position-static ">
                                <div className="icons d-flex align-items-center  justify-content-evenly justify-content-md-end">
                                    {Jobdata.website ?
                                        <div><Link href={`${Jobdata.website}`}><i className="bi bi-globe-americas text-white"></i></Link></div> : ''}
                                    {Jobdata.twitter_username ?
                                        <div><Link href={`${Jobdata.twitter_username}`}><i className="bi bi-twitter text-white"></i></Link></div> : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex mt-4 flex-wrap w-100">
                        <div className="card w-100">
                            <div className="p-2 align-items-center d-flex">
                                <div className="col-md-4 col-3 d-flex align-items-center">
                                    <div className="square-icon">
                                        <i className="bi bi-briefcase-fill clr-text fw-bold "></i>
                                    </div>
                                    <p className="para clr-text mb-0 ms-3">
                                        Job Type
                                    </p>
                                </div>
                                <div className="col-md-8 col-md-9">
                                    <p className="para clr-text mb-0">
                                        {Jobdata.job_type}
                                    </p>
                                </div>
                            </div>
                            <div className="border-bottom"></div>
                            <div className="p-2 align-items-center d-flex">
                                <div className="col-md-4 col-3 d-flex align-items-center">
                                    <div className="square-icon">
                                        <i className="bi bi-geo-alt fw-bold clr-text"></i>
                                    </div>
                                    <p className="para clr-text mb-0 ms-3">
                                        Location
                                    </p>
                                </div>
                                <div className="col-md-8 col-md-9">
                                    <p className="para clr-text mb-0">
                                        {Jobdata.location}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5 col-md-6 '>
                        {Jobdata?.video === null ? '' :
                            <video width="640" height="380" src={` ${IMG_URL + Jobdata?.video?.url}`} controls> Sorry, your browser doesnt support HTML5 <code>video</code>, but you can download this video from the <a href="https://archive.org/details/Popeye_forPresident" target="_blank">Internet Archive</a>. </video>
                        }

                    </div>
                    <div className='mt-4'>
                        <p className="heading clr-text">
                            Job Description:
                        </p>
                        <div className="jobdesc" dangerouslySetInnerHTML={{ __html: Jobdata.description }}>
                            {/* {Jobdata.description} */}
                        </div>
                    </div>
                    <button className="btn secondary-btn " type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        Apply For Job
                    </button>
                    <div className="collapse my-3" id="collapseExample">
                        <div className="card card-body ">
                            <div className="d-flex flex-wrap">
                                <p className="para clr-text  mb-0">To apply for this job email your details to &nbsp;</p> <Link href={`mailto:${Jobdata.email_url}`} className='link-hov para clr-primary' > {Jobdata.email_url}</Link>
                            </div>
                        </div>
                    </div>

                </>
            }
        </div>
    )
}

export default JobDetail