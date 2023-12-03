import axiosClient from './axiosClient';

const url = '/invoice/';
const inquiryApi = {
    getAll: async () => {
        const res = await axiosClient.get(url);
        return res.data;
    },

    getById: async (inquiry_id) => {
        const res = await axiosClient.get(`${url}${inquiry_id}`);
        return res.data;
    },

    create: async (inquiry) => {
        const res = await axiosClient.post(url, JSON.stringify(inquiry));
        return res.data;
    },

    update: async (inquiry) => {
        const res = await axiosClient.put(`${url}${inquiry.inquiry_id}`, inquiry);
        return res.data;
    },

    delete: async (inquiry_id) => {
        const res = await axiosClient.delete(`${url}${inquiry_id}`);
        return res.data;
    },
};

export default inquiryApi;
