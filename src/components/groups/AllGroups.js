import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Pagination from '../jobs/Pagination'
import Loader from '../Loader'
import { IMG_URL } from '../../../config'
import { imgurl } from '@/utils/Token'

const AllGroups = ({
    Allgrp, isLoading, joingrp,
    reqjoingrp,
    canceljoingrp,
    viewgrp,
    accptgrpreq,
}) => {
    return (

        <>
            <div className="border-bottom row justify-content-between">
                <div className="col-lg-3 mb-3 col-md-6 ">
                    <div className=" search-inp mt-3">
                        <span className="input-group-text right-0" ><i className="bi bi-search"></i></span>
                        <input type="text" className="form-control " placeholder="Search Member" aria-label="Username" />
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
                    {Allgrp?.data?.data?.data?.length === 0 ? <p className='heading-sm text-center text-black my-5'>No Groups Found!</p> :
                        <>
                            {Allgrp?.data?.data?.data?.map((item, i) => (
                                <div className="col-xl-4 col-md-6 mt-3" key={i}>
                                    <div className="card people-card h-100">
                                        <div className="card-body">
                                            <div className="Grp-Bg bg-light">
                                                {item.cover_photo === null ?
                                                    <div alt="" width={200} height={200} className='object-fit-contain w-25 Grp-Bg-img'></div>
                                                    :
                                                    <Image loader={imgurl} src={item.cover_photo?.url} alt="" width={200} height={200} className='object-fit-cover w-100 Grp-Bg-img'></Image>
                                                }
                                                <div className='h-0'>
                                                    {item.profile_photo === null ?
                                                        <Image src={'/assets/images/avatar/group.png'} alt="" width={100} height={100} className='post-profile'></Image> :
                                                        <Image loader={imgurl} src={item.profile_photo?.url} alt="" width={100} height={100} className='post-profile'></Image>
                                                    }
                                                </div>
                                            </div>
                                            <Link className='link-hov' href={`groups/${item.id}`}><p className="heading text-black mb-2 mt-4">{item.group_name}</p></Link>
                                            {/* <p className="para clr-light">Active 2 minutes ago</p> */}
                                            <div className="imgtoimg">
                                                {item.some_members.map((item, i) => (
                                                    <>
                                                        {item.profile_photo === null ?
                                                            <Image src={'/assets/images/Modal/Avatar.png'} alt="" width={100} height={100} className='post-profile-sm'></Image>
                                                            : <Image src={item.profile_photo?.url} alt="" width={100} height={100} className='post-profile-sm'></Image>

                                                        }
                                                    </>
                                                ))}

                                            </div>
                                            <p className="para text-black mt-3 text-capitalize">{item.privacy} Group / {item.member_count} members</p>
                                        </div>
                                        <div className="card-footer">
                                            <button className='btn secondary-btn ' onClick={
                                                item.button_trigger === 'join-now' ? () => joingrp(item.id) :
                                                    item.button_trigger === 'send-request' ? reqjoingrp :
                                                        item.button_trigger === 'pending' ? canceljoingrp :
                                                            item.button_trigger === 'view-group' ? () => viewgrp(item.id) :
                                                                item.button_trigger === 'accept-request' ? accptgrpreq :
                                                                    ''
                                            }>
                                                <p className='mb-0 px-4'>
                                                    {
                                                        item.button_trigger === 'join-now' ? 'Join' :
                                                            item.button_trigger === 'send-request' ? 'Request to Join' :
                                                                item.button_trigger === 'pending' ? 'Cancel Request' :
                                                                    item.button_trigger === 'view-group' ? 'View' :
                                                                        item.button_trigger === 'accept-request' ? 'Accept Request' :
                                                                            ''}
                                                </p>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    }
                </>
                }


            </div>

        </>
    )
}

export default AllGroups