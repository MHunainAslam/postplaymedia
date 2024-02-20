import Image from 'next/image'
import React from 'react'
import AllVideos from './AllVideos'


const WatchVideosTab = () => {
    return (
        <>
            <div className="activity-tabs mt-5">
                <ul className="nav nav-tabs border-0 " role="tablist">
                    <li className="nav-item nav-link active" id="AllPhotos-tab" data-bs-toggle="tab" data-bs-target="#AllPhotos" type="button" role="tab" aria-controls="AllPhotos" aria-selected="false" tabIndex="-1">
                        All Videos
                    </li>

                </ul>
                <div className="tab-content ">
                    <div className="tab-pane fade active show" id="AllPhotos" role="tabpanel" aria-labelledby="AllPhotos-tab">
                        <AllVideos endpoint={'posted-activity-media-associative?'}/>
                    </div>

                </div>
            </div>
        </>
    )
}

export default WatchVideosTab
