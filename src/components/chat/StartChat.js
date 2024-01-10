import Image from 'next/image'
import React from 'react'
import { APP_URL } from '../../../config';
import axios from 'axios';
import { GetToken } from '@/utils/Token';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

const StartChat = ({ profile }) => {
    const token = GetToken('userdetail')
    const router = useRouter()
    const sayhello = () => {
        axios.post(`${APP_URL}/api/room`, { room_type: 'single', user_ids: [`${profile?.id} `], init_message: 'Hello' }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('create room', response);
                if (response?.data?.data) {
                    router.push({ pathname: `/messages`, query: { profile: JSON.stringify(error?.response?.data?.data?.roomid), chat: (error?.response?.data?.data?.roomid) } })
                }
            })
            .catch(error => {
                console.error(error);
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
                if (error?.response?.data?.data?.roomid) {
                    router.push(`/messages?profile=12&chat=aasas`);
                }
            });
    }
    return (
        <div className='d-flex justify-content-center align-items-center h-100'>
            <div className="card people-card">
                <div className="card-body">
                    <div className="border px-5 rounded-4 ">
                        <p className="heading-lg fs-1 clr-primary px-5 mb-0 pb-3 pt-4 pointer" onClick={sayhello}>
                            Say
                            <Image className='ms-3  say-hello ' src={'/assets/images/avatar/hello.png'} alt="" width={100} height={100}></Image>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StartChat