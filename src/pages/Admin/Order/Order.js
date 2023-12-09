import styles from './Order.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'ka-table';
import { DataType, EditingMode, SortingMode } from 'ka-table/enums';
import products from '~/Statics/products';
import { useEffect, useState } from 'react';
import orderApi from '~/api/orderApi';

function Order() {
    const cx = classNames.bind(styles);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    useEffect(() => {
        async function fetchData() {
            try {
                let list = await orderApi.getPage(page);
                if (list.success) {
                    setData(list.data);
                }
            } catch (ex) {}
        }
        fetchData();
    }, []);

    return (
        <div className={cx('main-container')}>
            <div className={cx('header')}>
                <div>
                    <h6 className={cx('title')}>Orders</h6>
                </div>
                <div className={cx('header-right')}>
                    <input type="text" className={cx('filter')} />
                    <div className={cx('btn-filter')}>
                        <FontAwesomeIcon icon={faFilter} className={cx('icon')} />
                        <h5 className={cx('filter-text')}>Filter</h5>
                    </div>
                </div>
            </div>
            <div className={cx('content')}>
                <table>
                    <thead>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Payment Method</th>
                        <th>Total Price</th>
                        <th>Status</th>
                    </thead>
                    <tbody>
                        {data.map((value, index) => {
                            return (
                                <tr>
                                    <td className={cx('product')}>{value.order_id}</td>
                                    <td>{value.date}</td>
                                    <td>{value.payment_method}</td>
                                    <td>{value.total_price}</td>
                                    <td className={cx('status')}>{value.status}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Order;
