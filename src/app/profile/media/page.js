import ProfileLayout from '@/app/ProfileLayout'
import UserProfileLayout from '@/app/UserProfileLayout'
import React from 'react'

const page = () => {
    return (
        <UserProfileLayout ProfilePages>
            <div className="mt-3 profile-tabs">
                <ul className="peopletab nav nav-tabs border-0 border-b-0  " role="tablist">
                    <li className="nav-item nav-link active text-center" id="AllMedia-tab" data-bs-toggle="tab" data-bs-target="#AllMedia" type="button" role="tab" aria-controls="AllMedia" aria-selected="false" tabIndex="-1">
                        <p className="para clr-text mb-0">All</p>
                    </li>
                    <li className="nav-item nav-link text-center" id="Albums-tab" data-bs-toggle="tab" data-bs-target="#Albums" type="button" role="tab" aria-controls="Albums" aria-selected="false" tabIndex="-1">
                        <p className="para clr-text mb-0">Albums</p>
                    </li>

                    <li className="nav-item nav-link text-center" id="AllPhotos-tab" data-bs-toggle="tab" data-bs-target="#AllPhotos" type="button" role="tab" aria-controls="AllPhotos" aria-selected="false" tabIndex="-1">
                        <p className="para clr-text mb-0">Photos</p>
                    </li>
                    <li className="nav-item nav-link text-center" id="AllVideo-tab" data-bs-toggle="tab" data-bs-target="#AllVideo" type="button" role="tab" aria-controls="AllVideo" aria-selected="false" tabIndex="-1">
                        <p className="para clr-text mb-0">Video</p>
                    </li>
                    <li className="nav-item nav-link text-center" id="AllMusic-tab" data-bs-toggle="tab" data-bs-target="#AllMusic" type="button" role="tab" aria-controls="AllMusic" aria-selected="false" tabIndex="-1">
                        <p className="para clr-text mb-0">Music</p>
                    </li>
                </ul>
            </div>
            <div className="tab-content ">
                <div className="tab-pane fade active show" id="AllMedia" role="tabpanel" aria-labelledby="AllMedia-tab">
                    a
                </div>
                <div className="tab-pane fade " id="Albums" role="tabpanel" aria-labelledby="Albums-tab">
                    b
                </div>
                <div className="tab-pane fade " id="AllPhotos" role="tabpanel" aria-labelledby="AllPhotos-tab">
                    c
                </div>
                <div className="tab-pane fade " id="AllVideo" role="tabpanel" aria-labelledby="AllVideo-tab">
                    d
                </div>
                <div className="tab-pane fade " id="AllMusic" role="tabpanel" aria-labelledby="AllMusic-tab">
                    e
                </div>
            </div>
        </UserProfileLayout>
    )
}

export default page