import classNames from 'classnames/bind';
import styles from './OnlineOrderItem.module.scss';
import { useNavigate } from 'react-router-dom';
function OnlineOrderItem({ data, status }) {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
    const toReview = () => {
        navigate('/order/review', { state: data });
    };
    console.log({ product: data });
    return (
        <div className={cx('wrapper')}>
            <img className={cx('image')} src={data.product.image} alt="avatar" />
            <div className={cx('nameContainer')}>
                <p className={cx('name')}>{data.product.name}</p>
                <p className={cx('price')}>${data.product.price}</p>
                <p className={cx('amountText')}>Quantity: {data.quantity}</p>
            </div>
            {status === 'Complete' && (
                <button className={cx('reviewButton')} onClick={toReview}>
                    Review
                </button>
            )}
        </div>
    );
}

export default OnlineOrderItem;
