'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { setCookie } from 'cookies-next';
import { message } from 'antd';
import axios from 'axios';
import { APP_URL } from '../../../config';

const LoginForm = () => {
  const [UserEmail, setUserEmail] = useState('')
  const [UserPass, setUserPass] = useState('')
  const [ShowPass, setShowPass] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const router = useRouter()

  const loginuser = (e) => {
    e.preventDefault()
    if (UserEmail === '' || UserPass === '') {
      console.log('Empty Email or Password')
      console.log(JSON.parse(localStorage.getItem('userdetail')))
      message.error('Empty Email or Password');
    } else {

      setisLoading(true)
      axios.post(`${APP_URL}/api/login`, { email: UserEmail, password: UserPass })
        .then(response => {
          message.success(response?.data?.message)
          // console.log(response.data);
          // setUserEmail('')
          // setUserPass('')
          console.log(response.data.data.token)
          setCookie('logged', response.data.data.token);
          localStorage.setItem('userdetail', JSON.stringify({ response }))
          router.push('/activity')
          setisLoading(false)
          document.querySelector('.closelogin-modal').click()
        })
        .catch(error => {
          console.error(error);
          message.error(error?.response.data?.message)
          setisLoading(false)
        });

    }
  }



  const LostPass = () => {
    document.querySelector('.closelogin-modal').click()
    console.log("first")
    router.push('/forget')
  }
  const RegisterYourSelf = () => {
    document.querySelector('.closelogin-modal').click()
    console.log("first")
    router.push('/register')
  }
  return (
    <>
      <form action="" onSubmit={loginuser}>
        <Link href={'#'} className='d-none closelogin-modal' data-bs-dismiss="modal"></Link>
        <div className=" custome-inp">
          <span className="input-group-text" ><i className="bi bi-person"></i></span>
          <input type="text" className="form-control" value={UserEmail} onChange={(e) => { setUserEmail(e.target.value) }} placeholder="Email or Username" />
        </div>
        <div className=" custome-inp mt-3 ">
          <span className="input-group-text" ><i className="bi bi-key"></i></span>
          <div className="showpass">
            <input type={ShowPass ? 'text' : 'password'} className="form-control" value={UserPass} onChange={(e) => { setUserPass(e.target.value) }} placeholder="Password" />
            <i className={`bi ${ShowPass ? 'bi-eye-fill' : 'bi-eye-slash-fill'}  `} onClick={() => { setShowPass(!ShowPass) }}></i>
          </div>
        </div>
        <div className="justify-content-between d-flex mt-3 align-items-center">
          <div className="form-check custome-checkbox ">
            <input className="form-check-input" type="checkbox" value="" id="remember" />
            <label className="form-check-label" htmlFor="remember">
              Remember
            </label>
          </div>
          <button type='button' className='text-decoration-none text-black para-sm align-items-center bg-transparent border-0' onClick={LostPass}>Lost Password?</button>
        </div>
        <button type='submit' className='btn primary-btn mt-3 w-100'><p>Log into your account   {isLoading ? <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span> : ''}</p></button>
      </form>
      <button className='text-decoration-none para-sm clr-primary d-inline-block w-100 mt-3 text-center bg-transparent border-0' onClick={RegisterYourSelf}>Create an Account</button>
    </>
  )
}

export default LoginForm