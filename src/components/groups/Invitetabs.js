'use client'
import { GetToken, imgurl } from '@/utils/Token'
import { deleteCookie } from 'cookies-next'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { APP_URL } from '../../../config'
import axios from 'axios'

const Invitetabs = ({ withFriendIdArray, setinviteuserid }) => {
    const token = GetToken('userdetail')
    const router = useRouter()
    const [selectedCards, setSelectedCards] = useState([]);
    const [AllMembers, setAllMembers] = useState([]);
    const [MyFriends, setMyFriends] = useState([]);
    useEffect(() => {
        axios.get(`${APP_URL}/api/friendships`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('grp frnds', response);
                setMyFriends(response.data.message)
            })
            .catch(error => {
                console.error(error);
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }, [])
    useEffect(() => {
        axios.get(`${APP_URL}/api/users`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('grp users', response);
                setAllMembers(response.data.data)
            })
            .catch(error => {
                console.error(error);
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }, [])


    // const MyFriends = [
    //     { id: 1, title: 'champ', img: '/assets/images/Modal/Avatar.png' },
    //     { id: 2, title: 'John', img: '/assets/images/Modal/Avatar.png' },
    //     { id: 3, title: 'Nick', img: '/assets/images/Modal/Avatar.png' },

    // ];
    // const AllMembers = [
    //     { id: 'all1', title: 'champ', img: '/assets/images/Modal/Avatar.png' },
    //     { id: 'all2', title: 'John', img: '/assets/images/Modal/Avatar.png' },
    //     { id: 'all3', title: 'Nick', img: '/assets/images/Modal/Avatar.png' },

    // ];

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
        console.log('rmove3');
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
        )), 'l');
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
                        {/* {AllMembers.map((card, i) => (
                            <div className={`card rounded-5 mt-3 ${selectedCards.some((selectedItem) => selectedItem.id === card.id) ? 'bg-black' : ''}`} key={i} id={card.id}>
                                <button onClick={() => toggleSelect(card)}>Select {card.id} {selectedCards.some((selectedItem) => selectedItem.id === card.id) ? 'bg-block' : ''}</button>
                                <button onClick={() => unselectItem(card)}>Unselect</button>
                            </div>
                        ))}
                        ccc
                        {MyFriends.map((card, i) => (
                            <div className={`card rounded-5 py-5 mt-3 ${selectedCards.some((selectedItem) => selectedItem.id === card.friend.id) ? 'bg-block' : ''}`} key={i} id={card.friend.id}>
                                <button onClick={() => toggleSelect(card)}>Select {card.friend.id} {selectedCards.some((selectedItem) => selectedItem.id === card.friend.id) ? 'bg-block' : ''}</button>
                                <button onClick={() => unselectItem(card)}>Unselect</button>
                            </div>
                        ))} */}
                        {MyFriends.length === 0 ? <p className='text-center my-3'>No Friends Found!</p> : <>
                            {MyFriends.map((card, i) => (
                                <div className="card rounded-5 mt-3" key={i} id={card.friend.id}>
                                    <div className="card-body align-items-center d-flex justify-content-between py-2">
                                        <div className="d-flex align-items-center ">
                                            {card.friend.profile_photo === null ?
                                                <Image src={`/assets/images/Modal/Avatar.png`} alt="" width={100} height={100} className='post-profile'></Image>
                                                : <Image loader={imgurl} src={card.friend.profile_photo.url} alt="" width={100} height={100} className='post-profile object-fit-cover'></Image>}
                                            <p className='papa mb-0 clr-text fw-bold ms-2'>{card.friend.name}</p>
                                        </div>
                                        {/* <button className='btn secondary-btn px-4 py-0 addorremoveinv addorremoveinvfrnd' onClick={() => handleCardSelect(card)}>
                                            {selectedCards.find((selected) => selected.friend?.id === card.friend?.id || selected.id === card.friend.id)
                                                ? <i className="bi bi-dash-circle"></i>
                                                : <i className="bi bi-plus-circle"></i>}

                                        </button> */}
                                        {selectedCards.some((selectedItem) => selectedItem.friend?.id === card.friend?.id || selectedItem?.id === card.friend?.id) ?
                                            <button className='btn secondary-btn px-4 py-0 addorremoveinv addorremoveinvfrnd' onClick={() => unselectItem(card)}><i className="bi bi-dash-circle"></i></button> :
                                            <button className='btn secondary-btn px-4 py-0 addorremoveinv addorremoveinvfrnd' onClick={() => toggleSelect(card)}><i className="bi bi-plus-circle"></i></button>}


                                        {/* <button onClick={() => toggleSelect(card.friend.id)}>s</button> */}
                                    </div>
                                </div>
                            ))}
                        </>}
                    </div>





                    <div className="tab-pane fade " id="InviteAllMembers" role="tabpanel" aria-labelledby="InviteAllMembers-tab">
                        <div className="border-bottom ">
                            <div className="col-lg-3 mb-3 col-md-6 ">
                                <div className=" search-inp mt-3">
                                    <span className="input-group-text right-0" ><i className="bi bi-search "></i></span>
                                    <input type="text" className="form-control " placeholder="Search" aria-label="Username" />
                                </div>
                            </div>
                        </div>
                        {AllMembers.map((card, i) => (
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
                                <p className="para fw-bold clr-text mt-3">
                                    Optional: add a message to your invite.
                                </p>
                                {/* <textarea name="" className='form-control my-3 area' id="" cols="30" rows="10" ></textarea> */}
                                <div className="d-flex ">
                                    <button className='btn primary-btn px-3'><p>Send</p></button>
                                    <button className='btn secondary-btn px-3 ms-2' onClick={() => { setSelectedCards([]) }}>Cancel</button>
                                </div>
                            </>
                            : ''}
                    </div>


                </div>
            </div>
        </>
    )
}

export default Invitetabs