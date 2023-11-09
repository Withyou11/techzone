import classNames from 'classnames/bind';
import styles from './PurchaseHistoryItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import OnlineOrderItem from '../OnlineOrderItem/OnlineOrderItem';
function PurchaseHistoryItem({ data, onDelete }) {
    const handleDelete = () => {
        if (data.status === 'Processing') {
            if (window.confirm('Are you sure you want to cancel this order?') === true) {
                onDelete(data.order_id);
            }
        } else {
            window.alert('You cannot cancel this order!!!');
        }
    };

    let statusColor = '';

    switch (data.status) {
        case 'Processing':
            statusColor = 'black';
            break;
        case 'Shipping':
            statusColor = '#fdbf00';
            break;
        case 'Canceled':
            statusColor = '#E50000';
            break;
        case 'Complete':
            statusColor = '#1BC386';
            break;
        default:
            statusColor = 'black';
    }

    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('actions')}>
                <button onClick={handleDelete} className={cx('delete')}>
                    <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                </button>
            </div>
            <div className={cx('orderInfoContainer')}>
                <p className={cx('orderId')}>
                    Order: <span style={{ color: '#0075FF' }}>#{data?.order_id}</span>
                </p>
                <p className={cx('orderId')} style={{ color: statusColor, marginRight: '30px' }}>
                    {data.status}
                </p>
            </div>
            <hr style={{ margin: 0 }}></hr>
            {data.listProduct.map((item, index) => (
                <div key={index}>
                    <OnlineOrderItem data={item} />
                </div>
            ))}
            <div className={cx('orderInfoContainer')}>
                <p className={cx('date')}>{data.date.substring(0, 10)}</p>
                <p className={cx('destination')}>
                    {data.destination.detail}, {data.destination.district}, {data.destination.city}
                </p>
                <div className={cx('moneyContainer')}>
                    <p className={cx('totalText')}>Order total:</p>
                    <p className={cx('totalValue')}>${data.total_price}.00</p>
                </div>
            </div>
        </div>
    );
}

export default PurchaseHistoryItem;
