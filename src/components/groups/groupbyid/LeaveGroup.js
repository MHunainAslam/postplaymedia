
import { message } from 'antd'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { APP_URL } from '../../../../config'
import { useAppContext } from '@/context/AppContext'
import { GetToken } from '@/utils/Token'

const LeaveGroup = ({ getgrpdata }) => {
    const { UserProfiledata } = useAppContext()
    const { groupbyid } = useParams()
    const token = GetToken('userdetail')
    const router = useRouter()
    const sendinv = (e, type) => {
        axios.post(`${APP_URL}/api/groups/${groupbyid}`, { user_id: e, type: type }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('left grp', response);
                document.querySelector('.close-grp-leave-modal').click()
                getgrpdata()

            })
            .catch(error => {
                console.error(error);
                message.error(error?.response.data?.message)
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }
    return (
        <>


            <div className="modal fade" id="LeaveGroup" tabIndex="-1" aria-labelledby="LeaveGroupLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content logout-modal py-4">

                        <div className="modal-body heading text-center">
                            Want To Leave This Group ?
                        </div>
                        <div className="modal-footer bg-transparent justify-content-center border-0 pt-4">
                            <button type="button" className="btn secondary-btn close-grp-leave-modal px-5 text-white" data-bs-dismiss="modal">No</button>
                            <button type="button" onClick={() => sendinv(UserProfiledata?.data?.id, 'remove')} className="btn primary-btn px-5"><p>Yes</p></button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default LeaveGroup
