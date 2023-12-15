'use client'
import React, { useEffect, useRef, useState } from 'react'
import LoginForm from './LoginForm';
import Image from 'next/image';
import LoginHeader from '../layout/LoginHeader';
import LoginFooter from '../layout/LoginFooter';
import Link from 'next/link';
import axios from 'axios';
import { APP_URL } from '../../../config';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import CoachRegistration from './CoachRegistration';
import AtheleteRegistration from './AtheleteRegistration';

const Register = () => {
    const [UserName, setUserName] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [C_Password, setC_Password] = useState('')
    const [Name, setName] = useState('')
    const [Number, setNumber] = useState('')
    const [Address, setAddress] = useState('')
    const [CInstitute, setCInstitute] = useState('')
    const [CInstituteweb, setCInstituteweb] = useState('')
    const [ClassYear, setClassYear] = useState('')
    const [Height, setHeight] = useState('')
    const [weight, setweight] = useState('')
    const [Sports, setSports] = useState('')
    const [AAUTrav, setAAUTrav] = useState('')
    const [Position, setPosition] = useState('')
    const [Error, setError] = useState(false)
    const [ShowPass, setShowPass] = useState(false)
    const [ShowCPass, setShowCPass] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const [Roles, setRoles] = useState([])
    const [RoleId, setRoleId] = useState('')
    const [JobType, setJobType] = useState([])
    const [activeComponent, setActiveComponent] = useState('buttons');
    const router = useRouter()

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


    useEffect(() => {
        axios.get(`${APP_URL}/api/roles`)
            .then(response => {
                console.log(response);
                setRoles(response)
            })
            .catch(error => {
                console.error(error);
            });
    }, [])






    const back = () => {
        handleComponentChange('buttons')
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
                                                {/* <div className="login-logo text-center">
                                                    <Image src={'/assets/images/logo/Logo.png'} alt='' width={100} height={100}></Image>
                                                </div> */}
                                                {activeComponent === 'buttons' && <>
                                                    <p className='heading text-center mb-5 text-dark'>Who Are You?</p>
                                                    <div className="text-center">
                                                        <button className='btn primary-btn m-1 px-md-5' onClick={() => handleComponentChange('Coach')}><p>Coach</p></button>
                                                        <button className='btn primary-btn m-1 px-md-5' onClick={() => handleComponentChange('Athletes')}><p>Athletes</p></button>
                                                    </div>
                                                </>}
                                                {activeComponent === 'Coach' && <>
                                                    <CoachRegistration back={back} RoleId={RoleId} />
                                                </>}
                                                {activeComponent === 'Athletes' && <>
                                                    <AtheleteRegistration back={back} RoleId={RoleId} />
                                                </>}
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