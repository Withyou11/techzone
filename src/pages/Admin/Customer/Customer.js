import styles from './Customer.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'ka-table';
import { DataType, EditingMode, SortingMode } from 'ka-table/enums';
import products from '~/Statics/products';
import { Link } from 'react-router-dom';

function Customer() {
    const cx = classNames.bind(styles);

    const dataArray = products;

    return (
        <div className={cx('main-container')}>
            <div className={cx('header')}>
                <div>
                    <h6 className={cx('title')}>Customers</h6>
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
                        <th>Name</th>
                        <th>Phone number</th>
                        <th>Email</th>
                    </thead>
                    <tbody>
                        {dataArray.map((value, index) => {
                            return (
                                <tr>
                                    <td>
                                        <Link to={`detail/${value.product_id}`} className={cx('product')}>
                                            <img className={cx('product-img')} src={value.image} alt="img-product" />
                                            <div>{value.name}</div>
                                        </Link>
                                    </td>
                                    <td>{value.categoryName}</td>
                                    <td>{value.amount}@gmail.com</td>
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
