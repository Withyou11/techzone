import axiosClient from './axiosClient';

const urlOrder = '/orders/';
const urlCust = '/customers/';

const dashboardApi = {
    getTotalRevenue: async () => {
        const res = await axiosClient.get(`${urlOrder}order/revenueMonth`);
        return res.data;
    },
    getTotalOrder: async () => {
        const res = await axiosClient.get(`${urlOrder}order/totalOrderInMonth`);
        return res.data;
    },
    getTotalCustomer: async () => {
        const res = await axiosClient.get(`${urlCust}customer/totalAccountInMonth`);
        return res.data;
    },
    getRevenueMonthArray: async () => {
        const res = await axiosClient.get(`${urlOrder}order/monthRevenue`);
        return res.data;
    },
    getLastedOrder: async () => {
        const res = await axiosClient.get(`${urlOrder}order/latestOrder`);
        return res.data;
    },
    getBestSelling: async () => {
        const res = await axiosClient.get(`/products/sell/bestSellProducts`);
        return res.data;
    },
};

export default dashboardApi;
