import axiosClient from './axiosClient';

const url = '/employees/';
const employeeApi = {
    getAll: async () => {
        const res = await axiosClient.get(url);
        return res.data;
    },
    getPage: async (page) => {
        const res = await axiosClient.get('/employees?page=' + page);
        return res.data;
    },

    getById: async (employee_id) => {
        const res = await axiosClient.get(`${url}${employee_id}`);
        return res.data;
    },

    create: async (employee) => {
        const res = await axiosClient.post(url, employee);
        return res.data;
    },

    update: async (id, employee) => {
        const res = await axiosClient.put(`${url}${id}`, employee);
        return res.data;
    },

    delete: async (id) => {
        const res = await axiosClient.delete(`${url}${id}`);
        return res.data;
    },
};

export default employeeApi;
