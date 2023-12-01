import ProfileLayout from '@/app/ProfileLayout'
import UserProfileLayout from '@/app/UserProfileLayout'
import ChangeCoverPhoto from '@/components/userprofile/PeopleProfileTab/ChangeCoverPhoto'
import PeopleChangeProfile from '@/components/userprofile/PeopleProfileTab/PeopleChangeProfile'
import PeopleProfileEdit from '@/components/userprofile/PeopleProfileTab/PeopleProfileEdit'
import React from 'react'

const page = () => {
    return (
        <UserProfileLayout ProfilePages>
            <div className="mt-3 profile-tabs">
                <ul className="peopletab nav nav-tabs border-0 border-b-0  " role="tablist">

                    <li className="nav-item nav-link text-center active" id="UserProfileEdit-tab" data-bs-toggle="tab" data-bs-target="#UserProfileEdit" type="button" role="tab" aria-controls="UserProfileEdit" aria-selected="false" tabIndex="-1">
                        <p className="para clr-text mb-0">Edit</p>
                    </li>

                    <li className="nav-item nav-link text-center UserProfileChangeProfilePic-tab" id="UserProfileChangeProfilePic-tab" data-bs-toggle="tab" data-bs-target="#UserProfileChangeProfilePic" type="button" role="tab" aria-controls="UserProfileChangeProfilePic" aria-selected="false" tabIndex="-1">
                        <p className="para clr-text mb-0">Change Profile Photo</p>
                    </li>
                    <li className="nav-item nav-link text-center" id="UserProfileChangeCoverPic-tab" data-bs-toggle="tab" data-bs-target="#UserProfileChangeCoverPic" type="button" role="tab" aria-controls="UserProfileChangeCoverPic" aria-selected="false" tabIndex="-1">
                        <p className="para clr-text mb-0">Change Cover Image</p>
                    </li>
                </ul>
            </div>
            <div className="tab-content ">

                <div className="tab-pane fade active show" id="UserProfileEdit" role="tabpanel" aria-labelledby="UserProfileEdit-tab">
                    <PeopleProfileEdit />
                </div>
                <div className="tab-pane fade " id="UserProfileChangeProfilePic" role="tabpanel" aria-labelledby="UserProfileChangeProfilePic-tab">
                    <PeopleChangeProfile />
                </div>
                <div className="tab-pane fade " id="UserProfileChangeCoverPic" role="tabpanel" aria-labelledby="UserProfileChangeCoverPic-tab">
                    <ChangeCoverPhoto />
                </div>
            </div>
        </UserProfileLayout>
    )
}

export default page