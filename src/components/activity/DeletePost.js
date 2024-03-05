import { GetToken } from '@/utils/Token';
import axios from 'axios';
import React from 'react'
import { APP_URL } from '../../../config';
import { message } from 'antd';
import { useRouter } from 'next/navigation';

const DeletePost = ({ grpid, setisdlt, isdlt, modalid }) => {
    const token = GetToken('userdetail')
    const router = useRouter()
    const dlrpost = (e) => {
        axios.delete(`${APP_URL}/api/post/${e}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                document.querySelector(`.${modalid}`)?.click()
                setisdlt(!isdlt)

            })
            .catch(error => {
                console.error(error);
                message.error(error?.response?.data?.message)
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }
    return (
        <>
            <div className="modal fade " id={modalid} tabIndex="-1" aria-labelledby="DltPostLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content logout-modal py-4">

                        <div className="modal-body heading text-center">
                            Delete This Post ?
                        </div>
                        <div className="modal-footer bg-transparent justify-content-center border-0 pt-4">
                            <button type="button" className={`btn secondary-btn close-post-dlt-modal px-5 text-white ${modalid}`} data-bs-dismiss="modal">No</button>
                            <button type="button" className="btn primary-btn px-5" onClick={() => dlrpost(grpid)}><p>Yes</p></button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default DeletePost