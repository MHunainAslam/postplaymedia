'use client'
import axios from "axios";
import { APP_URL } from "../../config";
import React, { useState } from "react";
// const [authData, setauthData] = useState('')
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
var authdata


export const Authme = (key) => {
    return new Promise((resolve, reject) => {
        axios.get(`${APP_URL}/api/authMe`, {
            headers: {
                'Authorization': `Bearer ${key}`,
            }
        })
        .then(response => {
            console.log('authMe utils', response);
            resolve(response.data); // Resolve with the data from the API call
        })
        .catch(error => {
            console.error(error);
            reject(error); // Reject with the error for handling it in the caller function
        });
    });
};

export const authMeData = authdata
// export const token = GetToken('userdetail')
// export const token =  (JSON.parse(localStorage.getItem('userdetail')?.response?.data?.data?.token))
// export const token =  JSON.parse(localStorage.getItem("userdetail"))
export const username = GetLocaldata('userdetail')

