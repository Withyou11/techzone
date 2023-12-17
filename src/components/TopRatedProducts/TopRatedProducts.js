import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './TopRatedProducts.module.scss';
import products from '~/Statics/products';
import TopRatedItem from '../TopRatedItem/TopRatedItem';
function TopRatedProducts(data) {
    const cx = classNames.bind(styles);

    return (
        <div className={cx('wrapper')}>
            {data.data.map((item, index) => (
                <div key={index}>
                    <TopRatedItem data={item} />
                </div>
            ))}
        </div>
    );
}

export default TopRatedProducts;
