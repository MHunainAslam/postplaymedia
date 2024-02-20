import React from 'react'
import LoginForm from './LoginForm'
import Image from 'next/image'

const LoginModal = () => {
    return (
        <>


            <div className="modal fade" id="LoginModal" tabIndex="-1" aria-labelledby="LoginModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body px-md-5 py-md-4">
                            <div className="modal-avatar">
                                <div>
                                    <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100}></Image>
                                </div>
                            </div>
                            <p className="heading clr-dark text-center">
                                Log into your account
                            </p>
                            <LoginForm id={'remembermodal'}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginModal