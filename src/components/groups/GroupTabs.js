import Image from 'next/image'
import React from 'react'
import AllGroups from './AllGroups'
import MyGroups from './MyGroups'
import CreateGroups from './CreateGroups'


const GroupTabs = () => {
    return (
        <>
            <div className="activity-tabs mt-5">
                <ul className="nav nav-tabs border-0 " role="tablist">
                    <li className="nav-item nav-link active" id="AllGroups-tab" data-bs-toggle="tab" data-bs-target="#AllGroups" type="button" role="tab" aria-controls="AllGroups" aria-selected="false" tabIndex="-1">
                        All Groups <span className='comment-active ms-1'>1</span>
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
                        <AllGroups />
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

