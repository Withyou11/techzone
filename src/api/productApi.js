import axiosClient from './axiosClient';

const url = '/products/';
const productApi = {
    getAll: async () => {
        const res = await axiosClient.get(url);
        return res.data;
    },

    getById: async (product_id) => {
        const res = await axiosClient.get(`${url}${product_id}`);
        return res.data;
    },

    create: async (product) => {
        const res = await axiosClient.post(url, JSON.stringify(product));
        return res.data;
    },

    update: async (product) => {
        const res = await axiosClient.put(`${url}${product.product_id}`, product);
        return res.data;
    },

    delete: async (product_id) => {
        const res = await axiosClient.delete(`${url}${product_id}`);
        return res.data;
    },
};

export default productApi;
