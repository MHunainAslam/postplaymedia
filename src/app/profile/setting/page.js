
import UserProfileLayout from '@/app/UserProfileLayout'
import Email from '@/components/userprofile/setting/Email'
import ExportData from '@/components/userprofile/setting/ExportData'
import General from '@/components/userprofile/setting/General'
import GroupInvites from '@/components/userprofile/setting/GroupInvites'
import ProfileVisibility from '@/components/userprofile/setting/ProfileVisibility'
import React from 'react'

const page = () => {
    return (
        <UserProfileLayout ProfilePages>
            <div className="mt-3 profile-tabs">
                <ul className="peopletab nav nav-tabs border-0 border-b-0  " role="tablist">
                    <li className="nav-item nav-link active text-center" id="General-tab" data-bs-toggle="tab" data-bs-target="#General" type="button" role="tab" aria-controls="General" aria-selected="false" tabIndex="-1">
                        <p className="para clr-text mb-0">General</p>
                    </li>
                    <li className="nav-item nav-link text-center" id="Email-tab" data-bs-toggle="tab" data-bs-target="#Email" type="button" role="tab" aria-controls="Email" aria-selected="false" tabIndex="-1">
                        <p className="para clr-text mb-0">Email</p>
                    </li>

                    <li className="nav-item nav-link text-center" id="UserProfileVisibility-tab" data-bs-toggle="tab" data-bs-target="#UserProfileVisibility" type="button" role="tab" aria-controls="UserProfileVisibility" aria-selected="false" tabIndex="-1">
                        <p className="para clr-text mb-0">Profile Visibility</p>
                    </li>
                    <li className="nav-item nav-link text-center" id="GroupInvites-tab" data-bs-toggle="tab" data-bs-target="#GroupInvites" type="button" role="tab" aria-controls="GroupInvites" aria-selected="false" tabIndex="-1">
                        <p className="para clr-text mb-0">Group Invites</p>
                    </li>
                    <li className="nav-item nav-link text-center" id="ExportData-tab" data-bs-toggle="tab" data-bs-target="#ExportData" type="button" role="tab" aria-controls="ExportData" aria-selected="false" tabIndex="-1">
                        <p className="para clr-text mb-0">Export Data</p>
                    </li>
                </ul>
            </div>
            <div className="tab-content ">
                <div className="tab-pane fade active show" id="General" role="tabpanel" aria-labelledby="General-tab">
                    <General />
                </div>
                <div className="tab-pane fade " id="Email" role="tabpanel" aria-labelledby="Email-tab">
                    <Email />
                </div>
                <div className="tab-pane fade " id="UserProfileVisibility" role="tabpanel" aria-labelledby="UserProfileVisibility-tab">
                    <ProfileVisibility />

                </div>
                <div className="tab-pane fade " id="GroupInvites" role="tabpanel" aria-labelledby="GroupInvites-tab">
                    <GroupInvites />
                </div>
                <div className="tab-pane fade " id="ExportData" role="tabpanel" aria-labelledby="ExportData-tab">
                    <ExportData />
                </div>
            </div>
        </UserProfileLayout>
    )
}

export default page