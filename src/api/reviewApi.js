import axiosClient from './axiosClient';

const url = '/reviews/';
const reviewApi = {
    getAll: async () => {
        const res = await axiosClient.get(url);
        return res.data;
    },

    getPage: async (page) => {
        const res = await axiosClient.get(`/reviews?page=${page}`);
        return res.data;
    },

    getById: async (order_id) => {
        const res = await axiosClient.get(`${url}${order_id}`);
        return res.data;
    },

    create: async (order) => {
        const res = await axiosClient.post(url, JSON.stringify(order));
        return res.data;
    },

    update: async (order) => {
        const res = await axiosClient.put(`${url}${order.order_id}`, order);
        return res.data;
    },

    delete: async (order_id) => {
        const res = await axiosClient.delete(`${url}${order_id}`);
        return res.data;
    },
};

export default reviewApi;
