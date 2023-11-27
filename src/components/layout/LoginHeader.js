import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavLinks from './NavLinks'
import LoginModal from '../auth/LoginModal'

const LoginHeader = () => {
    return (
        <>

            <div className="d-flex py-3 justify-content-between">
                <Link href={"/"}><Image src='/assets/images/logo/Logo.png' className='header-logo' alt="" width={100} height={100}></Image></Link>

                <div className='Login-register'>
                    <Link href={'#'} data-bs-toggle="modal" data-bs-target="#LoginModal">Login</Link>
                    <Link href={'/register'}>Register</Link>
                    <i className="bi bi-text-left main-menu-btn" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"></i>
                </div>


                <div className="offcanvas  offcanvas-end px-3" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                    <div className="offcanvas-header mt-3">
                        <h5 className="offcanvas-title fw-bold fs-5" id="offcanvasExampleLabel">Main Menu</h5>
                        {/* <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button> */}
                    </div>
                    <hr />
                    <div className="offcanvas-body">
                        <NavLinks />
                    </div>
                </div>
            </div>
            <LoginModal />
        </>
    )
}

export default LoginHeader