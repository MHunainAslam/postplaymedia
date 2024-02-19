'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { APP_URL, IMG_URL } from '../../../../config'
import { GetToken, imgurl } from '@/utils/Token'
import { useRouter } from 'next/navigation'
import { deleteCookie } from 'cookies-next'
import axios from 'axios'
import Loader from '@/components/Loader'
import Pagination from '@/components/jobs/Pagination'
import { useAppContext } from '@/context/AppContext'
import { joingrp } from '@/utils/GrpFunctions'

const GroupInv = ({ xl, md, lg }) => {
    const { UserProfiledata } = useAppContext()
    const [GrpInv, setGrpInv] = useState([])
    const router = useRouter()
    const token = GetToken('userdetail')
    const handlePageChangemine = (pageNumber) => {
        setCurrentPagemine(pageNumber);
        // setisLoading(true)
        console.log(pageNumber);
    };
    const [isLoading, setisLoading] = useState(true)
    const [dataOnPagemine, setdataOnPagemine] = useState(20)
    const [currentPagemine, setCurrentPagemine] = useState(1);
    const itemsPerPagemine = dataOnPagemine;
    const indexOfLastItemmine = currentPagemine * itemsPerPagemine;
    const indexOfFirstItemmine = indexOfLastItemmine - itemsPerPagemine;
    // console.log('mine grp', GrpInv);
    const getGrpInv = () => {
        axios.get(`${APP_URL}/api/get-my-group-invitations?status=pending&per_page=${dataOnPagemine}&page=${currentPagemine}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('inv grps mine', response);
                setGrpInv(response)

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
        getGrpInv()
    }, [dataOnPagemine, currentPagemine])

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
                getGrpInv()
            })
            .catch(error => {
                // Handle error here
                console.error(error);
            });
    }
    return (
        <>
            <div className="border-bottom row justify-content-between">
                <div className="col-lg-3 mb-3 col-md-6 ">
                    <div className=" search-inp mt-3">
                        <span className="input-group-text right-0" ><i className="bi bi-search"></i></span>
                        <input type="text" className="form-control " placeholder="Search Group" aria-label="Username" />
                    </div>
                </div>
                {/* <div className="col-lg-3 mb-3 col-md-6 ">
                    <div className=" search-inp mt-3 w-100">
                        <select name="" className='form-select mt-3 slct ' id="" >
                            <option value="">Last Active</option>
                            <option value="">Most Members</option>
                            <option value="">Newly Created</option>
                            <option value="">Alphabetical</option>
                        </select>
                    </div>
                </div> */}
            </div>
            <div className="row position-relative">
                {isLoading ? <Loader /> : <>
                    {GrpInv?.data?.data?.data?.length === 0 ? <p className='heading-sm text-center text-black my-5'>No Groups Found!</p> :
                        <>
                            {GrpInv?.data?.data?.data?.map((item, i) => (
                                <div className="col-xl-4 col-md-6 mt-3" key={i}>
                                    <div className="card people-card h-100">
                                        <div className="card-body">
                                            <div className="Grp-Bg bg-light">
                                                {item.group?.cover_photo === null ?
                                                    <div alt="" width={200} height={200} className='object-fit-contain w-25 Grp-Bg-img'></div>
                                                    :
                                                    <Image loader={imgurl} src={item.group?.cover_photo?.url} alt="" width={200} height={200} className='object-fit-cover w-100 Grp-Bg-img'></Image>
                                                }
                                                <div className='h-0'>
                                                    {item.group.profile_photo === null ?
                                                        <Image src={'/assets/images/avatar/group.png'} alt="" width={100} height={100} className='post-profile'></Image> :
                                                        <Image loader={imgurl} src={item.group?.profile_photo?.url} alt="" width={100} height={100} className='post-profile'></Image>
                                                    }
                                                </div>
                                            </div>
                                            <Link className='link-hov' href={`/groups/${item.group.id}`}><p className="heading text-black mb-2 mt-4">{item.group?.group_name}</p></Link>
                                            {/* <p className="heading text-black mb-2 mt-4">{item.group.group_name}</p> */}
                                            <div className="imgtoimg">
                                                {/* {item.some_members.map((item, i) => (
                                                    item.profile_photo === null ?
                                                        <Image key={i} src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile-sm'></Image>
                                                        : <Image key={i} loader={imgurl} src={item.profile_photo?.url} alt="" width={100} height={100} className='post-profile-sm object-fit-cover'></Image>


                                                ))} */}

                                            </div>
                                            <p className="para text-black mt-3 text-capitalize">{item.group?.privacy} Group / {item.group?.member_count} members</p>
                                        </div>
                                        <div className="card-footer">
                                            {UserProfiledata?.data?.id == item?.group?.created_by ?
                                                <button className='btn secondary-btn px-4' onClick={() => router.push(`/groups/${item.group?.id}`)}>View</button> :
                                                <>
                                                    {item?.button_trigger != 'accept-request' ?

                                                        <button className='btn secondary-btn ' onClick={
                                                            item?.button_trigger == 'join-now' ? () => joingrp({ e: item.group?.id, getallgrp: getallgrp, type: 'send' }) :
                                                                item?.button_trigger === 'withdrawl-request' ? () => joingrp({ e: item.group?.id, getallgrp: getallgrp, type: 'withdraw' }) :
                                                                    item?.button_trigger === 'view-group' ? () => router.push(`/groups/${item.group?.id}`) :
                                                                        ''
                                                        }>
                                                            <p className='mb-0 px-4'>
                                                                {
                                                                    item?.button_trigger == 'join-now' ? 'Join' :
                                                                        item?.button_trigger == 'withdrawl-request' ? 'Pending' :
                                                                            item?.button_trigger == 'pending' ? 'Cancel Request' :
                                                                                item?.button_trigger == 'view-group' ? 'View' :
                                                                                    ''}
                                                            </p>
                                                        </button>
                                                        : item?.button_trigger == 'accept-request' ?
                                                            <>
                                                                <button className='btn secondary-btn mx-1' onClick={() => accptgrpreq({ e: item.group?.id, endpoint: 'acceptInvite' })}>Accept</button>
                                                                <button className='btn secondary-btn mx-1' onClick={() => accptgrpreq({ e: item.group?.id, endpoint: 'rejectInvite' })}>Reject</button>
                                                            </>
                                                            : ''}
                                                </>}
                                            {/* <Link href={`/groups/${item.group?.id}`} className='btn secondary-btn '><p className='mb-0 px-4'>Visit</p></Link> */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    }
                </>

                }
            </div>
            {GrpInv?.data?.data?.data?.length > 0 &&
                <Pagination
                    dataOnPage={dataOnPagemine}
                    currentPage={currentPagemine}
                    totalPages={Math.ceil(GrpInv?.data?.data?.total / itemsPerPagemine)}
                    tabledata={GrpInv?.data?.data?.data}
                    onPageChange={handlePageChangemine}
                    indexOfFirstItem={indexOfFirstItemmine}
                    // currentData={currentData}
                    itemsPerPage={itemsPerPagemine}
                    indexOfLastItem={indexOfLastItemmine}
                />}
            {/* {UserDataLoader ? <Loader /> :
                <>
                    {AllFrndsData?.data?.message?.length ?
                        <>
                            {AllFrndsData?.data?.message?.map((item, i) => (
                                <div className={`col-${xl} col-${md} col-${lg} mt-3`} key={i}>
                                    <div className="card people-card">
                                        <div className="card-body">
                                            <div className="Grp-Bg">
                                                <Image src={'/assets/images/posts/covers.jpg'} alt="" width={500} height={500} className='Grp-Bg-img'></Image>

                                                <div className='h-0'>
                                                    <Image src={'/assets/images/avatar/group.png'} alt="" width={100} height={100} className='post-profile'></Image>
                                                </div>
                                            </div>
                                            <Link className='link-hov' href={'#'}><p className="heading text-black mb-2 mt-4">admin</p></Link>
                                            <div className="imgtoimg">
                                                <Link href={'#'}>
                                                    <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile-sm'></Image>
                                                </Link>
                                                <Link href={'#'}>
                                                    <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile-sm'></Image>
                                                </Link>

                                            </div>
                                            <p className="para text-black mt-3">Public Group / 2 members</p>
                                        </div>
                                        <div className="card-footer">
                                            <button className='btn secondary-btn m-1'><p className='mb-0 px-4'>Cancel</p></button>
                                            <button className='btn secondary-btn m-1'><p className='mb-0 px-4'>Accept</p></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                        : <div className="alert-box">
                            <p>No Group Invitations!</p>
                        </div>}
                </>
            } */}
        </>
    )
}

export default GroupInv

