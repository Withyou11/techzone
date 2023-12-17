import styles from './OrderTracker.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useState } from 'react';
import orderApi from '~/api/orderApi';
import { NotificationManager } from 'react-notifications';
import { useNavigate } from 'react-router-dom';

function OrderTracker() {
    const cx = classNames.bind(styles);
    const [data, setData] = useState('');
    const navigate = useNavigate();

    const search = async (e) => {
        if (data) {
            try {
                const result = await orderApi.getById(data);
                if (result.success) {
                    navigate('/admin/orders/' + data);
                } else if (result.response.status === 404) {
                    NotificationManager.error('Order is not found');
                } else {
                    NotificationManager.error(result.message);
                }
            } catch (ex) {
                NotificationManager.error('Error: ' + ex.message);
            }
        } else NotificationManager.info('Input can not empty');
    };
    return (
        <div className={cx('main-container')}>
            <div className={cx('header')}>
                <div>
                    <h6 className={cx('title')}>OrderTracker</h6>
                </div>
                <div className={cx('header-right')}>
                    <input type="text" className={cx('filter')} onChange={(e) => setData(e.target.value)} />
                    <button className={cx('btn-filter')} onClick={(e) => search(e)}>
                        <FontAwesomeIcon icon={faSearch} className={cx('icon', 'text-black')} />
                        <h5 className={cx('filter-text')}>Search</h5>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrderTracker;
