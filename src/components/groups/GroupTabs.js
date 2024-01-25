'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import AllGroups from './AllGroups'
import MyGroups from './MyGroups'
import CreateGroups from './CreateGroups'
import { useRouter } from 'next/navigation'
import { GetToken } from '@/utils/Token'
import axios from 'axios'
import { APP_URL } from '../../../config'
import { deleteCookie } from 'cookies-next'
import Pagination from '../jobs/Pagination'


const GroupTabs = () => {
    const router = useRouter()
    const token = GetToken('userdetail')
    const [Allgrp, setAllgrp] = useState([])
    const [isLoading, setisLoading] = useState(true)
    const [dataOnPage, setdataOnPage] = useState(20)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = dataOnPage;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const a = parseInt(itemsPerPage);
    const b = parseInt(indexOfFirstItem);
    const getallgrp = () => {
        setisLoading(true)
        axios.get(`${APP_URL}/api/groups?per_page=${dataOnPage}&page=${currentPage}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('all grps', response);
                setAllgrp(response)
                setisLoading(false)
            })
            .catch(error => {
                setisLoading(false)
                console.error(error);
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }
    useEffect(() => {
        getallgrp()
    }, [dataOnPage, currentPage])
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // setisLoading(true)
        console.log(pageNumber);
    };
    return (
        <>
            <div className="activity-tabs mt-5">
                <ul className="nav nav-tabs border-0 " role="tablist">
                    <li className="nav-item nav-link active" id="AllGroups-tab" data-bs-toggle="tab" data-bs-target="#AllGroups" type="button" role="tab" aria-controls="AllGroups" aria-selected="false" tabIndex="-1" onClick={() => { getallgrp() , setCurrentPage(1)}}>
                        All Groups <span className='comment-active ms-1'>{Allgrp?.data?.data?.total}</span>
                    </li>
                    <li className="nav-item nav-link " id="MyGroups-tab" data-bs-toggle="tab" data-bs-target="#MyGroups" type="button" role="tab" aria-controls="MyGroups" aria-selected="false" tabIndex="-1">
                        My Groups <span className='comment-active ms-1'>1</span>
                    </li>
                    <li className="nav-item nav-link " id="CreateGrp-tab" data-bs-toggle="tab" data-bs-target="#CreateGrp" type="button" role="tab" aria-controls="CreateGrp" aria-selected="false" tabIndex="-1">
                        Create a Group
                    </li>

                </ul>
                <div className="tab-content ">
                    <div className="tab-pane fade active show" id="AllGroups" role="tabpanel" aria-labelledby="AllGroups-tab">
                        <AllGroups Allgrp={Allgrp} isLoading={isLoading} />
                        <Pagination
                            dataOnPage={dataOnPage}
                            currentPage={currentPage}
                            totalPages={Math.ceil(Allgrp?.data?.data?.total / itemsPerPage)}
                            tabledata={Allgrp?.data?.data?.data}
                            onPageChange={handlePageChange}
                            indexOfFirstItem={indexOfFirstItem}
                            // currentData={currentData}
                            itemsPerPage={itemsPerPage}
                            indexOfLastItem={indexOfLastItem}
                        />
                    </div>
                    <div className="tab-pane fade " id="MyGroups" role="tabpanel" aria-labelledby="MyGroups-tab">
                        <MyGroups />
                    </div>
                    <div className="tab-pane fade " id="CreateGrp" role="tabpanel" aria-labelledby="CreateGrp-tab">
                        <CreateGroups />
                    </div>

                </div>
            </div>
        </>
    )
}

export default GroupTabs

