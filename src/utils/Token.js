
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
        return item?.response?.data?.data?.name;
    }
    return null;
};
export const token = GetToken('userdetail')
export const username = GetLocaldata('userdetail')

