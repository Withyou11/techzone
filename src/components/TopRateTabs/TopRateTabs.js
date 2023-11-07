import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './TopRateTabs.module.scss';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TopRatedProducts from '../TopRatedProducts/TopRatedProducts';

function TopRateTabs() {
    const cx = classNames.bind(styles);
    const [activeTab, setActiveTab] = useState('topRated');
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    return (
        <div>
            <div className={cx('tabs')}>
                <div
                    className={cx('tab', { active: activeTab === 'topRated' })}
                    onClick={() => handleTabClick('topRated')}
                >
                    Top Rated
                </div>
                <div
                    className={cx('tab', { active: activeTab === 'bestSelling' })}
                    onClick={() => handleTabClick('bestSelling')}
                >
                    Best Selling
                </div>
                <div className={cx('tab', { active: activeTab === 'recent' })} onClick={() => handleTabClick('recent')}>
                    Recent
                </div>
            </div>
            {/* Hiển thị danh sách tương ứng với tab đang được chọn */}
            {activeTab === 'topRated' && <TopRatedProducts data={1} />}
            {activeTab === 'bestSelling' && <TopRatedProducts data={2} />}
            {activeTab === 'recent' && <TopRatedProducts data={3} />}
        </div>
    );
}

export default TopRateTabs;
