import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './TopRatedProducts.module.scss';
import products from '~/Statics/products';
import TopRatedItem from '../TopRatedItem/TopRatedItem';
function TopRatedProducts(data) {
    const cx = classNames.bind(styles);

    return (
        <div className={cx('wrapper')}>
            {data.data === 1 &&
                products.slice(1, 10).map((item) => (
                    <div key={item.id}>
                        <TopRatedItem data={item} />
                    </div>
                ))}{' '}
            {data.data === 2 &&
                products.slice(10, 19).map((item) => (
                    <div key={item.id}>
                        <TopRatedItem data={item} />
                    </div>
                ))}
            {data.data === 3 &&
                products.slice(20, 23).map((item) => (
                    <div key={item.id}>
                        <TopRatedItem data={item} />
                    </div>
                ))}
        </div>
    );
}

export default TopRatedProducts;
