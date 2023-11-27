'use client'
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { APP_URL } from '../../../../config';
import Link from 'next/link';
import Image from 'next/image';

const JobDetail = () => {
    const [Jobdata, setJobdata] = useState('')
    const { JobDetail } = useParams()
    useEffect(() => {
        axios.get(`${APP_URL}/api/job/${JobDetail}`)
            .then(response => {
                console.log('job slug', response);
                setJobdata(response.data.data)

            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    return (
        <>
            <div className="card n-card my-4 py-3 shadow-none" >
                <div className="row g-0">
                    <div className="col-lg-1 col-md-2 text-center my-auto">
                        <Image src="/assets/images/logo/company2.png" height={300} width={300} className="img-fluid rounded-start rounded-0 post-profile-lg" alt="..." />
                    </div>
                    <div className="col-lg col-md">
                        <div className="card-body">
                            <Link href={'#'} className="link-hov heading-m fw-bold text-black">{Jobdata.title}</Link>
                            <p className="card-text para clr-text my-3">{Jobdata.location}</p>
                            <p className="clr-primary para mb-0">{Jobdata.company_name}</p>

                        </div>
                    </div>
                    <div className="col-lg-2 col-md-3 profile-page-user  position-static ">
                        <div className="icons d-flex align-items-center  justify-content-evenly justify-content-md-end">
                            <div><Link href={`${Jobdata.website}`}><i class="bi bi-globe-americas text-white"></i></Link></div>
                            <div><Link href={`https://twitter.com/https://twitter.com/elonmusk`}><i class="bi bi-twitter text-white"></i></Link></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex mt-4 flex-wrap w-100">
                <div className="card w-100">
                    <div className="p-2 align-items-center d-flex">
                        <div className="col-md-4 col-3 d-flex align-items-center">
                            <div className="square-icon">
                                <i class="bi bi-briefcase-fill clr-text fw-bold "></i>
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
                                <i class="bi bi-geo-alt fw-bold clr-text"></i>
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
                {/* <video width="320" height="240" controls>
                    <source src="/https://youtu.be/WwTpfVQgkU0?si=OqqXV1rVIVh_Vr-u/video.mp4" type="video/mp4" />
                </video>
                <video src={'https://youtu.be/WwTpfVQgkU0?si=OqqXV1rVIVh_Vr-u/video.mp4'} width="320" height="240" controls ></video> */}

                <iframe width="100%" height="400" src="https://youtube.com/embed/WwTpfVQgkU0?si=OqqXV1rVIVh_Vr-u" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
            <div className='mt-4'>
                <p className="heading clr-text">
                    Job Description:
                </p>
                <p className="para  clr-text">
                    {Jobdata.description}
                </p>
            </div>
            <button class="btn secondary-btn " type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                Apply For Job
            </button>
            <div class="collapse my-3" id="collapseExample">
                <div class="card card-body ">
                    <div className="d-flex flex-wrap">
                        <p className="para clr-text  mb-0">To apply for this job email your details to &nbsp;</p> <Link href={`mailto:${Jobdata.email_url}`} className='link-hov para clr-primary' > {Jobdata.email_url}</Link>
                    </div>
                </div>
            </div>

        </>
    )
}

export default JobDetail