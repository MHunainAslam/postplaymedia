import ProfileLayout from '@/app/ProfileLayout'

import MyGroups from '@/components/profile/groups/MyGroups'
import React from 'react'

const page = () => {
    return (
        <ProfileLayout ProfilePages>
            <div className="mt-3 profile-tabs">
                <ul className="peopletab nav nav-tabs border-0 border-b-0  " role="tablist">
                    <li className="nav-item nav-link active text-center" id="MyGroups-tab" data-bs-toggle="tab" data-bs-target="#MyGroups" type="button" role="tab" aria-controls="MyGroups" aria-selected="false" tabIndex="-1">
                        <p className="para clr-text mb-0">Groups</p>
                    </li>
                  


                </ul>
            </div>

            <div className="tab-content ">
                <div className="tab-pane fade active show" id="MyGroups" role="tabpanel" aria-labelledby="MyGroups-tab">
                    <MyGroups xl={'xl-4'} lg={'lg-6'} />
                </div>
             

            </div>
        </ProfileLayout>
    )
}

export default page