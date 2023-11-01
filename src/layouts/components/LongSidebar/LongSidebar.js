import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './LongSidebar.module.scss';
import categories from '~/Statics/categories';
import brands from '~/Statics/brands';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function LongSidebar(data) {
    const cx = classNames.bind(styles);
    const [selectedCategory, setSelectedCategory] = useState(data.data);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const [selectedBrand, setSelectedBrand] = useState('');

    const handleBrandChange = (event) => {
        setSelectedBrand(event.target.value);
    };

    return (
        <aside className={cx('wrapper')}>
            <div className={cx('filterContainer')}>
                <div className={cx('categoryItem1')}>
                    <p className={cx('allCategory')}>FILTER PRODUCTS BY</p>
                </div>
                <ul className="categoryList">
                    <li className={cx('categoryItem')} style={{ margin: '12px 24px' }}>
                        <p className={cx('title')}>CATEGORY</p>
                    </li>
                    {categories.map((category) => (
                        <li key={category.id} className={cx('categoryItem')}>
                            <input
                                name="category"
                                id={category.id}
                                type="radio"
                                value={category.name}
                                checked={selectedCategory === category.name}
                                onChange={handleCategoryChange}
                                className={cx('input')}
                            />
                            <label htmlFor={category.id} className={cx('radio-label')}>
                                {category.name}
                            </label>
                        </li>
                    ))}
                </ul>
                <hr />
                <ul className="categoryList">
                    <li className={cx('categoryItem')} style={{ margin: '12px 24px' }}>
                        <p className={cx('title')}>BRAND</p>
                    </li>
                    {brands.map((brand) => (
                        <li key={brand.id * 50} className={cx('categoryItem')}>
                            <input
                                name="brand"
                                id={brand.id * 50}
                                type="radio"
                                value={brand.name}
                                checked={selectedBrand === brand.name}
                                onChange={handleBrandChange}
                                className={cx('input')}
                            />
                            <label htmlFor={brand.id * 50} className={cx('radio-label')}>
                                {brand.name}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={cx('advContainer')}>
                <p className={cx('newArrivals')}>New Arrivals</p>
                <p className={cx('productName')}>Samsung Galaxy S23 Ultra</p>
                <button className={cx('shopNowButton')}>SHOP NOW</button>
            </div>
        </aside>
    );
}

export default LongSidebar;
