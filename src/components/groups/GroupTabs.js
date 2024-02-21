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
import { message } from 'antd'
import { useAppContext } from '@/context/AppContext'


const GroupTabs = () => {
    const router = useRouter()
    const token = GetToken('userdetail')
    const [GrpBtn, setGrpBtn] = useState()
    const [GrpSearch, setGrpSearch] = useState('')

    const [runminegrp, setrunminegrp] = useState(true)
    const [minegrpcount, setminegrpcount] = useState()
    const [Allgrp, setAllgrp] = useState([])
    const [isLoading, setisLoading] = useState(true)
    const [dataOnPage, setdataOnPage] = useState(18)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = dataOnPage;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const { UserProfiledata, UserProfileloader } = useAppContext()
    const getallgrp = () => {

        axios.get(`${APP_URL}/api/groups?per_page=${dataOnPage}&page=${currentPage}&search=${GrpSearch}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('all grps cc', response);
                setAllgrp(response)
                setisLoading(false)
                setGrpBtn(response.data.data.data.map((item) => (item.button_trigger)))
            })
            .catch(error => {
                setisLoading(false)
                console.error(error);
                console.log('grp error')
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }

    useEffect(() => {
        setisLoading(true)
        getallgrp()
    }, [dataOnPage, currentPage, GrpSearch])

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // setisLoading(true)
        console.log(pageNumber);
    };


    const reqjoingrp = (e) => {
        axios.post(`${APP_URL}/api/groups/sendRequest`, { group_id: e, type: 'withdraw' }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                // Handle successful response here
                message.success(response.data.message)
                console.log(response.data);
                getallgrp()
            })
            .catch(error => {
                // Handle error here
                message.error(error.response?.data?.message)
                console.error(error);
            });
    }
    const canceljoingrp = () => {
        console.log('3');
    }

    const accptgrpreq = ({ e, endpoint }) => {
        axios.post(`${APP_URL}/api/groups/${endpoint}`, {
            user_id: UserProfiledata?.data?.id,
            group_id: e
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                // Handle successful response here
                console.log('accept grp inv', response.data);
                getallgrp()
            })
            .catch(error => {
                // Handle error here
                console.error(error);
            });
    }
    return (
        <>
            <div className="activity-tabs mt-5">
                <ul className="nav nav-tabs border-0 " role="tablist">
                    <li className="nav-item nav-link active" id="AllGroups-tab" data-bs-toggle="tab" data-bs-target="#AllGroups" type="button" role="tab" aria-controls="AllGroups" aria-selected="false" tabIndex="-1" onClick={() => { getallgrp(), setCurrentPage(1) }}>
                        All Groups <span className='comment-active ms-1'>{Allgrp?.data?.data?.total}</span>
                    </li>
                    <li className="nav-item nav-link " id="MyGroups-tab" data-bs-toggle="tab" data-bs-target="#MyGroups" type="button" role="tab" aria-controls="MyGroups" aria-selected="false" tabIndex="-1" onClick={() => setrunminegrp(!runminegrp)}>
                        My Groups <span className='comment-active ms-1'>{minegrpcount}</span>
                    </li>
                    <li className="nav-item nav-link " id="CreateGrp-tab" data-bs-toggle="tab" data-bs-target="#CreateGrp" type="button" role="tab" aria-controls="CreateGrp" aria-selected="false" tabIndex="-1">
                        Create a Group
                    </li>

                </ul>
                <div className="tab-content ">
                    <div className="tab-pane fade active show" id="AllGroups" role="tabpanel" aria-labelledby="AllGroups-tab">
                        <AllGroups setGrpSearch={setGrpSearch} GrpSearch={GrpSearch} Allgrp={Allgrp} isLoading={isLoading} getallgrp={getallgrp} reqjoingrp={reqjoingrp} canceljoingrp={canceljoingrp} accptgrpreq={accptgrpreq} />
                        {Allgrp?.data?.data?.data?.length > 0 &&
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
                        }
                    </div>
                    <div className="tab-pane fade " id="MyGroups" role="tabpanel" aria-labelledby="MyGroups-tab">
                        <MyGroups setminegrpcount={setminegrpcount} runminegrp={runminegrp} />

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

