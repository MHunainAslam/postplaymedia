import React from 'react'

const ProfileTabs = () => {
    return (
        <>
           
                <ul className="peopletab overflow-auto nav nav-tabs border-0 border-b-0 px-md-3 flex-nowrap" role="tablist">
                    <li className="nav-item nav-link active text-center" id="PeopleActivity-tab" data-bs-toggle="tab" data-bs-target="#PeopleActivity" type="button" role="tab" aria-controls="PeopleActivity" aria-selected="false" tabIndex="-1">
                        <i className="clr-text heading-m mb-2 bi bi-activity"></i>
                        <p className="para clr-text mb-0">Activity</p>
                    </li>
                    <li className="nav-item nav-link text-center" id="PeopleProfile-tab" data-bs-toggle="tab" data-bs-target="#PeopleProfile" type="button" role="tab" aria-controls="PeopleProfile" aria-selected="false" tabIndex="-1">
                        <i className="clr-text heading-m mb-2 bi bi-person-square"></i>
                        <p className="para clr-text mb-0">Profile</p>
                    </li>
                    <li className="nav-item nav-link text-center" id="AllPhotos-tab" data-bs-toggle="tab" data-bs-target="#AllPhotos" type="button" role="tab" aria-controls="AllPhotos" aria-selected="false" tabIndex="-1">
                        <i className="clr-text heading-m mb-2 bi bi-person"></i>
                        <p className="para clr-text mb-0">Friends</p>
                    </li>
                    <li className="nav-item nav-link text-center" id="AllPhotos-tab" data-bs-toggle="tab" data-bs-target="#AllPhotos" type="button" role="tab" aria-controls="AllPhotos" aria-selected="false" tabIndex="-1">
                        <i className="clr-text heading-m mb-2 bi bi-people"></i>
                        <p className="para clr-text mb-0">Groups</p>
                    </li>
                    <li className="nav-item nav-link text-center" id="AllPhotos-tab" data-bs-toggle="tab" data-bs-target="#AllPhotos" type="button" role="tab" aria-controls="AllPhotos" aria-selected="false" tabIndex="-1">
                        <i className="clr-text heading-m mb-2 bi bi-chat"></i>
                        <p className="para clr-text mb-0">Forums</p>
                    </li>
                    <li className="nav-item nav-link text-center" id="AllPhotos-tab" data-bs-toggle="tab" data-bs-target="#AllPhotos" type="button" role="tab" aria-controls="AllPhotos" aria-selected="false" tabIndex="-1">
                        <i className="clr-text heading-m mb-2 bi bi-image-fill"></i>
                        <p className="para clr-text mb-0">Media</p>
                    </li>
                    <li className="nav-item nav-link text-center" id="AllPhotos-tab" data-bs-toggle="tab" data-bs-target="#AllPhotos" type="button" role="tab" aria-controls="AllPhotos" aria-selected="false" tabIndex="-1">
                        <i className="clr-text heading-m mb-2 bi bi-bell"></i>
                        <p className="para clr-text mb-0">Notifications</p>
                    </li>
                    <li className="nav-item nav-link text-center" id="AllPhotos-tab" data-bs-toggle="tab" data-bs-target="#AllPhotos" type="button" role="tab" aria-controls="AllPhotos" aria-selected="false" tabIndex="-1">
                        <i className="clr-text heading-m mb-2 bi bi-envelope-open"></i>
                        <p className="para clr-text mb-0">Messages</p>
                    </li>
                    <li className="nav-item nav-link text-center" id="AllPhotos-tab" data-bs-toggle="tab" data-bs-target="#AllPhotos" type="button" role="tab" aria-controls="AllPhotos" aria-selected="false" tabIndex="-1">
                        <i className="clr-text heading-m mb-2 bi bi-gear"></i>
                        <p className="para clr-text mb-0">Settings</p>
                    </li>

                </ul>
          
        </>
    )
}

export default ProfileTabs