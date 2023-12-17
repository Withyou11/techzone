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
        const res = await axiosClient.post(url, warehouse);
        return res.data;
    },

    // update: async (id, warehouse) => {
    //     const res = await axiosClient.put(`${url}${id}`, JSON.stringify(warehouse), {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     });
    //     return res.data;
    // },
    update: async (id, warehouse) => {
        const res = await axiosClient.put(`${url}${id}`, warehouse);
        return res.data;
    },
    delete: async (warehouse_id) => {
        const res = await axiosClient.delete(`${url}${warehouse_id}`);
        return res.data;
    },
    getAllReceipt: async () => {
        const res = await axiosClient.get(`${url}receipt/all`);
        return res.data;
    },
    receipt: async (receipt) => {
        const res = await axiosClient.post(`${url}receipt`, JSON.stringify(receipt));
        return res.data;
    },
};

export default warehouseApi;
