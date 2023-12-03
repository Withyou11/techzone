import axiosClient from './axiosClient';

const url = '/customers/';
const customerApi = {
    getAll: async () => {
        const res = await axiosClient.get(url);
        return res.data;
    },

    getById: async (customer_id) => {
        const res = await axiosClient.get(`${url}${customer_id}`);
        return res.data;
    },

    create: async (customer) => {
        const res = await axiosClient.post(url, JSON.stringify(customer));
        return res.data;
    },

    update: async (customer) => {
        const res = await axiosClient.put(`${url}${customer.customer_id}`, customer);
        return res.data;
    },

    delete: async (customer_id) => {
        const res = await axiosClient.delete(`${url}${customer_id}`);
        return res.data;
    },
};

export default customerApi;
