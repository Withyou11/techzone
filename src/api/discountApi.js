import axiosClient from './axiosClient';

const url = '/discounts/';
const discountApi = {
    getAll: async () => {
        const res = await axiosClient.get(url);
        return res.data;
    },

    getById: async (discount_id) => {
        const res = await axiosClient.get(`${url}${discount_id}`);
        return res.data;
    },

    create: async (discount) => {
        const res = await axiosClient.post(url, JSON.stringify(discount), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.data;
    },

    update: async (discount) => {
        const res = await axiosClient.put(`${url}${discount.discount_id}`, discount);
        return res.data;
    },

    delete: async (discount_id) => {
        const res = await axiosClient.delete(`${url}${discount_id}`);
        return res.data;
    },
};

export default discountApi;
