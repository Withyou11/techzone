import axiosClient from './axiosClient';

const url = '/carts/';
const cartApi = {
    viewCart: async () => {
        const res = await axiosClient.get(`${url}cart`);
        return res.data;
    },

    deleteProductFromCart: async (cartId, productId) => {
        const res = await axiosClient.delete(`${url}${cartId}/products/${productId}`);
        return res.data;
    },

    addProductToCart: async (productId) => {
        const res = await axiosClient.post(`${url}addProduct/${productId}`);
        return res.data;
    },

    getAll: async () => {
        const res = await axiosClient.get(url);
        return res.data;
    },

    getById: async (category_id) => {
        const res = await axiosClient.get(`${url}${category_id}`);
        return res.data;
    },

    create: async (category) => {
        const res = await axiosClient.post(url, JSON.stringify(category));
        return res.data;
    },

    update: async (cartId, data) => {
        console.log('cartId: ', cartId);
        console.log('data: ', data);
        const res = await axiosClient.put(`${url}${cartId}`, data);
        return res.data;
    },

    delete: async (category_id) => {
        const res = await axiosClient.delete(`${url}${category_id}`);
        return res.data;
    },
};

export default cartApi;
