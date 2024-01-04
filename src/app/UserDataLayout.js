'use client'
import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { APP_URL } from '../../config'
import { GetToken } from '@/utils/Token'
import Loader from '@/components/Loader'
import { useRouter } from 'next/navigation'
import { deleteCookie } from 'cookies-next'
export const UserContext = createContext();
const UserDataLayout = ({ children }) => {
    const token = GetToken('userdetail')
    const router = useRouter()
    const [UserProfiledata, setUserProfiledata] = useState()
    useEffect(() => {
        axios.get(`${APP_URL}/api/authMe`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('userdata layout', response.data.data.name, UserProfiledata);
                setUserProfiledata(response.data)
            })
            .catch(error => {
                console.error(error);
                if (error?.response?.status === 401) {
                    router.push('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    }, [])


    return (
        <>
            <UserContext.Provider value={{ UserProfiledata, setUserProfiledata }}>
                {children}
            </UserContext.Provider>
        </>
    )
}

export default UserDataLayout

