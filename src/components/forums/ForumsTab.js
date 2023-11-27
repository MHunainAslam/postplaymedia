import React from 'react'
import AllForums from './AllForums'
import ForumTopic from './ForumTopic'

const ForumsTab = () => {
    return (
        <div className="activity-tabs mt-5">
            <ul className="nav nav-tabs border-0 " role="tablist">
                <li className="nav-item nav-link active" id="AllForums-tab" data-bs-toggle="tab" data-bs-target="#AllForums" type="button" role="tab" aria-controls="AllForums" aria-selected="false" tabIndex="-1">
                    All Forums
                </li>
                <li className="nav-item nav-link " id="Topics-tab" data-bs-toggle="tab" data-bs-target="#Topics" type="button" role="tab" aria-controls="Topics" aria-selected="false" tabIndex="-1">
                    Topics
                </li>


            </ul>
            <div className="tab-content ">
                <div className="tab-pane fade active show" id="AllForums" role="tabpanel" aria-labelledby="AllForums-tab">
                    <AllForums />
                </div>
                <div className="tab-pane fade " id="Topics" role="tabpanel" aria-labelledby="Topics-tab">
                    <ForumTopic />
                </div>


            </div>
        </div>
    )
}

export default ForumsTab