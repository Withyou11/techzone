import styles from './Dashboard.module.scss';
import classNames from 'classnames/bind';
import { Line, Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import TableCustom from '~/components/Admin/TableCustom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import dashboardApi from '~/api/dashboardApi';
import { Link } from 'react-router-dom';

// const latestOrderData = [{ ORDER: '#95954', STATUS: '', DATE: '', CUSTOMER: '', TOTAL: '' }];
// const latestOrderColumns = [
//     { Header: 'ORDER', accessor: 'ORDER', sortable: true, show: true },
//     { Header: 'STATUS', accessor: 'STATUS', sortable: true, show: true },
//     { Header: 'DATE', accessor: 'DATE', sortable: true, show: true },
//     { Header: 'CUSTOMER', accessor: 'CUSTOMER', sortable: true, show: true },
//     { Header: 'TOTAL', accessor: 'TOTAL', sortable: true, show: true },
// ];

// const sellingData = [{ PRODUCT: '#95954', SOLD: '' }];
// const sellingColumns = [
//     { Header: 'PRODUCT', accessor: 'PRODUCT' },
//     { Header: 'SOLD', accessor: 'SOLD' },
// ];

function Dashboard() {
    const cx = classNames.bind(styles);
    const [revenue, setRevenue] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const [custCount, setCustCount] = useState(0);
    const [revenueStatistic, setRevenueStatistic] = useState([]);
    const [lastedOrder, setLastedOrder] = useState([]);
    const [bestSelling, setBestSelling] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const req_revenue = await dashboardApi.getTotalRevenue();
                const req_order_count = await dashboardApi.getTotalOrder();
                const req_cust_count = await dashboardApi.getTotalCustomer();
                const req_revenue_arr = await dashboardApi.getRevenueMonthArray();
                const req_lasted_order = await dashboardApi.getLastedOrder();
                const req_best_selling = await dashboardApi.getBestSelling();
                if (req_revenue.success) {
                    setRevenue(req_revenue.data.total_revenue);
                }
                if (req_order_count.success) {
                    setOrderCount(req_order_count.data.total_orders);
                }
                if (req_cust_count.success) {
                    setCustCount(req_cust_count.data.total_customers);
                }
                if (req_revenue_arr.success) {
                    setRevenueStatistic(req_revenue_arr.data);
                }
                if (req_lasted_order.success) {
                    setLastedOrder(req_lasted_order.data);
                }
                if (req_best_selling.success) {
                    setBestSelling(req_best_selling.data);
                }
            } catch (ex) {}
        }
        fetchData();
    }, []);
    return (
        <div className={cx('main-container')}>
            <h6 className={cx('title')}>Dashboard</h6>
            <div className={cx('header')}>
                <div>
                    <p className={cx('subtitle')}>View your current sales & summary</p>
                </div>
            </div>
            <div className={cx('content')}>
                {/* sua thanh component sau */}
                <div className={cx('figure')}>
                    <div className={cx('figure-item')}>
                        <div className={cx('figure-item-content')}>
                            <h4 className={cx('figure-item-title')}>Revenue</h4>
                            <h2 className={cx('figure-item-value')}>${revenue}</h2>
                            {/* <p>vs. 3 months prior to 27 Feb</p> */}
                        </div>
                        {/* <h6 className={cx('figure-item-trending-up')}>11.4%</h6> */}
                    </div>
                    <div className={cx('figure-item')}>
                        <div className={cx('figure-item-content')}>
                            <h4 className={cx('figure-item-title')}>Orders</h4>
                            <h2 className={cx('figure-item-value')}>{orderCount}</h2>
                            {/* <p>vs. 3 months prior to 27 Feb</p> */}
                        </div>
                        {/* <h6 className={cx('figure-item-trending-down')}>3.2%</h6> */}
                    </div>
                    <div className={cx('figure-item')}>
                        <div className={cx('figure-item-content')}>
                            <h4 className={cx('figure-item-title')}>Customer</h4>
                            <h2 className={cx('figure-item-value')}>{custCount}</h2>
                            {/* <p>vs. 3 months prior to 27 Feb</p> */}
                        </div>
                        {/* <h6 className={cx('figure-item-trending-up')}>5.7%</h6> */}
                    </div>
                </div>
                <div className={cx('statistics')}>
                    <div className={cx('statistic-linear')}>
                        <h4>Sales Report</h4>
                        <Line
                            data={{
                                labels: [
                                    'Jan',
                                    'Feb',
                                    'Mar',
                                    'Apr',
                                    'May',
                                    'Jun',
                                    'Jul',
                                    'Aug',
                                    'Sep',
                                    'Oct',
                                    'Nov',
                                    'Dec',
                                ],
                                datasets: [
                                    {
                                        data: revenueStatistic,
                                        label: 'Revenue',
                                        borderColor: '#3e95cd',
                                        fill: true,
                                    },
                                ],
                            }}
                            options={{
                                title: {
                                    display: true,
                                    text: 'World population per region (in millions)',
                                },
                                legend: {
                                    display: true,
                                    position: 'bottom',
                                },
                            }}
                        />
                    </div>
                    {/* <div className={cx('statistic-doughnut')}>
                        <h4>Categories</h4>
                        <Doughnut
                            className={cx('doughnut')}
                            data={{
                                labels: ['Africa', 'Asia', 'Europe', 'Latin America', 'North America'],
                                datasets: [
                                    {
                                        label: 'Population (millions)',
                                        backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850'],
                                        data: [2478, 5267, 734, 784, 433],
                                    },
                                ],
                            }}
                            option={{
                                title: {
                                    display: true,
                                    text: 'Predicted world population (millions) in 2050',
                                },
                            }}
                        />
                    </div> */}
                </div>
                <div className={cx('trending')}>
                    <div className={cx('latest_order')}>
                        <h4>Latest Order</h4>
                        <table>
                            <thead>
                                <th style={{ width: '10%' }}>ID</th>
                                <th style={{ width: '25%' }}>Date</th>
                                <th style={{ width: '20%' }}>Total Price</th>
                                <th style={{ width: '20%' }}>Status</th>
                            </thead>
                            <tbody>
                                {lastedOrder.map((value, index) => {
                                    console.log(value);
                                    return (
                                        <tr>
                                            <td className={cx('product')}>
                                                <Link to={`${value.order_id}`}>#{value.order_id}</Link>
                                            </td>
                                            <td>{value.date}</td>
                                            <td>{value.total_price}</td>
                                            <td className={cx('status')}>{value.status}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className={cx('top_selling')}>
                        <h4>Top selling</h4>
                        <table>
                            <thead>
                                <th style={{ width: '60%' }}>PRODUCT</th>
                                <th style={{ width: '40%' }}>SOLD</th>
                            </thead>
                            <tbody>
                                {bestSelling.map((value, index) => {
                                    console.log(value);
                                    return (
                                        <tr>
                                            <td>{value.name}</td>
                                            <td>{value.total_sold}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
