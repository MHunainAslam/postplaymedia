'use client'
import React, { useState } from 'react'

const PeopleProfileEdit = () => {
    const [Name, setName] = useState('')
    const [MemberType, setMemberType] = useState('')
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
            </form>
        </>
    )
}

export default PeopleProfileEdit