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

function Product() {
    const loadingRef = useRef(null);
    const [search, setSearch] = useState('');
    const [take, setTake] = useState(10);
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(1);
    const [icons, setIcons] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/products?page=' + page).then((res) => {
            if (res.status === 200) {
                let resData = res.data;
                if (resData.success) {
                    setData(resData.data);
                    console.log(resData);
                }
            }
        });
        async function fetchData() {
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
        }

        fetchData();
    }, []);

    useEffect(() => {
        setTake(10);
        // const newArray = dataArray
        //     .filter((value, index) =>
        //         filter.length > 0 ? value.categoryName.toLowerCase() === filter.toLowerCase() : true,
        //     )
        //     .filter((value, index) => value.name.toLowerCase().includes(search) === true)
        //     .slice(0, take);
        // setData(newArray);
    }, [filter]);

    useEffect(() => {
        // const newArray = dataArray
        //     .filter((value, index) =>
        //         filter.length > 0 ? value.categoryName.toLowerCase() === filter.toLowerCase() : true,
        //     )
        //     .filter((value, index) => value.name.toLowerCase().includes(search) === true)
        //     .slice(0, take);
        // setData(newArray);
        // console.log(take);
    }, [search, take]);

    const cx = classNames.bind(styles);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };
    const handleScroll = () => {
        if (isTake) {
            const windowHeight = window.innerHeight;
            const totalHeight = document.documentElement.scrollHeight;
            const scrollPosition = window.scrollY + windowHeight;

            if (scrollPosition >= totalHeight) {
                if (take < data.length) {
                    loadingRef.current.className = classNames('text-center', 'h1', 'opacity-100');

                    setTimeout(() => {
                        setTake((pre) => pre + 10);
                        loadingRef.current.className = classNames('text-center', 'h1', 'opacity-0');
                    }, 1000);
                }
            }
        }
    };
    const isTake = () => {
        return take < data.length;
    };
    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);

    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

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
                                    <td>{value.category.name}</td>
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
                <div ref={loadingRef} className={cx('opacity-0')}>
                    ...
                </div>
            </div>
        </div>
    );
}

export default Product;
