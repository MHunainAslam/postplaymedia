'use client'

import { message } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { APP_URL } from '../../../../config'
import { token } from '@/utils/Token'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

const General = () => {
    const [currentPass, setcurrentPass] = useState('')
    const [NewPass, setNewPass] = useState('')
    const [CNewPass, setCNewPass] = useState('')
    const [ShowPass, setShowPass] = useState(false)
    const [ShowPass2, setShowPass2] = useState(false)
    const [ShowPass3, setShowPass3] = useState(false)
    const [isloading, setisloading] = useState(false)
    const router = useRouter()
    console.log(token, 'token')
    const changepass = (e) => {
        e.preventDefault()
        if (currentPass === '' || NewPass === '' || CNewPass === '') {
            message.error('All fields are required')
        } else {
            setisloading(true)
            console.log('pass changing start')
            axios.post(`${APP_URL}/api/change-password`, { current_password: currentPass, password: NewPass, password_confirmation: CNewPass }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
                .then(response => {
                    console.log('pass', response);
                    message.success(response.data?.message)
                    setisloading(false)
                    setcurrentPass('')
                    setNewPass('')
                    setCNewPass('')
                })
                .catch(error => {
                    console.error(error);
                    message.error(error?.response.data?.message)
                    if (error.response.status === 401) {
                        router.push('/')
                        deleteCookie('logged');
                        localStorage.removeItem('userdetail')
                    }
                    setisloading(false)

                });
        }
    }
    return (
        <>
            <p className="heading mt-3 clr-text">Change Password</p>

            <div className="border-bottom mb-4"></div>

            <form action="" className='job-detail ' onSubmit={changepass}>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-md-2'>Current Password </label>
                    <div className="col">
                        <div className="showpass">
                            <input type={ShowPass2 ? 'text' : 'password'} className='form-control inp col-m' value={currentPass} onChange={(e) => setcurrentPass(e.target.value)} />
                            <i className={`bi pointer ${ShowPass2 ? 'bi-eye-fill' : 'bi-eye-slash-fill'}  `} onClick={() => { setShowPass2(!ShowPass2) }}></i>
                        </div>

                    </div>
                </div>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-md-2'>New Password </label>
                    <div className="col">
                        <div className="showpass">
                            <input type={ShowPass ? 'text' : 'password'} className='form-control inp col-m' value={NewPass} onChange={(e) => setNewPass(e.target.value)} />
                            <i className={`bi pointer ${ShowPass ? 'bi-eye-fill' : 'bi-eye-slash-fill'}  `} onClick={() => { setShowPass(!ShowPass) }}></i>
                        </div>
                    </div>
                </div>
                <div className='d-md-flex align-items-center my-3'>
                    <label htmlFor="" className='col-md-2'>Confirm New Password </label>
                    <div className="col">
                        <div className="showpass">
                            <input type={ShowPass3 ? 'text' : 'password'} className='form-control inp col-m' value={CNewPass} onChange={(e) => setCNewPass(e.target.value)} />
                            <i className={`bi pointer ${ShowPass3 ? 'bi-eye-fill' : 'bi-eye-slash-fill'}  `} onClick={() => { setShowPass3(!ShowPass3) }}></i>
                        </div>
                    </div>
                </div>
                <button type='submit' className='btn primary-btn mt-3' ><p className='px-3'>Save Changes {isloading ? <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span> : ''}</p> </button>
            </form>
        </>
    )
}

export default General