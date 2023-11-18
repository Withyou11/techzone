import styles from './Product.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'ka-table';
import { DataType, EditingMode, SortingMode } from 'ka-table/enums';
import products from '~/Statics/products';

function Product() {
    const cx = classNames.bind(styles);

    const dataArray = products;

    return (
        <div className={cx('main-container')}>
            <div className={cx('header')}>
                <div>
                    <h6 className={cx('title')}>Products</h6>
                </div>
                <div className={cx('header-right')}>
                    <input type="text" className={cx('filter')} />
                    <div className={cx('btn-filter')}>
                        <FontAwesomeIcon icon={faFilter} className={cx('icon')} />
                        <h5 className={cx('filter-text')}>Filter</h5>
                    </div>
                    <a href="/admin/products/create" className={cx('btn-add-new')}>
                        <FontAwesomeIcon icon={faAdd} className={cx('icon')} />
                        <h5 className={cx('filter-text')}>Add new</h5>
                    </a>
                </div>
            </div>
            <div className={cx('content')}>
                {/* <Table
                    columns={[
                        { key: 'product', title: 'Product' },
                        { key: 'category', title: 'Category' },
                        { key: 'quantity', title: 'Quantity' },
                        { key: 'status', title: 'Status' },
                        { key: 'price', title: 'Price' },
                    ]}
                    data={dataArray}
                    editingMode={EditingMode.None}
                    rowKeyField={'id'}
                    sortingMode={SortingMode.Single}
                /> */}
                <table>
                    <thead>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Price</th>
                    </thead>
                    <tbody>
                        {dataArray.map((value, index) => {
                            return (
                                <tr>
                                    <td className={cx('product')}>
                                        <img className={cx('product-img')} src={value.image} alt="img-product" />
                                        <div>{value.name}</div>
                                    </td>
                                    <td>{value.categoryName}</td>
                                    <td>{value.amount}</td>
                                    <td>
                                        {value.amount === 0 ? (
                                            <div className={cx('out-stock')}>• Out of stock</div>
                                        ) : (
                                            <div className={cx('in-stock')}>• In stock</div>
                                        )}
                                    </td>
                                    <td>{value.price}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Product;
