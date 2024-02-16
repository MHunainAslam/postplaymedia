import { message } from "antd";
import { GetToken } from "./Token";
import { deleteCookie } from "cookies-next";
import axios from "axios";
import { APP_URL } from "../../config";
import Link from "next/link";
const token = GetToken('userdetail')
export const DltGrp = ({ grpid, router }) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${APP_URL}/api/groups/${grpid}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('dlt grp', response);
                message.success(response.data.message)
                router('/groups')
                document.querySelector('.close-grp-dlt-modalll').click()
            })
            .catch(error => {
                console.error(error);
                message.error(error?.response.data?.message)
                if (error?.response?.status === 401) {
                    router('/')
                    deleteCookie('logged');
                    localStorage.removeItem('userdetail')
                }
            });
    });
};
export const joingrp = ({ e, getallgrp, type }) => {
    return new Promise((resolve, reject) => {
        axios.post(`${APP_URL}/api/groups/sendRequest`, { group_id: e, type: type }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                // Handle successful response here
                message.success(response.data.message)
                console.log('join', response.data);
                getallgrp()
            })
            .catch(error => {
                // Handle error here
                // message.error(error.response?.data?.message)
                console.error(error);
            });
    });
}
export const formatMentionsToLinks = (text) => {
    const mentionRegex = /@\[([^\]]+)\]\((\d+)\)/g;
    let elements = [];
    let lastIndex = 0;
    text.replace(mentionRegex, (match, name, id, index) => {
        if (index > lastIndex) {
            elements.push(text.slice(lastIndex, index)); // Yeh non-mention text ko add karega
        }
        elements.push(
            <Link key={index} href={`/people/${id}/activity`} className='fw-bold clr-primary text-decoration-none' style={{ cursor: 'pointer', display: 'inline' }}>
                {name}
            </Link>
        );
        lastIndex = index + match.length;
    });
    if (lastIndex < text.length) {
        elements.push(text.slice(lastIndex));
    }
    return elements.length > 0 ? elements : [text];
};
