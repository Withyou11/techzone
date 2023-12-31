import axiosClient from './axiosClient';

const url = '/customers/';
const customerApi = {
    getAll: async () => {
        const res = await axiosClient.get(url);
        return res.data;
    },
    getPage: async (page) => {
        const res = await axiosClient.get('/customers?page=' + page);
        return res.data;
    },

    getById: async (customer_id) => {
        const res = await axiosClient.get(`${url}${customer_id}`);
        return res.data;
    },

    getCustomerOrders: async (customer_id) => {
        const res = await axiosClient.get(`${url}${customer_id}/orders`);
        return res.data;
    },

    create: async (customer) => {
        const res = await axiosClient.post(url, customer);
        return res.data;
    },

    update: async (customer_id, data) => {
        const res = await axiosClient.put(`${url}${customer_id}`, data);
        return res.data;
    },

    delete: async (customer_id) => {
        const res = await axiosClient.delete(`${url}${customer_id}`);
        return res.data;
    },
};

export default customerApi;
