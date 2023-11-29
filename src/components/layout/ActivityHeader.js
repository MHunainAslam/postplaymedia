'use client'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

const ActivityHeader = () => {
    const router = useRouter()
    const logout = () => {
        deleteCookie('logged');
        localStorage.removeItem('userdetail')
        router.push('/')
        console.log(deleteCookie())
    }
    // console.log('ss',document.cookie.split('=')[0], JSON.parse(localStorage.getItem('userdetail')).response.data.data)
    useEffect(() => {

        if (!document.cookie.split('=')[0] || document.cookie.split('=')[1] != JSON.parse(localStorage.getItem('userdetail'))?.response?.data?.data?.token) {
            router.replace('/login')
            deleteCookie('logged');
        }
    }, [])

    return (
        <>
            <div className="activity-header">
                <div className="row justify-content-between px-md-3 px-0 w-100">
                    <div className="col-md-3 col-12 py-md-0 py-2">
                        <div className="input-group header-search ">
                            <i className="bi bi-text-left clr-primary fs-4 d-md-none" data-bs-toggle="offcanvas" data-bs-target="#ActivitySidebar" aria-controls="ActivitySidebar"></i>
                            <span className="input-group-text border-0 bg-transparent" id="basic-addon1"><i className="bi bi-search"></i></span>
                            <input type="text" className="form-control border-0 bg-transparent" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                    <div className="col d-flex justify-content-md-end justify-content-between align-items-center py-md-0 py-3">
                        <li className="nav-item dropdown list-unstyled header-btns">
                            <a className="nav-link " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-person-plus"></i>
                            </a>
                            <ul className="dropdown-menu py-1 border-0 ">
                                <li><a className="text-decoration-none clr-text ms-2 my-1 pointer-event" href="#" >Friend Requests</a></li>
                                <hr />
                                <li>
                                    <div className="no-msg-req">
                                        No Message Request
                                    </div>
                                </li>
                                <hr />
                                <li><button className="btn secondary-btn w-100"  >All Request</button></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown list-unstyled header-btns">
                            <a className="nav-link " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-bell"></i>
                            </a>
                            <ul className="dropdown-menu py-1 border-0 ">
                                <li><a className="text-decoration-none clr-text ms-2 my-1 pointer-event" href="#" >Friend Requests</a></li>
                                <hr />
                                <li>
                                    <div className="no-msg-req">
                                        No Message Request
                                    </div>
                                </li>
                                <hr />
                                <li><button className="btn secondary-btn w-100"  >All Request</button></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown list-unstyled header-btns">
                            <a className="nav-link " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-envelope-open"></i>
                            </a>
                            <ul className="dropdown-menu py-1 border-0 ">
                                <li><a className="text-decoration-none clr-text ms-2 my-1 pointer-event" href="#" >Friend Requests</a></li>
                                <hr />
                                <li>
                                    <div className="no-msg-req">
                                        No Message Request
                                    </div>
                                </li>
                                <hr />
                                <li><button className="btn secondary-btn w-100"  >All Request</button></li>
                            </ul>
                        </li>
                        <a className='d-flex align-items-center nav-link ' data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                            <li className=" list-unstyled header-btns">
                                <div className="" href="#" >
                                    <Image className='post-profile-sm' src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100}></Image>
                                </div>


                            </li>
                            {/* <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" >Dropdown</a> */}
                            {/* </li> */}
                            <p className='para-sm fw-bold mb-0 '>@admin</p>
                        </a>
                        <ul className="dropdown-menu " style={{ zIndex: 9999 }}>
                            <li onClick={logout}><p className="dropdown-item pointer mb-0" >logout</p></li>
                        </ul>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ActivityHeader