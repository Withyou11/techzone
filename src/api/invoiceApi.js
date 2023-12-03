import axiosClient from './axiosClient';

const url = '/invoice/';
const invoiceApi = {
    getAll: async () => {
        const res = await axiosClient.get(url);
        return res.data;
    },

    getById: async (invoice_id) => {
        const res = await axiosClient.get(`${url}${invoice_id}`);
        return res.data;
    },

    create: async (invoice) => {
        const res = await axiosClient.post(url, JSON.stringify(invoice));
        return res.data;
    },

    update: async (invoice) => {
        const res = await axiosClient.put(`${url}${invoice.invoice_id}`, invoice);
        return res.data;
    },

    delete: async (invoice_id) => {
        const res = await axiosClient.delete(`${url}${invoice_id}`);
        return res.data;
    },
};

export default invoiceApi;
