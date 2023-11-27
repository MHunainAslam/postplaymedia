import Link from 'next/link'
import React from 'react'

const JobManage = () => {
    return (
        <>
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
                    <tr>
                        <td className='d-flex justify-content-between'><Link href={'#'} className='link-hov fw-bold text-black'> Sales & Customer Success Manager </Link>
                            <i className="bi bi-three-dots-vertical nav-link " data-bs-toggle="dropdown" aria-expanded="false"></i>

                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" href="#">Edit</Link></li>
                                <li><Link className="dropdown-item" href="#">Mark not filled</Link></li>
                                <li><Link className="dropdown-item" href="#">Duplicate</Link></li>
                                <li><Link className="dropdown-item" href="#">Delete</Link></li>
                            </ul>

                        </td>
                        <td><i className="bi bi-check-circle text-danger"></i></td>
                        <td>January 24, 2020</td>
                        <td>January 1, 2026 </td>
                    </tr>
                    <tr>
                        <td className='d-flex justify-content-between'><Link href={'#'} className='link-hov fw-bold text-black'> Marketing Data Enrichment Specialist </Link>
                            <i className="bi bi-three-dots-vertical nav-link " data-bs-toggle="dropdown" aria-expanded="false"></i>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" href="#">Edit</Link></li>
                                <li><Link className="dropdown-item" href="#">Mark not filled</Link></li>
                                <li><Link className="dropdown-item" href="#">Duplicate</Link></li>
                                <li><Link className="dropdown-item" href="#">Delete</Link></li>
                            </ul>
                        </td>
                        <td>-</td>
                        <td>January 24, 2020</td>
                        <td>January 1, 2026 </td>
                    </tr>
                    <tr>
                        <td className='d-flex justify-content-between'><Link href={'#'} className='link-hov fw-bold text-black'> Sales & Customer Success Manager </Link>
                            <i className="bi bi-three-dots-vertical nav-link " data-bs-toggle="dropdown" aria-expanded="false"></i>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" href="#">Edit</Link></li>
                                <li><Link className="dropdown-item" href="#">Mark not filled</Link></li>
                                <li><Link className="dropdown-item" href="#">Duplicate</Link></li>
                                <li><Link className="dropdown-item" href="#">Delete</Link></li>
                            </ul>
                        </td>
                        <td>-</td>
                        <td>January 24, 2020</td>
                        <td>January 1, 2026 </td>
                    </tr>
                    <tr>
                        <td className='d-flex justify-content-between'><Link href={'#'} className='link-hov fw-bold text-black'> Sales & Customer Success Manager </Link>
                            <i className="bi bi-three-dots-vertical nav-link " data-bs-toggle="dropdown" aria-expanded="false"></i>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" href="#">Edit</Link></li>
                                <li><Link className="dropdown-item" href="#">Mark not filled</Link></li>
                                <li><Link className="dropdown-item" href="#">Duplicate</Link></li>
                                <li><Link className="dropdown-item" href="#">Delete</Link></li>
                            </ul>
                        </td>
                        <td><i className="bi bi-check-circle"></i></td>
                        <td>January 24, 2020</td>
                        <td>January 1, 2026 </td>
                    </tr>

                </tbody>
            </table>
            </div>
        </>
    )
}

export default JobManage