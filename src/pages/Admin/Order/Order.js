import styles from './Order.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'ka-table';
import { DataType, EditingMode, SortingMode } from 'ka-table/enums';
import products from '~/Statics/products';

function Customer() {
    const cx = classNames.bind(styles);

    const dataArray = products;

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
                        <th>Customer</th>
                        <th>Status</th>
                    </thead>
                    <tbody>
                        {dataArray.map((value, index) => {
                            return (
                                <tr>
                                    <td className={cx('product')}>#123</td>
                                    <td>13/11/2023</td>
                                    <td>Lưu Lê Bá Chính</td>
                                    <td className={cx('status')}>Append</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Customer;
