'use client'
import { GetToken, imgurl } from '@/utils/Token'
import { deleteCookie } from 'cookies-next'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { APP_URL } from '../../../config'
import axios from 'axios'
import { useAppContext } from '@/context/AppContext'
import Pagination from '../jobs/Pagination'
import Loader from '../Loader'
import Link from 'next/link'

const Invitetabs = ({ setinviteuserid }) => {
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

    const handleCardSelect = (card) => {
        const isSelected = selectedCards.find((selected) => selected.friend?.id === card.friend?.id || selected.id === card.id);
        console.log(selectedCards);
        if (isSelected) {
            const updatedSelected = selectedCards.filter((selected) => selected.id !== card.id || selected.id !== card.friend?.id);
            setSelectedCards(updatedSelected);
            console.log('tt');
        } else {
            setSelectedCards([...selectedCards, card]);
        }
    };
    const handleCardSelectuser = (card) => {
        const isSelected = selectedCards.find((selected) => selected.id === card.id || selected.friend?.id === card.id);
        console.log(selectedCards);

        if (isSelected) {
            const updatedSelected = selectedCards.filter((selected) => selected.id !== card.id);
            setSelectedCards(updatedSelected);
        } else {
            setSelectedCards([...selectedCards, card]);
        }
    };

    const handleSendInvitations = () => {
        console.log('Sending invitations:', selectedCards);
    };
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

    const unselectItem = (item) => {
        // Remove the item from SelectedMembers
        console.log('rmove3', selectedCards, item);
        setSelectedCards((prevSelected) =>
            prevSelected.filter((selectedItem) => selectedItem?.id !== item.friend?.id && selectedItem?.friend?.id !== item.friend?.id)
        );
    };
    const unselectItemuser = (item) => {
        // Remove the item from SelectedMembers
        console.log('rmove3');
        setSelectedCards((prevSelected) =>
            prevSelected.filter((selectedItem) => selectedItem?.id !== item.id && selectedItem?.friend?.id !== item?.id)
        );
    };

    useEffect(() => {
        console.log(selectedCards.map((item) => (
            item.friend?.id ? item.friend?.id : item.id
        )), 'laa');
        setinviteuserid(selectedCards.map((item) => (
            item.friend?.id ? item.friend?.id : item.id
        )))



    }, [selectedCards])

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
                    {selectedCards.length > 0 ?
                        <li className="nav-item nav-link " id="SendInvite-tab" data-bs-toggle="tab" data-bs-target="#SendInvite" type="button" role="tab" aria-controls="SendInvite" aria-selected="false" tabIndex="-1">
                            Send Invites <span className="comment-active ms-1">{selectedCards.length}</span>
                        </li>
                        : ''}

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
                       
                        {MyFriends.length === 0 ? <p className='text-center my-3'>No Friends Found!</p> : <>
                            {MyFriends.data.data.data.filter(user => user.friendship_status === 'friends').map((card, i) => (
                                <div className="card rounded-5 mt-3" key={i} id={card.id}>
                                    <div className="card-body align-items-center d-flex justify-content-between py-2">
                                        <div className="d-flex align-items-center ">
                                            {card.profile_photo === null ?
                                                <Image src={`/assets/images/Modal/Avatar.png`} alt="" width={100} height={100} className='post-profile'></Image>
                                                : <Image loader={imgurl} src={card.profile_photo.url} alt="" width={100} height={100} className='post-profile object-fit-cover'></Image>}   <p className='papa mb-0 clr-text fw-bold ms-2'>{card.name}</p>
                                        </div>
                                        {/* <button className='btn secondary-btn px-4 py-0 addorremoveinv ' onClick={() => handleCardSelect(card)}>
                                    {selectedCards.find((selected) => selected.id === card.id || selected.friend?.id === card.id)
                                        ? <i className="bi bi-dash-circle"></i>
                                        : <i className="bi bi-plus-circle"></i>}

                                </button> */}
                                        {selectedCards.some((selectedItem) => selectedItem.friend?.id === card.id || selectedItem.id === card.id) ?
                                            <button className='btn secondary-btn px-4 py-0 addorremoveinv addorremoveinvfrnd' onClick={() => unselectItemuser(card)}><i className="bi bi-dash-circle"></i></button>
                                            : <button className='btn secondary-btn px-4 py-0 addorremoveinv addorremoveinvfrnd' onClick={() => toggleSelect(card)}><i className="bi bi-plus-circle"></i></button>
                                        }
                                    </div>
                                </div>
                            ))}
                            <Pagination
                                dataOnPage={dataOnPagef}
                                currentPage={currentPagef}
                                totalPages={Math.ceil(MyFriends?.data.data.total / itemsPerPagef)}
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
                                                : <Image loader={imgurl} src={card.profile_photo.url} alt="" width={100} height={100} className='post-profile object-fit-cover'></Image>}  
                                                <p className='papa mb-0 clr-text fw-bold ms-2'>{card.name}</p>
                                        </div>
                                      
                                        {selectedCards.some((selectedItem) => selectedItem.friend?.id === card.id || selectedItem.id === card.id) ?
                                            <button className='btn secondary-btn px-4 py-0 addorremoveinv addorremoveinvfrnd' onClick={() => unselectItemuser(card)}><i className="bi bi-dash-circle"></i></button>
                                            : <button className='btn secondary-btn px-4 py-0 addorremoveinv addorremoveinvfrnd' onClick={() => toggleSelect(card)}><i className="bi bi-plus-circle"></i></button>
                                        }
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

                    <div className="tab-pane fade " id="SendInvite" role="tabpanel" aria-labelledby="SendInvite-tab">
                        <div className="d-flex flex-wrap ">
                            {selectedCards.length > 0 ? (
                                selectedCards.map((selectedCard, i) => (
                                    <>
                                        <div>
                                            <div className='mx-2 mt-2' key={i}>

                                                {selectedCard.friend ? <>
                                                    {selectedCard.friend.profile_photo === null ?
                                                        <Image src={`/assets/images/Modal/Avatar.png`} alt="" width={100} height={100} className='post-profile'></Image>
                                                        :
                                                        <Image loader={imgurl} src={selectedCard.friend.profile_photo.url} title={selectedCard.friend.name} alt="" width={100} height={100} className='post-profile object-fit-cover' onClick={() => handleCardSelect(selectedCard)}></Image>
                                                    }
                                                </> : <>
                                                    {selectedCard.profile_photo === null ?
                                                        <Image src={`/assets/images/Modal/Avatar.png`} alt="" width={100} height={100} className='post-profile'></Image>
                                                        :
                                                        <Image loader={imgurl} src={selectedCard.profile_photo.url} title={selectedCard.name} alt="" width={100} height={100} className='post-profile object-fit-cover' onClick={() => handleCardSelect(selectedCard)}></Image>
                                                    }
                                                </>}

                                            </div>
                                            {selectedCard.friend ?
                                                <p className='para-sm text-center'>{selectedCard.friend.name}</p> :
                                                <p className='para-sm text-center'>{selectedCard.name}</p>
                                            }
                                        </div>
                                    </>
                                ))
                            ) : (
                                <p className='mt-3'>Group Invitations Cleared</p>
                            )}
                        </div>
                        {selectedCards.length > 0 ?
                            <>

                                {/* <textarea name="" className='form-control my-3 area' id="" cols="30" rows="10" ></textarea> */}

                            </>
                            : ''}
                    </div>


                </div>
            </div>
        </>
    )
}

export default Invitetabs