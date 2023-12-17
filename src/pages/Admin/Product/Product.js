import styles from './Product.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'ka-table';
import { DataType, EditingMode, SortingMode } from 'ka-table/enums';
import products from '~/Statics/products';
import { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import categories from '~/Statics/categories';
import Select from 'react-select';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import categoryApi from '~/api/categoryApi';
import axiosClient from '~/api/axiosClient';
import productApi from '~/api/productApi';

function Product() {
    const loadingRef = useRef(null);
    const [search, setSearch] = useState('');
    const [take, setTake] = useState(10);
    const [data, setData] = useState([]);
    const [source, setSource] = useState([]);

    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [icons, setIcons] = useState([]);
    const [flag, setFlag] = useState(false);

    async function getProductData() {
        try {
            let list = await productApi.getPage(page + 1);
            if (list.success) {
                setSource([...source, ...list.data]);
                setPage(page + 1);
            }
        } catch (ex) {}
        setFlag(false);
    }
    useEffect(() => {
        console.log(filter);
        if (filter.length === 0 && search.length === 0) {
            setData(source);
        } else {
            const filterData = source
                .filter((value, index) => value.category.name === filter || filter.length === 0)
                .filter((value, index) => value.name.includes(search) === true);
            setData(filterData);
        }
    }, [filter, source, search]);

    useEffect(() => {
        async function productData() {
            try {
                let list = await productApi.getPage(page);
                if (list.success) {
                    setData(list.data);
                    setSource(list.data);
                    setLastPage(list.pagination.last_page);
                }
            } catch (ex) {
                console.log(ex);
            }
        }
        async function fetchData() {
            try {
                let list = await categoryApi.getAll();
                if (list.success) {
                    let categories = list.data.map((value, index) => {
                        return {
                            value: value.name,
                            label: value.name,
                        };
                    });
                    categories.push({ value: '', label: 'All' });
                    setIcons(categories);
                }
            } catch (ex) {}
        }
        productData();
        fetchData();
    }, []);

    const cx = classNames.bind(styles);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };
    const loadMore = async () => {
        await getProductData();
    };

    return (
        <div className={cx('main-container')}>
            <div className={cx('header')}>
                <div>
                    <h6 className={cx('title')}>Products</h6>
                </div>
                <div className={cx('header-right')}>
                    <input type="text" className={cx('filter')} onChange={(e) => handleSearch(e)} />
                    <Select
                        required
                        className={cx('btn-filter')}
                        options={icons}
                        minMenuHeight={150}
                        onChange={(selectedOption) => setFilter(selectedOption.value)}
                    />
                    <a href="/admin/products/create" className={cx('btn-add-new')}>
                        <FontAwesomeIcon icon={faAdd} className={cx('icon')} />
                        <h5 className={cx('filter-text')}>Add new</h5>
                    </a>
                </div>
            </div>
            <div className={cx('content')}>
                <table>
                    <thead>
                        <th style={{ width: '40%' }}>Product</th>
                        <th style={{ width: '15%' }}>Category</th>
                        <th style={{ width: '15%' }}>Quantity</th>
                        <th style={{ width: '15%' }}>Status</th>
                        <th style={{ width: '15%' }}>Price</th>
                    </thead>
                    <tbody>
                        {data.map((value, index) => {
                            return (
                                <tr>
                                    <td className={cx('product')}>
                                        <img className={cx('product-img')} src={value.image} alt="img-product" />
                                        <Link to={`detail/${value.product_id}`}>{value.name}</Link>
                                    </td>
                                    <td>{value && value.category.name}</td>
                                    <td>{value.amount}</td>
                                    <td>
                                        {value.amount === 0 ? (
                                            <div className={cx('out-stock')}>• Out of stock</div>
                                        ) : (
                                            <div className={cx('in-stock')}>• In stock</div>
                                        )}
                                    </td>
                                    <td>{value.price}$</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {page < lastPage ? (
                    <div
                        ref={loadingRef}
                        className={cx('opacity-100', 'text-center', 'mt-4')}
                        onClick={(e) => loadMore()}
                    >
                        Load more
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
}

export default Product;
