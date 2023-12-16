import { useState, useContext, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ShippingPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../../Context/CartContext/CartContext';
import FunctionTitle from '~/components/FunctionTitle/FunctionTitle';
import OnlineOrderItem from '~/components/OnlineOrderItem/OnlineOrderItem';
function ShippingPage() {
    const [customerInfo, setCustomerInfo] = useState({});
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3001/customers/${localStorage.getItem('customer_id')}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((respone) => respone.json())
            .then((data) => {
                console.log(data);
                setCustomerInfo(data.customer);
            });

        fetch('http://localhost:3001/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setProducts(data.listProduct);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });

        window.scrollTo(0, 0);
    }, []);
    const cx = classNames.bind(styles);
    const cartItems = useContext(CartContext);
    const cartItemsState = cartItems.cartItemsState;

    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState('delivery');

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!customerInfo.address) {
            alert('Please enter full information');
        } else {
            const productsWithInvalidQuantity = cartItemsState.listProduct?.filter((item) => {
                const product = products.find((product) => product.id === item.productId);
                return product && (product.amount === 0 || item.quantity > product.amount);
            });
            if (productsWithInvalidQuantity.length > 0) {
                alert(productsWithInvalidQuantity[0].name + ' exceeds the quantity in stock');
            } else {
                const data = {
                    cart_id: cartItemsState.cart_id,
                    payment_method: paymentMethod,
                };

                fetch('http://localhost:3001/carts/order', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        navigate(`/history/${localStorage.getItem('customer_id')}`);
                        window.location.reload();
                    })
                    .catch((error) => {
                        // Handle any errors
                        console.error(error);
                    });

                // Redirect to homepage
                // alert('Order successfully');
            }
        }
    };
    return (
        <div>
            <FunctionTitle title="Check the information & Payment" />
            <div className={cx('wrapper')}>
                <form className={cx('form')} onSubmit={handleSubmit}>
                    <h2 className={cx('title')}>Products Information</h2>
                    <div className={cx('personalInfoContainer')}>
                        {cartItemsState.listProduct?.map((item, index) => (
                            <div key={index}>
                                <OnlineOrderItem data={item} />
                            </div>
                        ))}
                    </div>
                    <h2 className={cx('title')}>Customer Information</h2>
                    <div className={cx('personalInfoContainer')}>
                        <p className={cx('personalInfoContainer')}>Full name: {customerInfo?.name}</p>
                        <p className={cx('personalInfoContainer')}>Phone number: {customerInfo?.phone_number}</p>
                        <p className={cx('personalInfoContainer')}>Email address: {customerInfo?.email}</p>
                    </div>
                    <h2 className={cx('title')}>Address Information</h2>
                    <div className={cx('personalInfoContainer')}>
                        <p className={cx('personalInfoContainer')}>City: {customerInfo.address?.city}</p>
                        <p className={cx('personalInfoContainer')}>District: {customerInfo.address?.district}</p>
                        <p className={cx('personalInfoContainer')}>Detail: {customerInfo.address?.detail}</p>
                    </div>
                    <h2 className={cx('title')}>Payment Method</h2>
                    <div className={cx('radioContainer')}>
                        <label className={cx('radioLabel')}>
                            <input
                                className={cx('radioButton')}
                                type="radio"
                                id="delivery"
                                name="paymentMethod"
                                value="delivery"
                                checked={paymentMethod === 'delivery'}
                                onChange={handlePaymentMethodChange}
                            />
                            Cash On Delivery
                        </label>
                        <label className={cx('radioLabel')}>
                            <input
                                className={cx('radioButton')}
                                type="radio"
                                id="transfer"
                                name="paymentMethod"
                                value="transfer"
                                checked={paymentMethod === 'transfer'}
                                onChange={handlePaymentMethodChange}
                            />
                            Bank Transfer Payment (Payment within 24h after placing the order)
                        </label>
                    </div>
                    <div className={cx('submitContainer')}>
                        <div className={cx('totalContainer')}>
                            <div className={cx('discountContainer')}>
                                <p className={cx('feeTitle')}>TOTAL</p>
                                <p className={cx('content')}>${cartItemsState.total_price}.00</p>
                            </div>
                        </div>
                        <button onClick={handleSubmit} className={cx('submit')} type="submit">
                            ORDER
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ShippingPage;
