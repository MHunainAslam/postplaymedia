import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { APP_URL } from '../../../config'
import axios from 'axios'
import { message } from 'antd'
import JobEdit from './JobEdit'

const JobManage = ({ GetAllJobs, JobCategorydd }) => {
    const [activeComponent, setActiveComponent] = useState('table');
    const [JobId, setJobId] = useState('')

    const handleComponentChange = (componentName) => {
        setActiveComponent(componentName);
        console.log('componentName', componentName)
    };

    console.log('aass', GetAllJobs)


    const deleteJob = (e) => {
        console.log(e)
        axios.delete(`${APP_URL}/api/job/${e}/delete`)
            .then(response => {
                console.log(response.data);
                message.success(response.data.message)
                document.getElementById('Manage-tab').click()
            })
            .catch(error => {
                console.error(error);
            });
    }


    const editJob = (e) => {
        handleComponentChange('jobedit')
        console.log(e, 'll')
        setJobId(e)
    }
    return (
        <>
            {activeComponent === 'table' && <>
                <div className="table-responsive ">
                    <table className="table table-striped table-hover job-manage-table w-max-content">
                        <thead>
                            <tr>
                                <th className='text-start' scope="col">Title</th>
                                <th scope="col">Filled?</th>
                                <th scope="col">Date Posted</th>
                                <th scope="col">Listing Expires</th>
                            </tr>
                        </thead>
                        <tbody>
                            {GetAllJobs?.data?.data?.map((item, i) => (
                                <tr key={i}>
                                    <td className='d-flex justify-content-between'><Link href={`/jobs/${item.id}`} className='link-hov fw-bold text-black'> {item.title} </Link>
                                        <i className="bi bi-three-dots-vertical nav-link " data-bs-toggle="dropdown" aria-expanded="false"></i>

                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" onClick={() => { editJob(item.id) }} href="#">Edit</Link></li>
                                            {/* <li><Link className="dropdown-item" href="#">Mark not filled</Link></li>
                                        <li><Link className="dropdown-item" href="#">Duplicate</Link></li> */}
                                            <li><Link className="dropdown-item" onClick={() => { deleteJob(item.id) }} href="#">Delete</Link></li>
                                        </ul>

                                    </td>
                                    <td><i className="bi bi-check-circle text-danger"></i></td>
                                    <td>{item.created_at.slice(0, 10)}</td>
                                    <td>January 1, 2026 </td>
                                </tr>
                            ))}


                        </tbody>
                    </table>
                </div>
            </>}
            {activeComponent === 'jobedit' && <>
                <JobEdit handleComponentChange={handleComponentChange} JobId={JobId} JobCategorydd={JobCategorydd}/>
            </>}
        </>
    )
}

export default JobManage