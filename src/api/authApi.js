import axiosClient from './axiosClient';

const url = '/auth/';
const authApi = {
    login: async (email, password) => {
        const loginData = {
            email: email,
            password: password,
        };
        const res = await axiosClient.post(`${url}login`, JSON.stringify(loginData));
        return res.data;
    },
};

export default authApi;
