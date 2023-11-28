'use client'
import axios from 'axios';
import React, { useState } from 'react'
import { APP_URL } from '../../../config';
import { message } from 'antd';

const AddCategory = () => {
    const [name, setname] = useState('')
    // const [slug, setname] = useState('')
    const submitcat = (e) => {
        e.preventDefault()
        if (name === '') {
            message.error('Required')
        } else {
            axios.post(`${APP_URL}/api/jobs-catgeory-post`, { name: name, slug: name })
                .then(response => {
                    console.log('cat', response);
                    message.success(response.data?.message)

                })
                .catch(error => {
                    console.error(error);
                    message.error(error?.response.data?.message)

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
                                <button type="submit" class="btn primary-btn"><p>Save changes</p></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddCategory