import { message } from "antd";
import { GetToken } from "./Token";
import { deleteCookie } from "cookies-next";
import axios from "axios";
import { APP_URL } from "../../config";
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
                document.querySelector('.close-grp-dlt-modal').click()
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
