import Image from 'next/image'
import React from 'react'
import ActiveMembers from './ActiveMembers'
import MyFriends from './MyFriends'


const PeopleTab = () => {
    return (
        <>
            <div className="activity-tabs mt-5">
                <ul className="nav nav-tabs border-0 " role="tablist">
                    <li className="nav-item nav-link active" id="ActiveMembers-tab" data-bs-toggle="tab" data-bs-target="#ActiveMembers" type="button" role="tab" aria-controls="ActiveMembers" aria-selected="false" tabIndex="-1">
                        Active Members <span className='comment-active ms-1'>1</span>
                    </li>
                    <li className="nav-item nav-link " id="MyFriends-tab" data-bs-toggle="tab" data-bs-target="#MyFriends" type="button" role="tab" aria-controls="MyFriends" aria-selected="false" tabIndex="-1">
                        My Friends <span className='comment-active ms-1'>7</span>
                    </li>

                </ul>
                <div className="tab-content ">
                    <div className="tab-pane fade active show" id="ActiveMembers" role="tabpanel" aria-labelledby="ActiveMembers-tab">
                        <ActiveMembers />
                    </div>
                    <div className="tab-pane fade " id="MyFriends" role="tabpanel" aria-labelledby="MyFriends-tab">
                        <MyFriends />
                    </div>

                </div>
            </div>
        </>
    )
}

export default PeopleTab