'use client'
import React, { useEffect, useRef, useState } from 'react'
import LoginHeader from '../layout/LoginHeader';
import LoginFooter from '../layout/LoginFooter';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import CoachRegistration from './CoachRegistration';
import AtheleteRegistration from './AtheleteRegistration';

const Register = () => {
    const [RoleId, setRoleId] = useState('')
    const [activeComponent, setActiveComponent] = useState('buttons');


    {/* change components  */ }
    const handleComponentChange = (componentName) => {
        setActiveComponent(componentName);
        if (componentName === 'Coach') {
            setRoleId('2')
            console.log(componentName, RoleId)
        } else if (componentName === 'Athletes') {
            setRoleId('3')
            console.log(componentName, RoleId)
        }
    };

    {/*  previous window  */ }
    const back = () => {
        handleComponentChange('buttons')
    }

    {/*  bg video  */ }
    const bgRef = useRef();
    useEffect(() => { bgRef.current.play(); }, []);
    return (
        <>

            {/* bg video start */}
            <div className="login-bg" >
                <video ref={bgRef} muted
                    autoPlay
                    loop  >
                    <source autoPlay src={'/assets/videos/Login_bg.mp4'} type="video/mp4" />
                </video>
            </div>
            <div className="login-overlay"></div>
            {/* bg video end */}

            {/* registration form  */}
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


                                                {/* 1st step  select who are you*/}
                                                {activeComponent === 'buttons' && <>
                                                    <p className='heading text-center mb-5 text-dark'>Who Are You?</p>
                                                    <div className="text-center">
                                                        <button className='btn primary-btn m-1 px-md-5' onClick={() => handleComponentChange('Coach')}><p>Coach</p></button>
                                                        <button className='btn primary-btn m-1 px-md-5' onClick={() => handleComponentChange('Athletes')}><p>Athletes</p></button>
                                                    </div>
                                                </>}

                                                {/* if you are coach */}
                                                {activeComponent === 'Coach' && <>
                                                    <CoachRegistration back={back} RoleId={RoleId} />
                                                </>}

                                                {/* if you are athelete */}
                                                {activeComponent === 'Athletes' && <>
                                                    <AtheleteRegistration back={back} RoleId={RoleId} />
                                                </>}

                                                {/* Already have an account */}
                                                <Link className='text-decoration-none para-sm clr-primary d-inline-block w-100 mt-3 text-center' href={'/'}>Already Have Account</Link>
                                            
                                            
                                            
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

export default Register