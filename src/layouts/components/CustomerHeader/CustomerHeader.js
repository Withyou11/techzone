import { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './CustomerHeader.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import {
    faArrowRightFromBracket,
    faCartShopping,
    faHeart,
    faMagnifyingGlass,
    faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../../Context/CartContext/CartContext';

function CustomerHeader() {
    const navigate = useNavigate();
    const cartItems = useContext(CartContext);
    const cartItemsState = cartItems.cartItemsState;
    const cx = classNames.bind(styles);
    const handleTabClick = (tabName) => {
        localStorage.removeItem('activeTab');
        localStorage.setItem('activeTab', tabName);
        // setActiveTab(tabName);
    };
    const handleLogout = () => {
        localStorage.removeItem('customerName');
        localStorage.removeItem('employee');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('employee_id');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('expires');
        localStorage.removeItem('activeTab');
        navigate('/login');
    };

    return (
        <header className={cx('wrapper')}>
            <div onClick={() => handleTabClick('home')} className={cx('logoContainer')}>
                <a href="/#" className={cx('logoText')}>
                    TechZone
                </a>
            </div>
            <ul className={cx('tabList')}>
                <li
                    className={cx('tab', { active: localStorage.getItem('activeTab') === 'home' })}
                    onClick={() => handleTabClick('home')}
                >
                    <a href="/#">Home</a>
                </li>
                <li
                    className={cx('tab', { active: localStorage.getItem('activeTab') === 'products' })}
                    onClick={() => handleTabClick('products')}
                >
                    <Link to="/products">Products</Link>
                </li>
                <li
                    className={cx('tab', { active: localStorage.getItem('activeTab') === 'history' })}
                    onClick={() => handleTabClick('history')}
                >
                    <Link to={`/history/${localStorage.getItem('customerId')}`}>Purchase History</Link>
                </li>
                <li
                    className={cx('tab', { active: localStorage.getItem('activeTab') === 'about' })}
                    onClick={() => handleTabClick('about')}
                >
                    <Link to="/about">About us</Link>
                </li>
                <li
                    className={cx('tab', { active: localStorage.getItem('activeTab') === 'profile' })}
                    onClick={() => handleTabClick('profile')}
                >
                    <Link to={`/profile`}>Profile</Link>
                </li>
            </ul>
            <div className={cx('loginContainer')}>
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                {!localStorage.getItem('customerName') && <p className={cx('login')}>Login</p>}
                {localStorage.getItem('customerName') && (
                    <p className={cx('login')}>{localStorage.getItem('customerName')}</p>
                )}
            </div>
            <div onClick={handleLogout} className={cx('loginContainer')}>
                <FontAwesomeIcon style={{ fontSize: '22px' }} icon={faArrowRightFromBracket}></FontAwesomeIcon>
            </div>
            <div className={cx('heartContainer')}>
                {cartItemsState?.cart_details && <p className={cx('amount')}>0</p>}
                <FontAwesomeIcon style={{ fontSize: '22px', color: 'black' }} icon={faHeart}></FontAwesomeIcon>
            </div>
            <div onClick={() => handleTabClick('home')} className={cx('cartContainer')}>
                {cartItemsState?.cart_details && <p className={cx('amount')}>{cartItemsState?.cart_details.length}</p>}
                <Link to={`/cart`}>
                    <FontAwesomeIcon
                        style={{ fontSize: '22px', color: 'black' }}
                        icon={faCartShopping}
                    ></FontAwesomeIcon>
                </Link>
            </div>
            <div onClick={handleLogout} className={cx('cartContainer')}>
                <FontAwesomeIcon
                    style={{ fontSize: '22px', color: 'black' }}
                    icon={faRightFromBracket}
                ></FontAwesomeIcon>
            </div>
        </header>
    );
}

export default CustomerHeader;
