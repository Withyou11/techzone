import axiosClient from './axiosClient';

const url = '/auth/';
const authApi = {
    login: async (loginData) => {
        console.log(loginData);
        const res = await axiosClient.post(`${url}login`, loginData);
        return res.data;
    },
    profile: async () => {
        const res = await axiosClient.get(`${url}profile`);
        return res.data;
    },
    logout: async () => {
        const res = await axiosClient.post(`${url}logout`);
        return res.data;
    },
};

export default authApi;
