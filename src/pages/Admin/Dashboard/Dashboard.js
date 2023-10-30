import styles from './Dashboard.module.scss';
import classNames from 'classnames/bind';
import { Line, Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import TableCustom from '~/components/Admin/TableCustom';

const latestOrderData = [{ ORDER: '#95954', STATUS: '', DATE: '', CUSTOMER: '', TOTAL: '' }];
const latestOrderColumns = [
    { Header: 'ORDER', accessor: 'ORDER' },
    { Header: 'STATUS', accessor: 'STATUS' },
    { Header: 'DATE', accessor: 'DATE' },
    { Header: 'CUSTOMER', accessor: 'CUSTOMER' },
    { Header: 'TOTAL', accessor: 'TOTAL' },
];

const sellingData = [{ PRODUCT: '#95954', SOLD: '' }];
const sellingColumns = [
    { Header: 'PRODUCT', accessor: 'PRODUCT' },
    { Header: 'SOLD', accessor: 'SOLD' },
];

function Dashboard() {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('main-container')}>
            <h6 className={cx('title')}>Dashboard</h6>
            <div className={cx('header')}>
                <div>
                    <p className={cx('subtitle')}>View your current sales & summary</p>
                </div>
                <div className={cx('header-right')}>
                    <input type="text" className={cx('filter')} />
                    <input type="button" className={cx('btn-filter')} value={'Filter'} />
                </div>
            </div>
            <div className={cx('content')}>
                {/* sua thanh component sau */}
                <div className={cx('figure')}>
                    <div className={cx('figure-item')}>
                        <div className={cx('figure-item-content')}>
                            <h4 className={cx('figure-item-title')}>Revenue</h4>
                            <h2 className={cx('figure-item-value')}>$21,827.13</h2>
                            <p>vs. 3 months prior to 27 Feb</p>
                        </div>
                        <h6 className={cx('figure-item-trending-up')}>11.4%</h6>
                    </div>
                    <div className={cx('figure-item')}>
                        <div className={cx('figure-item-content')}>
                            <h4 className={cx('figure-item-title')}>Orders</h4>
                            <h2 className={cx('figure-item-value')}>1,758</h2>
                            <p>vs. 3 months prior to 27 Feb</p>
                        </div>
                        <h6 className={cx('figure-item-trending-down')}>3.2%</h6>
                    </div>
                    <div className={cx('figure-item')}>
                        <div className={cx('figure-item-content')}>
                            <h4 className={cx('figure-item-title')}>Purchase</h4>
                            <h2 className={cx('figure-item-value')}>$7,249.31</h2>
                            <p>vs. 3 months prior to 27 Feb</p>
                        </div>
                        <h6 className={cx('figure-item-trending-up')}>5.7%</h6>
                    </div>
                </div>
                <div className={cx('statistics')}>
                    <div className={cx('statistic-linear')}>
                        <h4>Sales Report</h4>
                        <Line
                            data={{
                                labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
                                datasets: [
                                    {
                                        data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
                                        label: 'Africa',
                                        borderColor: '#3e95cd',
                                        fill: false,
                                    },
                                    {
                                        data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
                                        label: 'Asia',
                                        borderColor: '#8e5ea2',
                                        fill: false,
                                    },
                                    {
                                        data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
                                        label: 'Europe',
                                        borderColor: '#3cba9f',
                                        fill: false,
                                    },
                                    {
                                        data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
                                        label: 'Latin America',
                                        borderColor: '#e8c3b9',
                                        fill: false,
                                    },
                                    {
                                        data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
                                        label: 'North America',
                                        borderColor: '#c45850',
                                        fill: false,
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
                    <div className={cx('statistic-doughnut')}>
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
                    </div>
                </div>
                <div className={cx('trending')}>
                    <div className={cx('latest_order')}>
                        <h4>Latest Order</h4>
                        <TableCustom data={latestOrderData} columns={latestOrderColumns} />
                    </div>
                    <div className={cx('top_selling')}>
                        <h4>Top selling</h4>
                        <TableCustom data={sellingData} columns={sellingColumns} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
