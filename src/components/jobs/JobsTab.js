'use client'
import React, { useEffect, useState } from 'react'
import AllJobs from './AllJobs'
import JobCategories from './JobCategories'
import JobManage from './JobManage'
import JobSubmit from './JobSubmit'
import axios from 'axios'
import { APP_URL } from '../../../config'
import { useRouter } from 'next/navigation'
import { deleteCookie } from 'cookies-next'
import { token } from '@/utils/Token'


const JobsTab = () => {
    const router = useRouter()
    const [JobCategory, setJobCategory] = useState(' AllJobs')
    const [activeComponent, setActiveComponent] = useState('AllJobs');
    const [loadcomponent, setloadcomponent] = useState(false)
    const [CatisLoader, setCatisLoader] = useState(true)
    const [SearchCategory, setSearchCategory] = useState('')





    const handleComponentChange = (componentName) => {
        setActiveComponent(componentName);
        console.log(componentName)
        setloadcomponent(!loadcomponent)
    };
    useEffect(() => {
        setCatisLoader(true)
        axios.get(`${APP_URL}/api/jobs-catgeories?search=${SearchCategory}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('setJobCategory', response);
                setJobCategory(response)
                setCatisLoader(false)
            })
            .catch(error => {
                console.error(error);
                setCatisLoader(false)
                if (error.response.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }, [loadcomponent, SearchCategory])




    return (
        <>
            <div className="activity-tabs mt-5">
                <ul className="nav nav-tabs border-0 " role="tablist">
                    <li className="nav-item nav-link active" id="AllJobs-tab" onClick={() => handleComponentChange('AllJobs')} data-bs-toggle="tab" data-bs-target="#AllJobs" type="button" role="tab" aria-controls="AllJobs" aria-selected="false" tabIndex="-1">
                        All Jobs
                    </li>
                    <li className="nav-item nav-link " id="categories-tab" onClick={() => handleComponentChange('Categories')} data-bs-toggle="tab" data-bs-target="#categories" type="button" role="tab" aria-controls="categories" aria-selected="false" tabIndex="-1">
                        Categories
                    </li>
                    <li className="nav-item nav-link " id="Manage-tab" onClick={() => handleComponentChange('Manage')} data-bs-toggle="tab" data-bs-target="#Manage" type="button" role="tab" aria-controls="Manage" aria-selected="false" tabIndex="-1">
                        Manage
                    </li>
                    <li className="nav-item nav-link " id="Submit-tab" onClick={() => handleComponentChange('Submit')} data-bs-toggle="tab" data-bs-target="#Submit" type="button" role="tab" aria-controls="Submit" aria-selected="false" tabIndex="-1">
                        Submit
                    </li>

                </ul>
                <div className="tab-content ">
                    <div className="tab-pane  fade active show" id="AllJobs" role="tabpanel" aria-labelledby="AllJobs-tab">
                        <AllJobs loadcomponent={loadcomponent} />
                        {/* <AllJobs GetAllJobs={GetAllJobs} AllJobisLoader={AllJobisLoader} setSearchTitle={setSearchTitle} SearchTitle={SearchTitle} /> */}
                    </div>
                    <div className="tab-pane fade " id="categories" role="tabpanel" aria-labelledby="categories-tab">
                        <JobCategories JobCategory={JobCategory} CatisLoader={CatisLoader} SearchCategory={SearchCategory} setSearchCategory={setSearchCategory} />
                    </div>
                    <div className="tab-pane fade " id="Manage" role="tabpanel" aria-labelledby="Manage-tab">
                        {/* <JobManage GetAllJobs={GetAllJobs} JobCategorydd={JobCategory} setSearchTitle={setSearchTitle} SearchTitle={SearchTitle} /> */}
                        <JobManage JobCategorydd={JobCategory} loadcomponent={loadcomponent} />
                    </div>
                    <div className="tab-pane fade " id="Submit" role="tabpanel" aria-labelledby="Submit-tab">
                        <JobSubmit JobCategorydd={JobCategory} />
                    </div>

                </div>
            </div>
        </>
    )
}

export default JobsTab