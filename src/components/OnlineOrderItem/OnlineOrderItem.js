import classNames from 'classnames/bind';
import styles from './OnlineOrderItem.module.scss';
function OnlineOrderItem({ data }) {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <img className={cx('image')} src={data.image} alt="avatar" />
            <div className={cx('nameContainer')}>
                <p className={cx('name')}>{data.name}</p>
                <p className={cx('price')}>${data.price}.00</p>
                <p className={cx('amountText')}>Quantity: {data.quantity}</p>
            </div>
            {localStorage.getItem('activeTab') === 'history' && <button className={cx('reviewButton')}>Review</button>}
        </div>
    );
}

export default OnlineOrderItem;
