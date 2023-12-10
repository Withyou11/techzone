import axiosClient from './axiosClient';

const url = '/supplier/';
const supplierApi = {
    getAll: async () => {
        const res = await axiosClient.get(url);
        return res.data;
    },

    getById: async (supplier_id) => {
        const res = await axiosClient.get(`${url}${supplier_id}`);
        return res.data;
    },

    create: async (supplier) => {
        const res = await axiosClient.post(url, JSON.stringify(supplier));
        return res.data;
    },

    update: async (supplier) => {
        const res = await axiosClient.put(`${url}${supplier.supplier_id}`, supplier);
        return res.data;
    },

    delete: async (supplier_id) => {
        const res = await axiosClient.delete(`${url}${supplier_id}`);
        return res.data;
    },
};

export default supplierApi;
