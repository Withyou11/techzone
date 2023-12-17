import styles from './Customer.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'ka-table';
import { DataType, EditingMode, SortingMode } from 'ka-table/enums';
import products from '~/Statics/products';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosClient from '~/api/axiosClient';
import customerApi from '~/api/customerApi';

function Customer() {
    const cx = classNames.bind(styles);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    async function getCustomerData() {
        try {
            let list = await customerApi.getPage(page + 1);
            if (list.success) {
                setData([...data, ...list.data]);
                setPage(page + 1);
            }
        } catch (ex) {}
    }
    const loadMore = async () => {
        await getCustomerData();
    };
    useEffect(() => {
        async function fetchData() {
            try {
                let list = await customerApi.getPage(page);
                if (list.success) {
                    setData(list.data);
                    setLastPage(list.pagination.last_page);
                }
            } catch (ex) {}
        }
        fetchData();
    }, []);

    return (
        <div className={cx('main-container')}>
            <div className={cx('header')}>
                <div>
                    <h6 className={cx('title')}>Customers</h6>
                </div>
                <div className={cx('header-right')}>
                    <input type="text" className={cx('filter')} />
                </div>
            </div>
            <div className={cx('content')}>
                <table>
                    <thead>
                        <th>Name</th>
                        <th>Phone number</th>
                        <th>Email</th>
                    </thead>
                    <tbody>
                        {data.map((value, index) => {
                            return (
                                <tr>
                                    <td>
                                        <Link to={`detail/${value.customer_id}`} className={cx('product')}>
                                            <img
                                                className={cx('product-img')}
                                                src={value.account.avatar}
                                                alt="img-product"
                                            />
                                            <div>{value.name}</div>
                                        </Link>
                                    </td>
                                    <td>{value.phone_number}</td>
                                    <td>{value.account.email}</td>
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

export default Customer;
