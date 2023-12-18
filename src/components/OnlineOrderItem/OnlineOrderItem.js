import classNames from 'classnames/bind';
import styles from './OnlineOrderItem.module.scss';
function OnlineOrderItem({ data, status }) {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <img className={cx('image')} src={data.product.image} alt="avatar" />
            <div className={cx('nameContainer')}>
                <p className={cx('name')}>{data.product.name}</p>
                <p className={cx('price')}>${data.product.price}</p>
                <p className={cx('amountText')}>Quantity: {data.quantity}</p>
            </div>
            {status === 'Complete' && <button className={cx('reviewButton')}>Review</button>}
        </div>
    );
}

export default OnlineOrderItem;
