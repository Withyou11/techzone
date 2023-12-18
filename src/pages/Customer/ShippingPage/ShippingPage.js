import { useState, useContext, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ShippingPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../../Context/CartContext/CartContext';
import FunctionTitle from '~/components/FunctionTitle/FunctionTitle';
import OnlineOrderItem from '~/components/OnlineOrderItem/OnlineOrderItem';
import authApi from '~/api/authApi';
import cartApi from '~/api/cartApi';

function ShippingPage() {
    const [customerInfo, setCustomerInfo] = useState({});
    const [products, setProducts] = useState([]);
    const [email, setEmail] = useState('');
    const [newCity, setNewCity] = useState('');
    const [newDistrict, setNewDistrict] = useState('');
    const [newDetail, setNewDetail] = useState('');
    const [destination, setDestination] = useState('');
    useEffect(() => {
        async function getProfileInfo() {
            try {
                let profile = await authApi.profile();
                setCustomerInfo(profile.customer);
                setEmail(profile.email);
                setDestination(`${profile.customer.detail}, ${profile.customer.district}, ${profile.customer.city}`);
            } catch (ex) {}
        }
        getProfileInfo();
        window.scrollTo(0, 0);
    }, []);
    const cx = classNames.bind(styles);
    const cartItems = useContext(CartContext);
    const cartItemsState = cartItems.cartItemsState;
    console.log(cartItemsState);
    const [addressMode, setAddressMode] = useState('default');

    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState('delivery');

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleAddressModeChange = (event) => {
        setAddressMode(event.target.value);
    };

    useEffect(() => {
        if (addressMode === 'default') {
            setDestination(
                `${customerInfo.address?.detail}, ${customerInfo.address?.district}, ${customerInfo.address?.city}`,
            );
        } else {
            setDestination(`${newDetail}, ${newDistrict}, ${newCity}`);
        }
    }, [addressMode, newDetail, newDistrict, newCity]);

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(destination);
        if (destination === ', , ') {
            alert('Please enter full information');
        } else {
            const productsWithInvalidQuantity = cartItemsState.cart_details?.filter((item) => {
                const product = products.find((product) => product.id === item.product.productId);
                return product && (product.amount === 0 || item.quantity > product.amount);
            });
            if (productsWithInvalidQuantity.length > 0) {
                alert(productsWithInvalidQuantity[0].product.name + ' exceeds the quantity in stock');
            } else {
                var form = new FormData();
                form.append('payment_method', paymentMethod);
                form.append('destination', destination);

                async function createOrder() {
                    try {
                        let createOrder = await cartApi.createOrderFromCart(cartItemsState.cart_id, form);
                        localStorage.setItem('activeTab', 'history');
                        navigate(`/history/${localStorage.getItem('customerId')}`);
                        window.location.reload();
                    } catch (ex) {
                        console.log(ex);
                    }
                }
                createOrder();
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
                        {cartItemsState.cart_details?.map((item, index) => (
                            <div key={index}>
                                <OnlineOrderItem data={item} />
                            </div>
                        ))}
                    </div>
                    <h2 className={cx('title')}>Customer Information</h2>
                    <div className={cx('personalInfoContainer')}>
                        <p className={cx('personalInfo')}>Full name: {customerInfo?.name}</p>
                        <p className={cx('personalInfo')}>Phone number: {customerInfo?.phone_number}</p>
                        <p className={cx('personalInfo')}>Email address: {email}</p>
                    </div>
                    <h2 className={cx('title')}>Address Information</h2>
                    <div>
                        <div className={cx('radioContainer')}>
                            <label className={cx('radioLabel')}>
                                <input
                                    type="radio"
                                    name="addressMode"
                                    value="default"
                                    checked={addressMode === 'default'}
                                    onChange={handleAddressModeChange}
                                />
                                Use Default Address
                            </label>
                            <label className={cx('radioLabel')}>
                                <input
                                    type="radio"
                                    name="addressMode"
                                    value="other"
                                    checked={addressMode === 'other'}
                                    onChange={handleAddressModeChange}
                                />
                                Edit Address
                            </label>
                        </div>

                        <div>
                            {addressMode === 'default' ? (
                                <div className={cx('personalInfoContainer')}>
                                    <p className={cx('personalInfo')}>City: {customerInfo.address?.city}</p>
                                    <p className={cx('personalInfo')}>District: {customerInfo.address?.district}</p>
                                    <p className={cx('personalInfo')}>Detail: {customerInfo.address?.detail}</p>
                                </div>
                            ) : (
                                <div className={cx('radioContainer')}>
                                    <input
                                        className={cx('personalInfoInput')}
                                        type="text"
                                        placeholder="Enter City"
                                        value={newCity}
                                        onChange={(e) => setNewCity(e.target.value)}
                                        disabled={addressMode === 'default'}
                                    />
                                    <input
                                        className={cx('personalInfoInput')}
                                        type="text"
                                        placeholder="Enter District"
                                        value={newDistrict}
                                        onChange={(e) => setNewDistrict(e.target.value)}
                                        disabled={addressMode === 'default'}
                                    />
                                    <input
                                        className={cx('personalInfoInput')}
                                        type="text"
                                        placeholder="Enter Detail"
                                        value={newDetail}
                                        onChange={(e) => setNewDetail(e.target.value)}
                                        disabled={addressMode === 'default'}
                                    />
                                </div>
                            )}
                        </div>
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
