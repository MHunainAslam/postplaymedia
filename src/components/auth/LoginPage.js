"use client"
import React, { useEffect, useRef } from 'react'
import LoginHeader from '../layout/LoginHeader';
import LoginForm from './LoginForm';
import Image from 'next/image';
import NavLinks from '../layout/NavLinks';
import LoginFooter from '../layout/LoginFooter';

const LoginPage = () => {
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
                                    <div className="col-md-6 left ">
                                        <div className="h-100 d-flex align-items-center">
                                            <div className="w-100">
                                                <p className='heading'>Join the club</p>
                                                <p className='para'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus.</p>
                                                <div className="d-flex align-items-center mt-4">
                                                    <div className="square-icon">
                                                        <i className="bi bi-laptop text-white fw-bold "></i>
                                                    </div>
                                                    <div className='ms-3'>
                                                        <p className="heading-m mb-0">Community</p>
                                                        <p className='para mb-0'>At vero eos et accusamus et.</p>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center mt-4">
                                                    <div className="square-icon">
                                                        <i className="bi bi-briefcase-fill text-white fw-bold"></i>
                                                    </div>
                                                    <div className='ms-3'>
                                                        <p className="heading-m mb-0">Job search</p>
                                                        <p className='para mb-0'>At vero eos et accusamus et.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 right">
                                        <div className="h-100 d-flex align-items-center">
                                            <div className="w-100">
                                                <div className="login-logo text-center">
                                                    <Image src={'/assets/images/logo/Logo.png'} alt='' width={100} height={100}></Image>
                                                </div>
                                                <p className='heading text-center mt-4 text-dark'>Welcome</p>
                                                <p className="para text-dark text-center">Join gazillions of people online</p>
                                                <LoginForm />
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

export default LoginPage