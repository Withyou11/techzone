import axiosClient from './axiosClient';

const url = '/warehouse/';
const warehouseApi = {
    getAll: async () => {
        const res = await axiosClient.get(url);
        return res.data;
    },

    getById: async (warehouse_id) => {
        const res = await axiosClient.get(`${url}${warehouse_id}`);
        return res.data;
    },

    create: async (warehouse) => {
        const res = await axiosClient.post(url, JSON.stringify(warehouse));
        return res.data;
    },

    update: async (warehouse) => {
        const res = await axiosClient.put(`${url}${warehouse.warehouse_id}`, warehouse);
        return res.data;
    },

    delete: async (warehouse_id) => {
        const res = await axiosClient.delete(`${url}${warehouse_id}`);
        return res.data;
    },
};

export default warehouseApi;
