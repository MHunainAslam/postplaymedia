'use client'
import { DatePicker } from 'antd'
import React, { useState } from 'react'

const PeopleProfileEdit = () => {
    const [Name, setName] = useState('')
    const [MemberType, setMemberType] = useState('')
    const [Country, setCountry] = useState('')
    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };
    return (
        <>
            <p className="heading mt-3 clr-text">Edit Profile</p>

            <div className="border-bottom mb-4"></div>

            <form action="" className='job-detail'>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-md-2'>Name <span>(Required)</span></label>
                    <div className="col">
                        <input type="text" name="" id="" className='form-control inp col-m' value={Name} onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-md-2'>Member Type <span>(Required)</span></label>
                    <div className="col">
                        <select name="" className='slct form-select' id="" value={MemberType} onChange={(e) => setMemberType(e.target.value)}>
                            <option value="student">Student</option>
                            <option value="coach">coach</option>
                        </select>
                    </div>
                </div>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-md-2'>Date of Birth <span>(Required)</span></label>
                    <div className="col">
                        <DatePicker onChange={onChange} className='inp' />
                    </div>
                </div>

                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-md-2'>Sex <span>(Required)</span></label>
                    <div className="col">
                        <input type="radio" name="gender" className='form-check-input me-2' id="male" />
                        <label htmlFor="male" className='para clr-text'>Male</label>
                        <input type="radio" name="gender" className='form-check-input mx-2' id="female" />
                        <label htmlFor="female" className='para clr-text'>Female</label>
                    </div>
                </div>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-md-2'>City <span>(Required)</span></label>
                    <div className="col">
                        <input type="text" name="" id="" className='form-control inp col-m' value={Name} onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-md-2'>Country <span>(Required)</span></label>
                    <div className="col">
                        <input type="text" name="" id="" className='form-control inp col-m' value={Country} onChange={(e) => setCountry(e.target.value)} />
                    </div>
                </div>
                <button className='btn primary-btn mt-3'><p className='px-3'>Save Changes</p> </button>
            </form>
        </>
    )
}

export default PeopleProfileEdit