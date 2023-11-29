'use client'
import axios from 'axios';
import React, { useState } from 'react'
import { APP_URL } from '../../../config';
import { message } from 'antd';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { token } from '@/utils/Token';

const AddCategory = () => {
    const [name, setname] = useState('')
    const [isLoading, setisLoading] = useState(false)
    // const [slug, setname] = useState('')
    const router = useRouter()
    const submitcat = (e) => {
        e.preventDefault()
        if (name === '') {
            message.error('Required')
        } else {
            setisLoading(true)
            axios.post(`${APP_URL}/api/jobs-catgeory-post`, { name: name, slug: name }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
                .then(response => {
                    console.log('cat', response);
                    message.success(response.data?.message)
                    document.getElementById('Submit-tab').click()
                    setisLoading(false)
                })
                .catch(error => {
                    console.error(error);
                    message.error(error?.response.data?.message)
                    if (error.response.status === 401) {
                        router.push('/')
                        deleteCookie('logged');
                        localStorage.removeItem('userdetail')
                    }
                    setisLoading(false)

                });
        }
    }
    return (
        <>
            <button type="button" class="btn btn-primary d-none addcat" data-bs-toggle="modal" data-bs-target="#AddCategory">
                Launch demo modal
            </button>


            <div class="modal fade " id="AddCategory" tabindex="-1" aria-labelledby="AddCategoryLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content modal-bg py-4">
                        <div class="modal-header border-0 justify-content-center">
                            <h1 class="heading text-white" id="AddCategoryLabel">Add Category</h1>
                            {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <form action="" onSubmit={submitcat}>
                            <div class="modal-body">
                                <input type="text" className='form-control inp' name="" value={name} onChange={(e) => setname(e.target.value)} id="" />
                                {/* <input type="text" className='form-control mt-3 inp' name="" id="" /> */}
                            </div>
                            <div class="modal-footer justify-content-center border-0">
                                <button type="button" class="btn secondary-btn text-white px-3" data-bs-dismiss="modal">Close</button>
                                <button type="submit" class="btn primary-btn"><p>Save changes {isLoading ? <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span> : ''}</p></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddCategory