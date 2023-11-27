import React from 'react'
import AllJobs from './AllJobs'
import JobCategories from './JobCategories'
import JobManage from './JobManage'
import JobSubmit from './JobSubmit'

const JobsTab = () => {
    return (
        <>
            <div className="activity-tabs mt-5">
                <ul className="nav nav-tabs border-0 " role="tablist">
                    <li className="nav-item nav-link active" id="AllJobs-tab" data-bs-toggle="tab" data-bs-target="#AllJobs" type="button" role="tab" aria-controls="AllJobs" aria-selected="false" tabIndex="-1">
                        All Jobs
                    </li>
                    <li className="nav-item nav-link " id="categories-tab" data-bs-toggle="tab" data-bs-target="#categories" type="button" role="tab" aria-controls="categories" aria-selected="false" tabIndex="-1">
                        Categories
                    </li>
                    <li className="nav-item nav-link " id="Manage-tab" data-bs-toggle="tab" data-bs-target="#Manage" type="button" role="tab" aria-controls="Manage" aria-selected="false" tabIndex="-1">
                        Manage
                    </li>
                    <li className="nav-item nav-link " id="Submit-tab" data-bs-toggle="tab" data-bs-target="#Submit" type="button" role="tab" aria-controls="Submit" aria-selected="false" tabIndex="-1">
                        Submit
                    </li>

                </ul>
                <div className="tab-content ">
                    <div className="tab-pane fade active show" id="AllJobs" role="tabpanel" aria-labelledby="AllJobs-tab">
                        <AllJobs />
                    </div>
                    <div className="tab-pane fade " id="categories" role="tabpanel" aria-labelledby="categories-tab">
                        <JobCategories />
                    </div>
                    <div className="tab-pane fade " id="Manage" role="tabpanel" aria-labelledby="Manage-tab">
                        <JobManage />
                    </div>
                    <div className="tab-pane fade " id="Submit" role="tabpanel" aria-labelledby="Submit-tab">
                        <JobSubmit />
                    </div>

                </div>
            </div>
        </>
    )
}

export default JobsTab