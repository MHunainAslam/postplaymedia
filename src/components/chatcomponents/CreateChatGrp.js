import React, { useState } from 'react'
import InviteGrpChat from './InviteGrpChat';
import { APP_URL } from '../../../config';
import axios from 'axios';

const CreateChatGrp = () => {
    const [GrpName, setGrpName] = useState('')
    const [userids, setuserids] = useState([])
    const [error, seterror] = useState(false)
    const [GrpDesc, setGrpDesc] = useState('')
    const [ActiveComponent, setActiveComponent] = useState('grp_name')
    {/* Component change function */ }
    const handleComponentChange = (componentName) => {
        setActiveComponent(componentName);
    };
    const submitname = () => {
        if (GrpName === '') {
            seterror(true)
        }
        else {
            handleComponentChange('add_user')
        }
    }
    const createGrpchat = () => {
        axios.post(`${APP_URL}/api/room`, {
            name: GrpName,
            description: GrpDesc,
            status: 'pending',
            room_type: "group",
            init_message: "new group",
            user_ids: userids
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                // Handle successful response here
                console.log('accept grp inv', response.data);
            })
            .catch(error => {
                // Handle error here
                console.error(error);
            });
    }
    return (
        <>


            <div className="modal fade" id="createchtgrp" tabIndex="-1" aria-labelledby="createchtgrpLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    {ActiveComponent === 'grp_name' && <>
                        <div className="modal-content  py-4">
                            <div className="modal-body ">
                                <p className="heading text-center clr-primary">
                                    Group Name
                                </p>
                                <label htmlFor="" className='para clr-dark '>Group Name:</label>
                                <input type="text" name="" className='inp form-control' id="" value={GrpName} onChange={(e) => setGrpName(e.target.value)} />
                                <p className='text-danger para-sm'> {error ? `${GrpName === '' ? 'Required*' : ''}` : ''}</p>
                                <label htmlFor="" className='para clr-dark mt-4 '>Group Description:</label>
                                <textarea type="text" name="" className='inp form-control' id="" value={GrpDesc} onChange={(e) => setGrpDesc(e.target.value)} />
                            </div>
                            <div className="modal-footer bg-transparent justify-content-center border-0 pt-4">
                                <button type="button" className="btn secondary-btn close-grp-dlt-modal px-5 " data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn primary-btn px-5" onClick={submitname}><p>Next</p></button>
                            </div>
                        </div>
                    </>}
                    {ActiveComponent === 'add_user' && <>
                        <div className="modal-content bg-light py-4">
                            <div className="modal-body ">
                                <p className="heading text-center clr-primary">
                                    Add Users
                                </p>
                                <InviteGrpChat setuserids={setuserids} />
                            </div>
                            <div className="modal-footer bg-transparent justify-content-center border-0 pt-4">
                                <button type="button" className="btn secondary-btn px-5 " onClick={() => handleComponentChange('grp_name')}>Back</button>
                                <button type="button" className="btn primary-btn px-5" onClick={createGrpchat}><p>Next</p></button>
                            </div>
                        </div>
                    </>}
                </div>
            </div>
        </>
    )
}

export default CreateChatGrp