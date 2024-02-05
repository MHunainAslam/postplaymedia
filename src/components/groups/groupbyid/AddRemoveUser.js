'use client'
import { GetToken, imgurl } from '@/utils/Token'
import { deleteCookie } from 'cookies-next'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

import axios from 'axios'
import { useAppContext } from '@/context/AppContext'
import { APP_URL } from '../../../../config'
import Pagination from '@/components/jobs/Pagination'
import Loader from '@/components/Loader'
import { grpContext } from '@/app/GroupLayout'
import { message } from 'antd'

const AddRemoveUser = ({ setinviteuserid }) => {
    const { grpdata } = useContext(grpContext)
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
    useEffect(() => {
        axios.get(`${APP_URL}/api/users?per_page=${dataOnPagef}&page=${currentPagef}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('grp frnds', response);
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
    }, [dataOnPagef, currentPagef])
    useEffect(() => {
        setisLoading(true)
        axios.get(`${APP_URL}/api/users?per_page=${dataOnPage}&page=${currentPage}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                const aa = response.data.data.data.filter(user => user.friendship_status === 'friends')
                console.log('filter', aa)
                console.log('grp users', response);
                setAllMembers(response)
                setisLoading(false)
            })
            .catch(error => {
                console.error(error);
                setisLoading(false)
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }, [dataOnPage, currentPage])

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // setisLoading(true)
        console.log(pageNumber);
    };
    const handlePageChangef = (pageNumber) => {
        setCurrentPagef(pageNumber);
        // setisLoading(true)
        console.log(pageNumber);
    };

    useEffect(() => {
        console.log(selectedCards.map((item) => (
            item.friend?.id ? item.friend?.id : item.id
        )), 'laa');
        setinviteuserid(selectedCards.map((item) => (
            item.friend?.id ? item.friend?.id : item.id
        )))



    }, [selectedCards])

    const sendinv = (e, type) => {
        axios.post(`${APP_URL}/api/groups/${grpdata?.data?.group?.id}`, { user_id: e, type: type }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('send inv', response);


            })
            .catch(error => {
                console.error(error);
                message.error(error?.response.data?.message)
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }
    const removeinv = (e) => {
        axios.post(`${APP_URL}/api/groups/${grpdata?.data?.group?.id}`, { user_id: e, type: 'remove' }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('removve inv', response);


            })
            .catch(error => {
                console.error(error);
                message.error(error?.response.data?.message)
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }
    const [selectedMembers, setSelectedMembers] = useState([]);
    const toggleSelect = (item) => {
        // Check if the item is already selected
        const isSelected = selectedMembers.some((selectedItem) => selectedItem.id === item.id);
        console.log('select');
        if (isSelected) {
            // If selected, remove it
            setSelectedCards((prevSelected) =>
                prevSelected.filter((selectedItem) => selectedItem.id !== item.id)

            );
            console.log('rmove');
        } else {
            // If not selected, add it
            console.log('rmove2');
            setSelectedCards((prevSelected) => [...prevSelected, item]);
        }
        console.log(selectedCards);
    };
    const unselectItemuser = (item) => {
        // Remove the item from SelectedMembers
        console.log('rmove3');
        setSelectedCards((prevSelected) =>
            prevSelected.filter((selectedItem) => selectedItem?.id !== item.id && selectedItem?.friend?.id !== item?.id)
        );
    };
    return (
        <>
            <div className="activity-tabs mt-2">
                <ul className="nav nav-tabs border-0 " role="tablist">
                    <li className="nav-item nav-link active" id="InviteMyFriends-tab" data-bs-toggle="tab" data-bs-target="#InviteMyFriends" type="button" role="tab" aria-controls="InviteMyFriends" aria-selected="false" tabIndex="-1">
                        My Friends
                    </li>
                    <li className="nav-item nav-link " id="InviteAllMembers-tab" data-bs-toggle="tab" data-bs-target="#InviteAllMembers" type="button" role="tab" aria-controls="InviteAllMembers" aria-selected="false" tabIndex="-1">
                        All Members
                    </li>

                </ul>
                <div className="tab-content ">
                    <div className="tab-pane fade active show" id="InviteMyFriends" role="tabpanel" aria-labelledby="InviteMyFriends-tab">
                        <div className="border-bottom ">
                            <div className="col-lg-3 mb-3 col-md-6 ">
                                <div className=" search-inp mt-3">
                                    <span className="input-group-text right-0" ><i className="bi bi-search "></i></span>
                                    <input type="text" className="form-control " placeholder="Search" aria-label="Username" />
                                </div>
                            </div>
                        </div>

                        {MyFriends?.data?.data?.data?.filter(user => user?.friendship_status === 'friends').length === 0 ? <p className='text-center my-3'>No Friends Found!</p> : <>
                            {MyFriends?.data?.data?.data?.filter(user => user?.friendship_status === 'friends').map((card, i) => (
                                <div className="card rounded-5 mt-3" key={i} id={card.id}>
                                    <div className="card-body align-items-center d-flex justify-content-between py-2">
                                        <div className="d-flex align-items-center ">
                                            {card.profile_photo === null ?
                                                <Image src={`/assets/images/Modal/Avatar.png`} alt="" width={100} height={100} className='post-profile'></Image>
                                                : <Image loader={imgurl} src={card.profile_photo.url} alt="" width={100} height={100} className='post-profile object-fit-cover'></Image>}   <p className='papa mb-0 clr-text fw-bold ms-2'>{card.name}</p>
                                        </div>
                                        {participents?.map(item => item.user?.id).includes(card.id) ?
                                            // <button className='btn secondary-btn px-4 py-0 addorremoveinv addorremoveinvfrnd' onClick={() => { unselectItemuser(card), sendinv({ e: card.id, type: 'remove' }) }} ><i className="bi bi-x-circle"></i></button>
                                            ''
                                            : <>
                                                {selectedCards.some((selectedItem) => selectedItem.id === card.id) ?
                                                    <button className='btn secondary-btn px-4 py-0 addorremoveinv addorremoveinvfrnd' onClick={() => { unselectItemuser(card), sendinv(card.id, 'remove') }}><i className="bi bi-dash-circle"></i></button> :
                                                    <button className='btn secondary-btn px-4 py-0 addorremoveinv addorremoveinvfrnd' onClick={() => { toggleSelect(card), sendinv(card.id, 'add') }}><i className="bi bi-plus-circle"></i></button>
                                                }
                                            </>}
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





                    <div className="tab-pane fade position-relative " id="InviteAllMembers" role="tabpanel" aria-labelledby="InviteAllMembers-tab">
                        <div className="border-bottom ">
                            <div className="col-lg-3 mb-3 col-md-6 ">
                                <div className=" search-inp mt-3">
                                    <span className="input-group-text right-0" ><i className="bi bi-search "></i></span>
                                    <input type="text" className="form-control " placeholder="Search" aria-label="Username" />
                                </div>
                            </div>
                        </div>
                        {isLoading ? <Loader /> : <>
                            {AllMembers?.data?.data?.data?.map((card, i) => (
                                <div className="card rounded-5 mt-3" key={i} id={card.id}>
                                    <div className="card-body align-items-center d-flex justify-content-between py-2">
                                        <div className="d-flex align-items-center ">
                                            {card.profile_photo === null ?
                                                <Image src={`/assets/images/Modal/Avatar.png`} alt="" width={100} height={100} className='post-profile'></Image>
                                                : <Image loader={imgurl} src={card.profile_photo.url} alt="" width={100} height={100} className='post-profile object-fit-cover'></Image>}   <p className='papa mb-0 clr-text fw-bold ms-2'>{card.name}</p>
                                        </div>
                                        {UserProfiledata?.data?.id === card.id ? '' : participents?.map(item => item.user?.id).includes(card.id) ?
                                            ''
                                            : <>
                                                {selectedCards.some((selectedItem) => selectedItem.id === card.id) ?
                                                    <button className='btn secondary-btn px-4 py-0 addorremoveinv addorremoveinvfrnd' onClick={() => { unselectItemuser(card), sendinv(card.id, 'remove') }}><i className="bi bi-dash-circle"></i></button> :
                                                    <button className='btn secondary-btn px-4 py-0 addorremoveinv addorremoveinvfrnd' onClick={() => { toggleSelect(card), sendinv(card.id, 'add') }}><i className="bi bi-plus-circle"></i></button>
                                                }
                                            </>}
                                    </div>
                                </div>
                            ))}
                        </>}
                        <Pagination
                            dataOnPage={dataOnPage}
                            currentPage={currentPage}
                            totalPages={Math.ceil(AllMembers?.data?.data?.total / itemsPerPage)}
                            tabledata={AllMembers?.data?.data?.data}
                            onPageChange={handlePageChange}
                            indexOfFirstItem={indexOfFirstItem}
                            // currentData={currentData}
                            itemsPerPage={itemsPerPage}
                            indexOfLastItem={indexOfLastItem}
                        />
                    </div>




                </div>
            </div>
        </>
    )
}

export default AddRemoveUser
