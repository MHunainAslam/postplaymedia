'use client'
import axios from "axios";
import { APP_URL } from "../../config";
import React, { useState } from "react";
// const [authData, setauthData] = useState('')

export const GetToken = (key) => {
    if (typeof window !== 'undefined') {
        const item = JSON.parse(localStorage.getItem(key));
        return item?.response?.data?.data?.token;
    }
    return null;
};
export const GetLocaldata = (key) => {
    if (typeof window !== 'undefined') {
        const item = JSON.parse(localStorage.getItem(key));
        return item?.response?.data?.data;
    }
    return null;
};
const token = GetToken('userdetail')
var aaa
const Authme = (key) => {
    axios.get(`${APP_URL}/api/authMe`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(response => {
            console.log('authMe utils', response);
            aaa = response?.data
            // setUserProfiledata(response?.data)
            // setUserProfileloader(false)

        })
        .catch(error => {
            // setUserProfileloader(false)

            console.error(error);
            // if (error?.response?.status === 401) {
            //     router.push('/')
            //     deleteCookie('logged');
            //     localStorage.removeItem('userdetail')
            // }
        });
};

export const authMeData = aaa?.data
// export const token = GetToken('userdetail')
// export const token =  (JSON.parse(localStorage.getItem('userdetail')?.response?.data?.data?.token))
// export const token =  JSON.parse(localStorage.getItem("userdetail"))
export const username = GetLocaldata('userdetail')

