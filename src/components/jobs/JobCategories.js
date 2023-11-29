'use client'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { APP_URL } from '../../../config'
import Loader from '../Loader'

const JobCategories = ({ JobCategory, CatisLoader, SearchCategory, setSearchCategory }) => {
    const [Filter, setFilter] = useState(false)
    const [Freelance, setFreelance] = useState(false)
    const [FullTime, setFullTime] = useState(false)
    const [Internship, setInternship] = useState(false)
    const [PartTime, setPartTime] = useState(false)
    const [Temporary, setTemporary] = useState(false)
    const [JobByCat, setJobByCat] = useState([])



    return (
        <>

            <div className="border-bottom row justify-content-between">
                <div className="col-sm-8 col-lg-6">
                    <form className="  my-3">
                        <div className="d-flex">
                            <input type="text" className="form-control inp me-2 " placeholder="keywords" aria-label="Username" value={SearchCategory} onChange={(e) => { setSearchCategory(e.target.value) }} />
                            <input type="text" className="form-control inp me-2 " placeholder="Location" aria-label="Username" />
                            <button className='btn primary-btn rounded-5 '><p><i className="bi bi-search"></i></p></button>
                        </div>
                    </form>
                </div>
                {/* <div className="col-sm-4 col-lg-6 my-3 text-sm-end">
                    <button className='btn secondary-btn px-4' onClick={() => { setFilter(!Filter) }}><i className="bi bi-sliders2-vertical" ></i> Filter</button>
                </div> */}
                {Filter ?
                    <div className="border-top row justify-content-between">
                        <div className="d-flex py-3 justify-content-center flex-wrap">
                            <div className='mx-2'>
                                <input className=' form-check-input' type="checkbox" name="" id="Freelance" value={'freelance'} onChange={(e => { setFreelance(!Freelance) })} checked={Freelance} />
                                <label className='para clr-text ms-2' htmlFor="Freelance">Freelance</label>
                            </div>
                            <div className='mx-2'>
                                <input className=' form-check-input' type="checkbox" name="" id="FullTime" value={'FullTime'} onChange={(e => { setFullTime(!FullTime) })} checked={FullTime} />
                                <label className='para clr-text ms-2' htmlFor="FullTime">Full Time</label>
                            </div>
                            <div className='mx-2'>
                                <input className=' form-check-input' type="checkbox" name="" id="Internship" value={'Internship'} onChange={(e => { setInternship(!Internship) })} checked={Internship} />
                                <label className='para clr-text ms-2' htmlFor="Internship">Internship</label>
                            </div>
                            <div className='mx-2'>
                                <input className=' form-check-input' type="checkbox" name="" id="PartTime" value={'PartTime'} onChange={(e => { setPartTime(!PartTime) })} checked={PartTime} />
                                <label className='para clr-text ms-2' htmlFor="PartTime">Part Time</label>
                            </div>
                            <div className='mx-2'>
                                <input className=' form-check-input' type="checkbox" name="" id="Temporary" value={'Temporary'} onChange={(e => { setTemporary(!Temporary) })} checked={Temporary} />
                                <label className='para clr-text ms-2' htmlFor="Temporary">Temporary</label>
                            </div>
                        </div>
                    </div>
                    : ''}
            </div>
            <div className="row position-relative" >
                {CatisLoader ? <Loader /> :
                    <>
                        {JobCategory?.data?.data.length === 0 ? <div className='text-center heading-m text-black my-5'>No Result Found </div> :
                            <>
                                {JobCategory?.data?.data?.map((item, i) => (
                                    <div className="col-lg-4 col-md-6" key={i}>
                                        <div className="card n-card my-4 py-3 "  >
                                            <div className="card-body text-center">
                                                <Link className='link-hov' href={`category/${item.id}`}>
                                                    <p className="heading mb-0 clr-text text-capitalize">{item.name}</p>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        }
                    </>}
            </div>

        </>
    )
}


export default JobCategories