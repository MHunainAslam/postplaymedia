'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const AllJobs = () => {
    const [Filter, setFilter] = useState(false)
    const [Freelance, setFreelance] = useState(false)
    const [FullTime, setFullTime] = useState(false)
    const [Internship, setInternship] = useState(false)
    const [PartTime, setPartTime] = useState(false)
    const [Temporary, setTemporary] = useState(false)

    return (
        <>
            <div className="border-bottom row justify-content-between">
                <div className="col-sm-8 col-lg-6">
                    <form className="  my-3">
                        <div className="d-flex">
                            <input type="text" className="form-control inp me-2 " placeholder="keywords" aria-label="Username" />
                            <input type="text" className="form-control inp me-2 " placeholder="Location" aria-label="Username" />
                            <button className='btn primary-btn rounded-5 '><p><i className="bi bi-search"></i></p></button>
                        </div>
                    </form>
                </div>
                <div className="col-sm-4 col-lg-6 my-3 text-sm-end">
                    <button className='btn secondary-btn px-4' onClick={() => { setFilter(!Filter) }}><i className="bi bi-sliders2-vertical" ></i> Filter</button>
                </div>
                {Filter ?
                    <div className="border-top row justify-content-between">
                        <div className="d-flex py-3 justify-content-center flex-wrap">
                            <div className='mx-2'>
                                <input className=' form-check-input' type="checkbox" name="" id="Freelance" value={'freelance'} onChange={(e => { setFreelance(!Freelance) })} checked={Freelance}/>
                                <label className='para clr-text ms-2' htmlFor="Freelance">Freelance</label>
                            </div>
                            <div className='mx-2'>
                                <input className=' form-check-input' type="checkbox" name="" id="FullTime" value={'FullTime'} onChange={(e => { setFullTime(!FullTime) })} checked={FullTime}/>
                                <label className='para clr-text ms-2' htmlFor="FullTime">Full Time</label>
                            </div>
                            <div className='mx-2'>
                                <input className=' form-check-input' type="checkbox" name="" id="Internship" value={'Internship'} onChange={(e => { setInternship(!Internship) })} checked={Internship}/>
                                <label className='para clr-text ms-2' htmlFor="Internship">Internship</label>
                            </div>
                            <div className='mx-2'>
                                <input className=' form-check-input' type="checkbox" name="" id="PartTime" value={'PartTime'} onChange={(e => { setPartTime(!PartTime) })} checked={PartTime}/>
                                <label className='para clr-text ms-2' htmlFor="PartTime">Part Time</label>
                            </div>
                            <div className='mx-2'>
                                <input className=' form-check-input' type="checkbox" name="" id="Temporary" value={'Temporary'}  onChange={(e => { setTemporary(!Temporary) })} checked={Temporary}/>
                                <label className='para clr-text ms-2' htmlFor="Temporary">Temporary</label>
                            </div>
                        </div>
                    </div>
                    : ''}
            </div>
            <div className="card n-card my-4 py-3 " >
                <div className="row g-0">
                    <div className="col-lg-1 col-md-2 text-center my-auto">
                        <Image src="/assets/images/logo/company1.png" width={300} height={300} className="img-fluid rounded-start rounded-0 post-profile-lg" alt="..." />
                    </div>
                    <div className="col-lg col-md">
                        <div className="card-body">
                            <Link href={'#'} className="link-hov heading-m fw-bold text-black">Marketing Data Enrichment Specialist</Link>
                            <p className="card-text para clr-text my-3">3rd street, Perm, Russia</p>
                            <p className="clr-primary para mb-0">Clinivex Analytics</p>

                        </div>
                    </div>
                    <div className="col-lg-2 col-md-3 job-card-btn px-4 ">
                        <p className=''>Full Time</p>
                    </div>
                </div>
            </div>
            <div className="card n-card my-4 py-3 " >
                <div className="row g-0">
                    <div className="col-lg-1 col-md-2 text-center my-auto">
                        <Image src="/assets/images/logo/company2.png" height={300} width={300} className="img-fluid rounded-start rounded-0 post-profile-lg" alt="..." />
                    </div>
                    <div className="col-lg col-md">
                        <div className="card-body">
                            <Link href={'#'} className="link-hov heading-m fw-bold text-black"> Software Quality Assurance Engineer</Link>
                            <p className="card-text para clr-text my-3">4901 Lakeland Park Drive, GA, USA</p>
                            <p className="clr-primary para mb-0">iSoft Nations</p>

                        </div>
                    </div>
                    <div className="col-lg-2 col-md-3 job-card-btn px-4 ">
                        <p className=''>Full Time</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllJobs