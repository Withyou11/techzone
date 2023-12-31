import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
function CartItem({ data, onDelete, onDecrease, onIncrease }) {
    const [amount, setAmount] = useState(data.quantity);
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to remove this product from your cart?') == true) {
            onDelete(data.product.product_id);
            // setAmount(0);
            console.log(data.product.name + ': ' + 0);
        } else {
            console.log('Customer Says no');
        }
    };

    const handleDecrease = () => {
        if (amount > 1) {
            setAmount(amount - 1);
            console.log(data.product.name + ': ' + `${amount - 1}`);
            onDecrease(data.product.product_id, amount - 1);
        } else {
            handleDelete();
        }
    };

    const handleIncrease = () => {
        setAmount(amount + 1);
        console.log(data.product.name + ': ' + `${amount + 1}`);
        onIncrease(data.product.product_id, amount + 1);
    };
    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <img className={cx('image')} src={data.product.image} alt="avatar" />
            <div className={cx('nameContainer')}>
                <p className={cx('name')}>{data.product.name}</p>
                <p className={cx('price')}>${data.product.price}.00</p>
            </div>
            <div className={cx('actions')}>
                <button onClick={handleDelete} className={cx('delete')}>
                    <FontAwesomeIcon icon={faTrash} className={cx('delete-icon')}></FontAwesomeIcon>
                </button>
                <div className={cx('amountContainer')}>
                    <button onClick={handleDecrease} className={cx('decreaseButton')}>
                        <FontAwesomeIcon icon={faMinus} className={cx('decrease-icon')}></FontAwesomeIcon>
                    </button>
                    <p className={cx('amountText')}>{amount}</p>
                    <button onClick={handleIncrease} className={cx('increaseButton')}>
                        <FontAwesomeIcon icon={faPlus} className={cx('increase-icon')}></FontAwesomeIcon>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
