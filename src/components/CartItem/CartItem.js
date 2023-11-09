import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
function CartItem({ data, onDelete, onDecrease, onIncrease }) {
    const [amount, setAmount] = useState(data.quantity);
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to remove this product from your cart?') == true) {
            console.log('Customer Says yes');
            onDelete(data.product_id);
            // setAmount(0);
            console.log(data.name + ': ' + 0);
        } else {
            console.log('Customer Says no');
        }
    };

    const handleDecrease = () => {
        if (amount > 1) {
            setAmount(amount - 1);
            console.log(data.name + ': ' + `${amount - 1}`);
            onDecrease(data.product_id, amount - 1);
        } else {
            handleDelete();
        }
    };

    const handleIncrease = () => {
        setAmount(amount + 1);
        console.log(data.name + ': ' + `${amount + 1}`);
        onIncrease(data.product_id, amount + 1);
    };
    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <img className={cx('image')} src={data.image} alt="avatar" />
            <div className={cx('nameContainer')}>
                <p className={cx('name')}>{data.name}</p>
                <p className={cx('price')}>${data.price}.00</p>
            </div>
            <div className={cx('actions')}>
                <button onClick={handleDelete} className={cx('delete')}>
                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                </button>
                <div className={cx('amountContainer')}>
                    <button onClick={handleDecrease} className={cx('decreaseButton')}>
                        <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                    </button>
                    <p className={cx('amountText')}>{amount}</p>
                    <button onClick={handleIncrease} className={cx('increaseButton')}>
                        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
