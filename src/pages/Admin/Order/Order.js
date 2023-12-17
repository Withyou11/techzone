import styles from './Order.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'ka-table';
import { DataType, EditingMode, SortingMode } from 'ka-table/enums';
import products from '~/Statics/products';
import { useEffect, useState } from 'react';
import orderApi from '~/api/orderApi';
import { Link } from 'react-router-dom';

function Order() {
    const cx = classNames.bind(styles);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');
    async function getCustomerData() {
        try {
            let list = await orderApi.getPage(page + 1);
            if (list.success) {
                setData([...data, ...list.data]);
                setPage(page + 1);
            }
        } catch (ex) {}
    }
    const loadMore = async () => {
        await getCustomerData();
    };
    async function fetchData() {
        try {
            let list = await orderApi.getPage(page);
            if (list.success) {
                setData(list.data);
                setLastPage(list.pagination.last_page);
            }
        } catch (ex) {}
    }
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        async function filterData() {
            try {
                let list = await orderApi.status(filter, 1);
                if (list.success) {
                    setPage(1);
                    setLastPage(list.pagination.last_page);
                    setData(list.data);
                } else {
                    setData([]);
                }
            } catch (ex) {
                setData([]);
            }
        }
        if (!filter.includes('All')) {
            filterData();
        } else {
            fetchData();
        }
    }, [filter]);
    let timeoutId;
    const handleSearch = async (e) => {
        try {
            let list = await orderApi.search(search, 1);
            if (list.success) {
                setPage(1);
                setLastPage(list.pagination.last_page);
                setData(list.data);
            } else {
                setData([]);
            }
        } catch (ex) {
            setData([]);
        }
    };
    useEffect(() => {
        setFilter('All');
        clearTimeout(timeoutId);
        timeoutId = setTimeout(handleSearch, 1000);
    }, [search]);
    return (
        <div className={cx('main-container')}>
            <div className={cx('header')}>
                <div>
                    <h6 className={cx('title')}>Orders</h6>
                </div>
                <div className={cx('header-right')}>
                    <input
                        type="text"
                        className={cx('filter')}
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                        value={search}
                    />
                    <div
                        className={filter.includes('All') ? cx('btn-filter', 'selected') : cx('btn-filter')}
                        onClick={(e) => setFilter('All')}
                    >
                        <h5 className={cx('filter-text')}>All</h5>
                    </div>
                    <div
                        className={filter.includes('Processing') ? cx('btn-filter', 'selected') : cx('btn-filter')}
                        onClick={(e) => setFilter('Processing')}
                    >
                        <h5 className={cx('filter-text')}>Processing</h5>
                    </div>
                    <div
                        className={filter.includes('Shipping') ? cx('btn-filter', 'selected') : cx('btn-filter')}
                        onClick={(e) => setFilter('Shipping')}
                    >
                        <h5 className={cx('filter-text')}>Shipping</h5>
                    </div>
                    <div
                        className={filter.includes('Complete') ? cx('btn-filter', 'selected') : cx('btn-filter')}
                        onClick={(e) => setFilter('Complete')}
                    >
                        <h5 className={cx('filter-text')}>Complete</h5>
                    </div>
                    <div
                        className={filter.includes('Canceled') ? cx('btn-filter', 'selected') : cx('btn-filter')}
                        onClick={(e) => setFilter('Canceled')}
                    >
                        <h5 className={cx('filter-text')}>Canceled</h5>
                    </div>
                </div>
            </div>
            <div className={cx('content')}>
                <table>
                    <thead>
                        <th style={{ width: '10%' }}>ID</th>
                        <th style={{ width: '20%' }}>Date</th>
                        <th style={{ width: '15%' }}>Payment Method</th>
                        <th style={{ width: '15%' }}>Total Price</th>
                        <th style={{ width: '15%' }}>Status</th>
                    </thead>
                    <tbody>
                        {data.map((value, index) => {
                            return (
                                <tr>
                                    <td className={cx('product')}>
                                        <Link to={`${value.order_id}`}>#{value.order_id}</Link>
                                    </td>
                                    <td>{value.date}</td>
                                    <td>{value.payment_method}</td>
                                    <td>{value.total_price}</td>
                                    <td className={cx('status')}>{value.status}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {page < lastPage ? (
                    <div className={cx('opacity-100', 'text-center', 'mt-4')} onClick={(e) => loadMore()}>
                        Load more
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
}

export default Order;
