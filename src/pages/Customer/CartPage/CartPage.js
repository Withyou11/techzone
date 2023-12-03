import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './CartPage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { ams } from 'react-router-dom';
import FunctionTitle from '~/components/FunctionTitle/FunctionTitle';
import CartItem from '~/components/CartItem/CartItem';
import { faCheck, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../../Context/CartContext/CartContext';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import 'bootstrap/dist/css/bootstrap.min.css';

function CartPage() {
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const cartItems = useContext(CartContext);
    const cartItemsState = cartItems.cartItemsState;
    const setCartItemsState = cartItems.setCartItemsState;
    const [couponVisible, setCouponVisible] = useState(true);
    const [discountValue, setDiscountValue] = useState(cartItemsState?.discount_value);
    const [couponNotify, setCouponNotify] = useState(false);
    useEffect(() => {
        if (cartItemsState?.discount_code) {
            setCouponVisible(false);
        }
        window.scrollTo(0, 0);
    }, [cartItemsState]);

    const cx = classNames.bind(styles);
    const handleNextPage = () => {
        // if (cartItemsState.listProduct?.length === 0) {
        //     setToastMessage('Your cart is empty');
        //     setShowToast(true);
        //     setTimeout(() => {
        //         setShowToast(false);
        //     }, 3000);
        // } else {
        //     navigate('/shipping');
        // }
    };
    const handleDelete = (itemId) => {
        // const newItem = {
        //     cart_id: cartItemsState.cart_id,
        //     product_id: itemId,
        // };
        // fetch('http://localhost:3001/carts/delete_cart_product', {
        //     method: 'PATCH',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(newItem),
        // })
        //     .then((respone) => respone.json())
        //     .then((data) => {
        //         let total_price = 0;
        //         const updatedCartItems = cartItemsState.listProduct?.filter((item) => item.product_id !== itemId);
        //         for (let i = 0; i < updatedCartItems.length; i++) {
        //             const product = cartItemsState.listProduct[i];
        //             const { price, quantity } = product;
        //             const orderValue = price * quantity;
        //             total_price += orderValue;
        //         }
        //         const updateItem = {
        //             cart_id: cartItemsState.cart_id,
        //             discount_id: cartItemsState.discount,
        //             listProduct: updatedCartItems,
        //             total_price: total_price,
        //         };
        //         setCartItemsState(updateItem);
        //     });
    };

    // Hàm xử lý sự kiện giảm số lượng sản phẩm
    const handleDecrease = (itemId, quantity) => {
        const newItem = {
            cart_id: cartItemsState.cart_id,
            product_id: itemId,
            quantity: quantity,
        };
        fetch('http://localhost:3001/carts/update_cart_product', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem),
        })
            .then((response) => response.json())
            .then((responseData) => {
                let total_price = cartItemsState.total_price;
                const updatedCartItems = cartItemsState.listProduct?.map((item) => {
                    if (item.product_id == itemId) {
                        if (item.quantity > 1) {
                            total_price -= item.price;
                            return {
                                ...item,
                                quantity: item.quantity - 1,
                            };
                        }
                    }
                    return item;
                });
                const updateItem = {
                    cart_id: cartItemsState.cart_id,
                    discount_id: cartItemsState.discount,
                    listProduct: updatedCartItems,
                    total_price: total_price,
                };
                setCartItemsState(updateItem);
            })
            .catch((error) => {
                // Handle any errors
                console.error(error);
            });
    };

    // Hàm xử lý sự kiện tăng số lượng sản phẩm
    const handleIncrease = (itemId, quantity) => {
        const newItem = {
            cart_id: cartItemsState.cart_id,
            product_id: itemId,
            quantity: quantity,
        };
        fetch('http://localhost:3001/carts/update_cart_product', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem),
        })
            .then((response) => response.json())
            .then((responseData) => {
                let total_price = cartItemsState.total_price;
                const updatedCartItems = cartItemsState.listProduct?.map((item) => {
                    if (item.product_id == itemId) {
                        total_price += item.price;
                        return {
                            ...item,
                            quantity: item.quantity + 1,
                        };
                    }
                    return item;
                });
                const updateItem = {
                    cart_id: cartItemsState.cart_id,
                    discount_id: cartItemsState.discount,
                    listProduct: updatedCartItems,
                    total_price: total_price,
                };
                setCartItemsState(updateItem);
            })
            .catch((error) => {
                // Handle any errors
                console.error(error);
            });
    };

    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleCheck = () => {
        setCouponNotify(false);
        const newItem = {
            code: inputValue,
            cart_id: cartItemsState.cart_id,
        };

        fetch('http://localhost:3001/carts/apply_discount', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem),
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                if (responseData.message == 'discount applied successfully') {
                    var discountValue = responseData.discount_value;
                    console.log(discountValue);
                    const updateItem = {
                        cart_id: cartItemsState.cart_id,
                        discount_id: cartItemsState.discount,
                        listProduct: cartItemsState.listProduct,
                        discount_value: responseData.discount_value,
                        total_price: cartItemsState.total_price - discountValue,
                    };
                    setDiscountValue(responseData.discount_value);
                    if (discountValue > 0) {
                        setCartItemsState(updateItem);
                    }

                    setCouponVisible(false);
                } else {
                    setCouponNotify(true);
                }
            })
            .catch((error) => {
                // Handle any errors
                console.error(error);
            });
    };

    return (
        <div>
            <FunctionTitle title="Home > Shopping cart" />
            <div className={cx('wrapper')}>
                {cartItemsState?.listProduct?.map((item, index) => (
                    <div key={index}>
                        <CartItem
                            data={item}
                            onDelete={handleDelete}
                            onDecrease={handleDecrease}
                            onIncrease={handleIncrease}
                        />
                    </div>
                ))}
                {/* {cartItemsState?.listProduct.length === 0 && (
                    <p style={{ fontSize: '18px', fontStyle: 'italic', margin: '50px' }}>
                        You have no items in your shopping cart
                    </p>
                )} */}
                <div className={cx('inputContainer')}>
                    <input
                        readOnly={!couponVisible}
                        className={cx('input')}
                        type="text"
                        value={cartItemsState.discount_code ? cartItemsState.discount_code : inputValue}
                        onChange={handleInputChange}
                        placeholder="Enter discount code (if available)"
                    />
                    {couponVisible && (
                        <button onClick={handleCheck} className={cx('couponButton')}>
                            <FontAwesomeIcon icon={faQuestion}></FontAwesomeIcon>
                        </button>
                    )}
                    {!couponVisible && (
                        <FontAwesomeIcon className={cx('couponButton1')} icon={faCheck}></FontAwesomeIcon>
                    )}
                </div>
                {couponNotify && <p className={cx('couponNotify')}>Discount code is not correct</p>}
                {!couponVisible && <p className={cx('couponNotify1')}>Successfully applied discount code</p>}
                <div className={cx('totalContainer')}>
                    <div className={cx('discountContainer')}>
                        <p className={cx('title')}>DISCOUNT</p>
                        <p className={cx('content')}>${cartItemsState?.discount_value}.00</p>
                    </div>
                    <div className={cx('discountContainer')}>
                        <p className={cx('title')}>TOTAL</p>
                        <p className={cx('content')}>${cartItemsState?.total_price}.00</p>
                    </div>
                </div>
                <div className={cx('nextButton')}>
                    <button onClick={handleNextPage} to={`/shipping/${discountValue}`} className={cx('next')}>
                        ORDER
                    </button>
                </div>
            </div>
            {showToast && (
                <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 1 }}>
                    <Toast className={cx('toast')}>
                        <Toast.Body className={cx('toastBody')}>{toastMessage}</Toast.Body>
                    </Toast>
                </ToastContainer>
            )}
        </div>
    );
}

export default CartPage;
