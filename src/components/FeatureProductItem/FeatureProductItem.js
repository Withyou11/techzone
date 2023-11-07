import classNames from 'classnames/bind';
import styles from './FeatureProductItem.module.scss';

function FeatureProductItem(data) {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')} style={{ backgroundImage: `url(${data.data.image})` }}>
            <p className={cx('title')}>FEATURED PRODUCT</p>
            <p className={cx('name')}>{data.data.name}</p>
            <div
                style={{
                    // backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    padding: '10px',
                    position: 'absolute',
                    top: '170px',
                    left: '130px',
                }}
            >
                <p className={cx('priceOnly')}>Price Only</p>
                <p className={cx('price')}>{data.data.price}</p>
            </div>
            <div className={cx('button')}>
                <p className={cx('shopNow')}>SHOP NOW</p>
            </div>
        </div>
    );
}

export default FeatureProductItem;
