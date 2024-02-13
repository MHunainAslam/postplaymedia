import { GetToken } from '@/utils/Token';
import axios from 'axios';
import React from 'react'
import { APP_URL } from '../../../config';
import { message } from 'antd';
import { useRouter } from 'next/navigation';

const DeleteComment = ({ dltcomment, dltcommentmodal, setdltcommentmodal, Commentid , comntloading}) => {
    const token = GetToken('userdetail')
    const router = useRouter()

    return (
        <>
            {dltcommentmodal &&
                <div className='dltcommentmodal'>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content logout-modal py-4">

                            <div className="modal-body heading text-center">
                                Delete This Comment ?
                            </div>
                            <div className="modal-footer bg-transparent justify-content-center border-0 pt-4">
                                <button type="button" className="btn secondary-btn close-post-dlt-modal px-5 me-3 text-white" onClick={() => setdltcommentmodal(false)}>No</button>
                                <button type="button" className="btn primary-btn px-5" onClick={() => dltcomment(Commentid)}><p>Yes {comntloading ? <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span> : ''}</p></button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default DeleteComment
