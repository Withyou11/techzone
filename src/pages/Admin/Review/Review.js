import styles from './Review.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import reviewApi from '~/api/reviewApi';

function Review() {
    const loadingRef = useRef(null);
    const [search, setSearch] = useState('');
    const [take, setTake] = useState(10);
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(1);
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function productData() {
            try {
                let list = await reviewApi.getPage(page);
                if (list.success) {
                    setData(list.data);
                }
            } catch (ex) {}
        }

        productData();
    }, []);

    useEffect(() => {
        setTake(10);
    }, [filter]);

    useEffect(() => {}, [search, take]);

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

    return (
        <div className={cx('main-container')}>
            <div className={cx('header')}>
                <div>
                    <h6 className={cx('title')}>Reviews</h6>
                </div>
                <div className={cx('header-right')}>
                    <input type="text" className={cx('filter')} onChange={(e) => handleSearch(e)} />
                </div>
            </div>
            <div className={cx('content')}>
                <table>
                    <thead>
                        <th style={{ width: '15%' }}>Date</th>
                        <th style={{ width: '30%' }}>Product</th>
                        <th style={{ width: '30%' }}>Customer</th>
                        <th style={{ width: '15%' }}>Star</th>
                        <th style={{ width: '10%' }}></th>
                    </thead>
                    <tbody>
                        {data.map((value, index) => {
                            return (
                                <>
                                    <tr>
                                        <td>{value.date}</td>
                                        <td>{value.product.name}</td>
                                        <td>{value.customer.name}</td>
                                        <td>{value.star}</td>
                                        <td>
                                            <div
                                                to={`${value.product_id}`}
                                                className={cx('text-primary')}
                                                style={{ cursor: 'pointer' }}
                                                onClick={(e) =>
                                                    value.review_id !== message
                                                        ? setMessage(value.review_id)
                                                        : setMessage(-1)
                                                }
                                            >
                                                Detail
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        {message === value.review_id ? (
                                            <td colspan={5} className="p-4 bg-white">
                                                {value.content}
                                            </td>
                                        ) : (
                                            ''
                                        )}
                                    </tr>
                                </>
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

export default Review;
