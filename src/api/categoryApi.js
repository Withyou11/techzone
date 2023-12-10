import axiosClient from './axiosClient';

const url = '/categories/';
const categoryApi = {
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

    update: async (category) => {
        const res = await axiosClient.put(`${url}${category.category_id}`, category);
        return res.data;
    },

    delete: async (category_id) => {
        const res = await axiosClient.delete(`${url}${category_id}`);
        return res.data;
    },
};

export default categoryApi;
