'use client'
import { GetToken, imgurl } from '@/utils/Token'
import { deleteCookie } from 'cookies-next'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

import axios from 'axios'
import { useAppContext } from '@/context/AppContext'
import { APP_URL } from '../../../../config'
import Pagination from '@/components/jobs/Pagination'
import Loader from '@/components/Loader'
import { grpContext } from '@/app/GroupLayout'
import { message } from 'antd'
import Link from 'next/link'

const JoinReq = () => {
    const { grpdata } = useContext(grpContext)
    const { groupbyid } = useParams()
    const token = GetToken('userdetail')
    const { UserProfiledata, UserProfileloader } = useAppContext()
    const router = useRouter()
    const [selectedCards, setSelectedCards] = useState([]);
    const [AllMembers, setAllMembers] = useState([]);
    const [MyFriends, setMyFriends] = useState([]);
    const [dataOnPage, setdataOnPage] = useState(20)
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setisLoading] = useState(true)
    const itemsPerPage = dataOnPage;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const [dataOnPagef, setdataOnPagef] = useState(200)
    const [currentPagef, setCurrentPagef] = useState(1);
    const [isLoadingf, setisLoadingf] = useState(true)
    const [participents, setparticipents] = useState(grpdata?.data?.participants?.participants)
    const [participentsd, setparticipentsd] = useState([{ id: 1 }, { id: 12 }])
    const itemsPerPagef = dataOnPagef;

    const indexOfLastItemf = currentPagef * itemsPerPagef;
    const indexOfFirstItemf = indexOfLastItemf - itemsPerPagef;
    const requeests = () => {
        axios.get(`${APP_URL}/api/groups/getAllGroupRequestsByGroupId/${groupbyid}?per_page=${dataOnPagef}&page=${currentPagef}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('grp inv req', response);
                setMyFriends(response)
            })
            .catch(error => {
                console.error(error);
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }
    useEffect(() => {
        requeests()
    }, [dataOnPagef, currentPagef])

    const handlePageChangef = (pageNumber) => {
        setCurrentPagef(pageNumber);
        // setisLoading(true)
        console.log(pageNumber);
    };


    const accptgrpreq = (e, u_id,) => {

        axios.patch(`${APP_URL}/api/${e}`, { user_id: u_id, group_id: groupbyid }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                requeests()
                console.log('grp inv req accept', response);
                message.success(response.data.message)
            })
            .catch(error => {
                console.error(error);
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }
    return (
        <>
            <div className="activity-tabs mt-2">
                <ul className="nav nav-tabs border-0 " role="tablist">
                    <li className="nav-item nav-link active" id="GrpReqTab-tab" data-bs-toggle="tab" data-bs-target="#GrpReqTab" type="button" role="tab" aria-controls="GrpReqTab" aria-selected="false" tabIndex="-1">
                        Join Request
                    </li>


                </ul>
                <div className="tab-content ">
                    <div className="tab-pane fade active show" id="GrpReqTab" role="tabpanel" aria-labelledby="GrpReqTab-tab">


                        {MyFriends?.data?.data?.data?.length === 0 ? <div className="alert-box mt-3 text-center"> <p className='text-center '>No Request Found!</p></div> : <>
                            {MyFriends?.data?.data?.data?.map((card, i) => (
                                <div className="card rounded-5 mt-3" key={i} id={card.id}>
                                    <div className="card-body align-items-center d-flex justify-content-between py-2">
                                        <Link href={`/people/${card.sender?.id}/activity`} className="d-flex align-items-center link-hov">
                                            {card.sender?.profile_photo === null ?
                                                <Image src={`/assets/images/Modal/Avatar.png`} alt="" width={100} height={100} className='post-profile'></Image>
                                                : <Image loader={imgurl} src={card.sender?.profile_photo?.url} alt="" width={100} height={100} className='post-profile object-fit-cover'></Image>}   <p className='papa mb-0 clr-text fw-bold ms-2'>{card.sender.name}</p>
                                        </Link>
                                        <div className="d-flex">
                                            <button className='btn secondary-btn px-4 me-2 py-0 addorremoveinv addorremoveinvfrnd' onClick={() => accptgrpreq('reject-group-request', card.sender?.id)}><i class="bi bi-x-circle"></i></button>
                                            <button className='btn secondary-btn px-4 py-0 addorremoveinv addorremoveinvfrnd' onClick={() => accptgrpreq('accept-group-request', card.sender?.id)}><i class="bi bi-check-circle"></i></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <Pagination
                                dataOnPage={dataOnPagef}
                                currentPage={currentPagef}
                                totalPages={Math.ceil(MyFriends?.data?.data?.total / itemsPerPagef)}
                                tabledata={MyFriends?.data?.data?.data}
                                onPageChange={handlePageChangef}
                                indexOfFirstItem={indexOfFirstItemf}
                                // currentData={currentData}
                                itemsPerPage={itemsPerPagef}
                                indexOfLastItem={indexOfLastItemf}
                            />
                        </>}
                    </div>









                </div>
            </div>
        </>
    )
}

export default JoinReq
