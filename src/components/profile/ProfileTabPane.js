import React from 'react'
import PeopleActivityTab from './PeopleActivity/PeopleActivityTab'

const ProfileTabPane = () => {
    return (
        <>
            <div className="tab-content ">
                <div className="tab-pane fade active show" id="PeopleActivity" role="tabpanel" aria-labelledby="PeopleActivity-tab">
                    <PeopleActivityTab />
                </div>
                <div className="tab-pane fade" id="PeopleProfile" role="tabpanel" aria-labelledby="PeopleProfile-tab">
                    <PeopleActivityTab />
                </div>
            </div>
        </>
    )
}

export default ProfileTabPane