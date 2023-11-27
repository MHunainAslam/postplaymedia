import Image from 'next/image'
import React from 'react'
import AllPhotos from './AllPhotos'


const PhotosTab = () => {
    return (
        <>
            <div className="activity-tabs mt-5">
                <ul className="nav nav-tabs border-0 " role="tablist">
                    <li className="nav-item nav-link active" id="AllPhotos-tab" data-bs-toggle="tab" data-bs-target="#AllPhotos" type="button" role="tab" aria-controls="AllPhotos" aria-selected="false" tabIndex="-1">
                        All Photos
                    </li>

                </ul>
                <div className="tab-content ">
                    <div className="tab-pane fade active show" id="AllPhotos" role="tabpanel" aria-labelledby="AllPhotos-tab">
                        <AllPhotos />
                    </div>

                </div>
            </div>
        </>
    )
}

export default PhotosTab