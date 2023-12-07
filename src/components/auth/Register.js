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

const Register = () => {
    const [UserName, setUserName] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [C_Password, setC_Password] = useState('')
    const [Name, setName] = useState('')
    const [MemberType, setMemberType] = useState('')
    const [Error, setError] = useState(false)
    const [ShowPass, setShowPass] = useState(false)
    const [ShowCPass, setShowCPass] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const [Roles, setRoles] = useState([])
    const [activeComponent, setActiveComponent] = useState('buttons');
    const router = useRouter()

    const handleComponentChange = (componentName) => {
        setActiveComponent(componentName);
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


    const RegistrationSubmit = (e) => {
        e.preventDefault()
        if (UserName === '' || Email === '' || Password === '' || C_Password === '' || Name === '' || MemberType === '') {
            setError(true)
        }
        else {
            setisLoading(true)
            console.log(UserName, Email, Password, C_Password, Name, MemberType)
            axios.post(`${APP_URL}/api/register`, { name: Name, username: UserName, email: Email, password: Password, c_password: C_Password, role_id: MemberType })
                .then(response => {
                    // Handle successful response here
                    message.success(response.data.message)
                    console.log(response.data);
                    router.push('/')
                    setUserName('')
                    setEmail('')
                    setPassword('')
                    setC_Password('')
                    setName('')
                    setMemberType('')
                    setisLoading(false)
                })
                .catch(error => {
                    // Handle error here
                    message.error(error.data.message)
                    console.error(error);
                    setisLoading(false)
                });

            setError(false)
        }
    }

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
                                                    <form action="" onSubmit={RegistrationSubmit}>
                                                        <p className='heading text-center  text-dark'> <i class="bi bi-arrow-left backbtn" onClick={back}></i> Account Details</p>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <label className='para-sm clr-text mt-4' htmlFor="">Username  </label>
                                                                <input type="text" className="form-control inp" placeholder="Username" value={UserName} onChange={(e) => { setUserName(e.target.value) }} />
                                                                {Error ? UserName === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label className='para-sm clr-text mt-4' htmlFor="">Email Address  </label>
                                                                <input type="email" className="form-control inp" placeholder="Email" value={Email} onChange={(e) => { setEmail(e.target.value) }} />
                                                                {Error ? Email === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <label className='para-sm clr-text mt-4' htmlFor=""> Choose a Password  </label>
                                                                <div className="showpass">
                                                                    <input type={ShowPass ? 'text' : 'password'} className="form-control inp" placeholder="Password" value={Password} onChange={(e) => { setPassword(e.target.value) }} />
                                                                    <i className={`bi ${ShowPass ? 'bi-eye-fill' : 'bi-eye-slash-fill'}  `} onClick={() => { setShowPass(!ShowPass) }}></i>
                                                                </div>
                                                                {Error ? Password === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label className='para-sm clr-text mt-4' htmlFor=""> Confirm Password  </label>
                                                                <div className="showpass">
                                                                    <input type={ShowCPass ? 'text' : 'password'} className="form-control inp" placeholder="Re-Type Password" value={C_Password} onChange={(e) => { setC_Password(e.target.value) }} />
                                                                    <i className={`bi ${ShowCPass ? 'bi-eye-fill' : 'bi-eye-slash-fill'}  `} onClick={() => { setShowCPass(!ShowPass) }}></i>
                                                                </div>
                                                                {Error ? C_Password === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}
                                                            </div>
                                                        </div>
                                                        <p className='heading text-center mb-4 mt-5 text-dark'>Profile Details</p>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <label className='para-sm clr-text mt-4' htmlFor="">Name  </label>
                                                                <input type="text" className="form-control inp" placeholder="" value={Name} onChange={(e) => { setName(e.target.value) }} />
                                                                {Error ? Name === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                                                            </div>
                                                            <div className="col-md-6">
                                                                <label className='para-sm clr-text mt-4' htmlFor="">Number (optional)</label>
                                                                <input type="text" className="form-control inp" placeholder="" value={Name} onChange={(e) => { setName(e.target.value) }} />
                                                                {Error ? Name === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <label className='para-sm clr-text mt-4' htmlFor="">Email  </label>
                                                                <input type="text" className="form-control inp" placeholder="" value={Name} onChange={(e) => { setName(e.target.value) }} />
                                                                {Error ? Name === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                                                            </div>
                                                            <div className="col-md-6">
                                                                <label className='para-sm clr-text mt-4' htmlFor="">Adress  </label>
                                                                <input type="text" className="form-control inp" placeholder="" value={Name} onChange={(e) => { setName(e.target.value) }} />
                                                                {Error ? Name === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <label className='para-sm clr-text mt-4' htmlFor="">Current institude  </label>
                                                                <input type="text" className="form-control inp" placeholder="" value={Name} onChange={(e) => { setName(e.target.value) }} />
                                                                {Error ? Name === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                                                            </div>
                                                            <div className="col-md-6">
                                                                <label className='para-sm clr-text mt-4' htmlFor="">Current institude website  </label>
                                                                <input type="text" className="form-control inp" placeholder="" value={Name} onChange={(e) => { setName(e.target.value) }} />
                                                                {Error ? Name === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                                                            </div>
                                                        </div>
                                                      
                                                        <div className="row">
                                                           
                                                            <div className="col-md-6">
                                                                <label className='para-sm clr-text mt-4' htmlFor="">Job title</label>
                                                                <select name="" className='form-select slct' id="" onChange={(e) => { setMemberType(e.target.value) }} value={MemberType}>
                                                                    {/* {Roles?.data?.data?.map((item, i) => (
                                                                        <>
                                                                            <option value='' selected hidden>--select Member Type--</option>
                                                                            <option value={item.id}>{item.name}</option>
                                                                        </>
                                                                    ))} */}

                                                                    <option value='' selected hidden>--select Job Title --</option>
                                                                    <option value=''>Head Coach</option>
                                                                    <option value=''>Assistant Coach</option>
                                                                    <option value=''>Graduate Assistant</option>
                                                                   
                                                                </select>
                                                                {Error ? MemberType === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                                                            </div>
                                                        </div>
                                                      

                                                        <button type='submit' className='btn primary-btn mt-4 w-100'><p>Complete Sign Up {isLoading ? <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span> : ''}</p></button>
                                                        <Link className='text-decoration-none para-sm clr-primary d-inline-block w-100 mt-3 text-center' href={'/'}>Already Have Account</Link>
                                                    </form>
                                                </>}
                                                {activeComponent === 'Athletes' && <>
                                                    <form action="" onSubmit={RegistrationSubmit}>
                                                        <p className='heading text-center  text-dark'> <i class="bi bi-arrow-left backbtn" onClick={back}></i> Account Details</p>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <label className='para-sm clr-text mt-4' htmlFor="">Username  </label>
                                                                <input type="text" className="form-control inp" placeholder="Username" value={UserName} onChange={(e) => { setUserName(e.target.value) }} />
                                                                {Error ? UserName === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label className='para-sm clr-text mt-4' htmlFor="">Email Address  </label>
                                                                <input type="email" className="form-control inp" placeholder="Email" value={Email} onChange={(e) => { setEmail(e.target.value) }} />
                                                                {Error ? Email === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <label className='para-sm clr-text mt-4' htmlFor=""> Choose a Password  </label>
                                                                <div className="showpass">
                                                                    <input type={ShowPass ? 'text' : 'password'} className="form-control inp" placeholder="Password" value={Password} onChange={(e) => { setPassword(e.target.value) }} />
                                                                    <i className={`bi ${ShowPass ? 'bi-eye-fill' : 'bi-eye-slash-fill'}  `} onClick={() => { setShowPass(!ShowPass) }}></i>
                                                                </div>
                                                                {Error ? Password === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label className='para-sm clr-text mt-4' htmlFor=""> Confirm Password  </label>
                                                                <div className="showpass">
                                                                    <input type={ShowCPass ? 'text' : 'password'} className="form-control inp" placeholder="Re-Type Password" value={C_Password} onChange={(e) => { setC_Password(e.target.value) }} />
                                                                    <i className={`bi ${ShowCPass ? 'bi-eye-fill' : 'bi-eye-slash-fill'}  `} onClick={() => { setShowCPass(!ShowPass) }}></i>
                                                                </div>
                                                                {Error ? C_Password === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}
                                                            </div>
                                                        </div>
                                                        <p className='heading text-center mb-4 mt-5 text-dark'>Profile Details</p>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <label className='para-sm clr-text mt-4' htmlFor="">Name  </label>
                                                                <input type="text" className="form-control inp" placeholder="" value={Name} onChange={(e) => { setName(e.target.value) }} />
                                                                {Error ? Name === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                                                            </div>
                                                            <div className="col-md-6">
                                                                <label className='para-sm clr-text mt-4' htmlFor="">Number (optional)</label>
                                                                <input type="text" className="form-control inp" placeholder="" value={Name} onChange={(e) => { setName(e.target.value) }} />
                                                                {Error ? Name === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <label className='para-sm clr-text mt-4' htmlFor="">Email  </label>
                                                                <input type="text" className="form-control inp" placeholder="" value={Name} onChange={(e) => { setName(e.target.value) }} />
                                                                {Error ? Name === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                                                            </div>
                                                            <div className="col-md-6">
                                                                <label className='para-sm clr-text mt-4' htmlFor="">Adress  </label>
                                                                <input type="text" className="form-control inp" placeholder="" value={Name} onChange={(e) => { setName(e.target.value) }} />
                                                                {Error ? Name === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <label className='para-sm clr-text mt-4' htmlFor="">Current institude  </label>
                                                                <input type="text" className="form-control inp" placeholder="" value={Name} onChange={(e) => { setName(e.target.value) }} />
                                                                {Error ? Name === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                                                            </div>
                                                            <div className="col-md-6">
                                                                <label className='para-sm clr-text mt-4' htmlFor="">Current institude website  </label>
                                                                <input type="text" className="form-control inp" placeholder="" value={Name} onChange={(e) => { setName(e.target.value) }} />
                                                                {Error ? Name === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <label className='para-sm clr-text mt-4' htmlFor="">Class Year  </label>
                                                                <input type="text" className="form-control inp" placeholder="" value={Name} onChange={(e) => { setName(e.target.value) }} />
                                                                {Error ? Name === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                                                            </div>
                                                            <div className="col-md-6">
                                                                <label className='para-sm clr-text mt-4' htmlFor="">Height  </label>
                                                                <input type="text" className="form-control inp" placeholder="" value={Name} onChange={(e) => { setName(e.target.value) }} />
                                                                {Error ? Name === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <label className='para-sm clr-text mt-4' htmlFor="">Weight</label>
                                                                <input type="text" className="form-control inp" placeholder="" value={Name} onChange={(e) => { setName(e.target.value) }} />
                                                                {Error ? Name === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                                                            </div>
                                                            <div className="col-md-6">
                                                                <label className='para-sm clr-text mt-4' htmlFor="">Sports</label>
                                                                <select name="" className='form-select slct' id="" onChange={(e) => { setMemberType(e.target.value) }} value={MemberType}>
                                                                    {/* {Roles?.data?.data?.map((item, i) => (
                                                                        <>
                                                                            <option value='' selected hidden>--select Member Type--</option>
                                                                            <option value={item.id}>{item.name}</option>
                                                                        </>
                                                                    ))} */}

                                                                    <option value='' selected hidden>--select Sports--</option>
                                                                    <option value=''>Boys Basketball</option>
                                                                    <option value=''>Girls Basketball</option>
                                                                    <option value=''>Boys Baseball</option>
                                                                    <option value=''>Girls Baseball</option>
                                                                    <option value=''>Boys Football</option>
                                                                    <option value=''>Girls Football</option>
                                                                </select>
                                                                {Error ? MemberType === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <label className='para-sm clr-text mt-4' htmlFor="">Position </label>
                                                                <input type="text" className="form-control inp" placeholder="" value={Name} onChange={(e) => { setName(e.target.value) }} />
                                                                {Error ? Name === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                                                            </div>
                                                            <div className="col-md-6">
                                                                <label className='para-sm clr-text mt-4' htmlFor="">AAU/Travel Team Name  </label>
                                                                <input type="text" className="form-control inp" placeholder="" value={Name} onChange={(e) => { setName(e.target.value) }} />
                                                                {Error ? Name === '' ? <p className='para-sm text-danger ms-2 mt-1 mb-0'> Required*</p> : '' : ''}

                                                            </div>
                                                        </div>


                                                        <button type='submit' className='btn primary-btn mt-4 w-100'><p>Complete Sign Up {isLoading ? <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span> : ''}</p></button>
                                                        <Link className='text-decoration-none para-sm clr-primary d-inline-block w-100 mt-3 text-center' href={'/'}>Already Have Account</Link>
                                                    </form>
                                                </>}
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