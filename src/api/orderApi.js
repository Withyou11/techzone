import axiosClient from './axiosClient';

const url = '/orders/';
const orderApi = {
    getAll: async () => {
        const res = await axiosClient.get(url);
        return res.data;
    },
    updateStatus: async (order_id, status) => {
        const res = await axiosClient.post(`${url}update-status/${order_id}`, status);
        return res.data;
    },
    getPage: async (page) => {
        const res = await axiosClient.get(`/orders?page=${page}`);
        return res.data;
    },
    getById: async (order_id) => {
        const res = await axiosClient.get(`${url}${order_id}`);
        return res.data;
    },

    getCustomerOrderHistory: async () => {
        const res = await axiosClient.get(`orders/order/customer-history`);
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
    search: async (keyword, page) => {
        const res = await axiosClient.get(`${url}order/search?keyword=` + keyword + '&page=' + page);
        return res.data;
    },
    status: async (status, page) => {
        const res = await axiosClient.get(`${url}order/status/` + status + '?page=' + page);
        return res.data;
    },
};

export default orderApi;
