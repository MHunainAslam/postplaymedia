'use client'
import React, { useEffect, useRef, useState } from 'react'
import LoginHeader from '../layout/LoginHeader';
import LoginFooter from '../layout/LoginFooter';
import Link from 'next/link';
import { message } from 'antd';
import axios from 'axios';
import { APP_URL } from '../../../config';
import { useRouter } from 'next/navigation';

const Forget = () => {
    const router = useRouter()

    const [activeComponent, setActiveComponent] = useState('Email');
    const [Email, setEmail] = useState('')
    const [OTP, setOTP] = useState('')
    const [Password, setPassword] = useState('')
    const [Password2, setPassword2] = useState('')
    const [ShowPass, setShowPass] = useState(false)
    const [ShowPass2, setShowPass2] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const [isLoading2, setisLoading2] = useState(false)

    const handleComponentChange = (componentName) => {
        setActiveComponent(componentName);
    };

    const SendEmail = (e) => {
        e.preventDefault()
        if (Email === '') {
            message.error('Enter Your Registered Email')
        } else {
            setisLoading(true)
            axios.post(`${APP_URL}/api/forget-password`, { email: Email })
                .then(response => {
                    console.log(response);
                    setisLoading(false)
                    handleComponentChange('OTP')
                    message.success(response.data.message)
                })
                .catch(error => {
                    setisLoading(false)
                    console.error(error);
                    message.error(error?.response.data?.message)

                });
        }
    }
    const ReSendOTP = (e) => {
        e.preventDefault()
        setisLoading2(true)
        axios.post(`${APP_URL}/api/resent-otp`, { email: Email })
            .then(response => {
                console.log(response);
                message.success(response.data.message)
                setisLoading2(false)
            })
            .catch(error => {
                setisLoading2(false)
                console.error(error);
                message.error(error?.response.data?.message)

            });

    }
    const SendOTP = (e) => {
        e.preventDefault()
        if (Email === '') {
            message.error('Enter Your Registered Email')
        } else {
            setisLoading(true)
            axios.post(`${APP_URL}/api/verify-otp`, { email: Email, otp: OTP })
                .then(response => {
                    console.log(response);
                    setisLoading(false)
                    handleComponentChange('PassWord')
                    message.success(response.data.message)
                })
                .catch(error => {
                    setisLoading(false)
                    console.error(error);
                    message.error(error?.response.data?.message)

                });
        }
    }
    const UpdatePassword = (e) => {
        e.preventDefault()
        if (Password === '' || Password2 === '') {
            message.error('Enter Your Registered Email')
        } else if (Password != Password2) {
            message.error('Password Dose Not Match')
        } else {
            setisLoading(true)
            axios.post(`${APP_URL}/api/reset-password`, { email: Email, otp: OTP, password: Password })
                .then(response => {
                    console.log(response);
                    setisLoading(false)
                    router.push('/')
                    message.success(response.data.message)
                })
                .catch(error => {
                    setisLoading(false)
                    console.error(error);
                    message.error(error?.response.data?.message)

                });
        }
    }


    const bgRef = useRef();

    useEffect(() => { bgRef.current.play(); }, []);
    return (
        <>
            <div className="login-bg" >
                <video ref={bgRef} muted
                    autoPlay
                    loop  >
                    <source autoPlay src={'/assets/videos/Login_bg.mp4'} type="video/mp4" />
                </video>
            </div>
            <div className="login-overlay"></div>
            <div className="container min-vh-100">
                <div className="row justify-content-center">
                    <div className="col-md-11">
                        <LoginHeader />
                        <div className="row justify-content-center w-100 mx-auto min-vh-80">
                            <div className="col-lg-10 col-xl-8">
                                <div className="row Login-panel">

                                    <div className="col-md-12 right">
                                        <div className="h-100 d-flex align-items-center">
                                            <div className="w-100">
                                                <div action="" >
                                                    {activeComponent === 'Email' && <>
                                                        <p className='heading text-center  text-dark'>Registered Email</p>
                                                        <form action="" onSubmit={SendEmail}>
                                                            <label className='para-sm clr-text mt-4' htmlFor="">Email</label>
                                                            <input type="email" className="form-control inp" value={Email} onChange={(e) => { setEmail(e.target.value) }} />
                                                            <button type='submit' className='btn primary-btn mt-4 w-100' ><p>Send OTP {isLoading ? <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span> : ''}</p></button> <br />
                                                        </form>
                                                    </>}
                                                    {activeComponent === 'OTP' && <>
                                                        <p className='heading text-center  text-dark'>OTP</p>
                                                        <form action="" onSubmit={SendOTP}>
                                                            <label className='para-sm clr-text mt-4' htmlFor="">OTP</label>
                                                            <input type="text" className="form-control inp" value={OTP} onChange={(e) => { setOTP(e.target.value) }} />
                                                            <Link href={'#'} onClick={ReSendOTP} className='link-hov para clr-primary text-center d-inline-block w-100 mt-3 mb-0'>Resend OTP {isLoading2 ? <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span> : ''}</Link>
                                                            <button type='submit' className='btn primary-btn mt-4 w-100'><p>Verify {isLoading ? <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span> : ''}</p></button> <br />
                                                        </form>
                                                    </>}
                                                    {activeComponent === 'PassWord' && <>
                                                        <p className='heading text-center  text-dark'>New Password</p>
                                                        <form action="" onSubmit={UpdatePassword}>
                                                            <label className='para-sm clr-text mt-4' htmlFor="">Password</label>
                                                            <div className="showpass">
                                                                <input type={ShowPass ? 'text' : 'password'} className="form-control inp" value={Password} onChange={(e) => { setPassword(e.target.value) }} />
                                                                <i className={`bi ${ShowPass ? 'bi-eye-fill' : 'bi-eye-slash-fill'}  `} onClick={() => { setShowPass(!ShowPass) }}></i>
                                                            </div>
                                                            <label className='para-sm clr-text mt-4' htmlFor="">Confirm Password</label>
                                                            <div className="showpass">
                                                                <input type={ShowPass2 ? 'text' : 'password'} className="form-control inp" value={Password2} onChange={(e) => { setPassword2(e.target.value) }} />
                                                                <i className={`bi ${ShowPass2 ? 'bi-eye-fill' : 'bi-eye-slash-fill'}  `} onClick={() => { setShowPass2(!ShowPass2) }}></i>
                                                            </div>
                                                            <button type='submit' className='btn primary-btn mt-4 w-100'><p>Confirm Password {isLoading ? <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span> : ''}</p></button> <br />
                                                        </form>
                                                    </>}
                                                    <Link className='text-decoration-none para-sm clr-primary d-inline-block w-100 mt-4 text-center' href={'/'}>Back to Login </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <LoginFooter />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Forget