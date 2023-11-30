import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { APP_URL } from '../../../config'
import axios from 'axios'
import { message } from 'antd'
import JobEdit from './JobEdit'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { token } from '@/utils/Token'
import Loader from '../Loader'

const JobManage = ({ JobCategorydd, loadcomponent }) => {
    const [activeComponent, setActiveComponent] = useState('table');
    const [JobId, setJobId] = useState('')
    const [ManageJobisLoader, setManageJobisLoader] = useState(true)
    const [SearchTitle, setSearchTitle] = useState('')
    const [GetAllJobs, setGetAllJobs] = useState([])
    const router = useRouter()

    const handleComponentChange = (componentName) => {
        setActiveComponent(componentName);
        console.log('componentName', componentName)
    };




    useEffect(() => {
        setManageJobisLoader(true)
        axios.get(`${APP_URL}/api/all-jobs?search=${SearchTitle}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('alljobs manage', response);
                setGetAllJobs(response)
                setManageJobisLoader(false)
            })
            .catch(error => {
                console.error(error);
                if (error.response.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
                setManageJobisLoader(false)
            });
    }, [loadcomponent, SearchTitle])

    const deleteJob = (e) => {
        console.log(e)
        axios.delete(`${APP_URL}/api/job/${e}/delete`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log(response.data);
                message.success(response.data.message)
                document.getElementById('Manage-tab').click()
            })
            .catch(error => {
                console.error(error);
                if (error.response.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
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

                <div className="border-bottom row justify-content-between">
                    <div className="col-sm-8 col-lg-6">
                        <form className="  my-3">
                            <div className="d-flex">
                                <input type="text" className="form-control inp me-2 " placeholder="keywords" aria-label="Username" value={SearchTitle} onChange={(e) => { setSearchTitle(e.target.value) }} />
                                <input type="text" className="form-control inp me-2 " placeholder="Location" aria-label="Username" />
                                <button className='btn primary-btn rounded-5 '><p><i className="bi bi-search"></i></p></button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="table-responsive position-relative min-vh-50">
                    {ManageJobisLoader ? <Loader /> :
                        <table className="table table-striped table-hover job-manage-table w-max-content">
                            <thead>
                                <tr>
                                    <th className='text-start' scope="col">Title</th>
                                    {/* <th scope="col">Filled?</th> */}
                                    <th scope="col">Date Posted</th>
                                    <th scope="col">Listing Expires</th>
                                </tr>
                            </thead>
                            <tbody>
                                {GetAllJobs?.data?.data.length === 0 ? <tr className='text-center heading-m text-black my-5'><td colspan="4">No Result Found </td></tr> :
                                    <>
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
                                                {/* <td><i className="bi bi-check-circle text-danger"></i></td> */}
                                                <td>{item.created_at.slice(0, 10)}</td>
                                                <td>{item.expiry_date ? item.expiry_date.slice(0, 10) : '--'} </td>
                                            </tr>
                                        ))}

                                    </>}
                            </tbody>
                        </table>
                    }
                </div>
            </>}
            {activeComponent === 'jobedit' && <>
                <JobEdit handleComponentChange={handleComponentChange} JobId={JobId} JobCategorydd={JobCategorydd} />
            </>}
        </>
    )
}

export default JobManage