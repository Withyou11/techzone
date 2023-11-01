import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './TopRatedItem.module.scss';
function TopRatedItem(data) {
    const cx = classNames.bind(styles);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('imageContainer')}>
                <img className={cx('image')} src={data.data.image} alt="product" />
            </div>
            <div className={cx('infoContainer')}>
                <p className={cx('category')}>{data.data.categoryName}</p>
                <p className={cx('name')}>{data.data.name}</p>
                <p className={cx('price')}>${data.data.price}</p>
            </div>
        </div>
    );
}

export default TopRatedItem;
