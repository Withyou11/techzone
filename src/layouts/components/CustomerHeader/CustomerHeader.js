import { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './CustomerHeader.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faArrowRightFromBracket, faCartShopping, faHeart, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../../Context/CartContext/CartContext';

function CustomerHeader() {
    const navigate = useNavigate();
    const cartItems = useContext(CartContext);
    const cartItemsState = cartItems.cartItemsState;
    const cx = classNames.bind(styles);
    const handleTabClick = (tabName) => {
        localStorage.setItem('activeTab', tabName);
        // setActiveTab(tabName);
    };
    const handleLogout = () => {
        localStorage.removeItem('customer_id');
        localStorage.removeItem('role');
        localStorage.removeItem('activeTab');
        localStorage.removeItem('name');
        navigate('/login');
    };

    return (
        <header className={cx('wrapper')}>
            <div onClick={() => handleTabClick('home')} className={cx('logoContainer')}>
                <a href="/#" className={cx('logoText')}>
                    LIMO
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
                    <Link to={`/history/${localStorage.getItem('customer_id')}`}>Purchase History</Link>
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
                    <Link to={`/profile/${localStorage.getItem('customer_id')}`}>Profile</Link>
                </li>
            </ul>
            <div className={cx('loginContainer')}>
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                {!localStorage.getItem('name') && <p className={cx('login')}>Login</p>}
                {localStorage.getItem('name') && <p className={cx('login')}>{localStorage.getItem('name')}</p>}
            </div>
            <div onClick={handleLogout} className={cx('loginContainer')}>
                <FontAwesomeIcon style={{ fontSize: '22px' }} icon={faArrowRightFromBracket}></FontAwesomeIcon>
            </div>
            <div className={cx('heartContainer')}>
                <p className={cx('amount')}>0</p>
                <FontAwesomeIcon style={{ fontSize: '22px' }} icon={faHeart}></FontAwesomeIcon>
            </div>
            <div onClick={() => handleTabClick('home')} className={cx('cartContainer')}>
                {cartItemsState?.listProduct && <p className={cx('amount')}>{cartItemsState?.listProduct.length}</p>}
                <Link to={`/cart/${localStorage.getItem('customer_id')}`}>
                    <FontAwesomeIcon style={{ fontSize: '22px' }} icon={faCartShopping}></FontAwesomeIcon>
                </Link>
            </div>
        </header>
    );
}

export default CustomerHeader;
