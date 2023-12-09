import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';
import MenuNavigation from '../components/MenuNavigation/MenuNavigation';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBacon, faBars, faBurger, faHamburger } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function AdminLayout({ children }) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div className={cx('main-contain')}>
                <div className={cx('row', 'flex-nowrap')}>
                    {open ? (
                        <div className={cx('bg-dark', 'pt-4', 'p-0')} style={{ width: 300, transition: '0.3s' }}>
                            <p className={cx('ms-4', 'mb-4', 'text-white', 'fw-bold')}>MENU</p>
                            <MenuNavigation />
                        </div>
                    ) : (
                        <div
                            className={cx('bg-dark', 'pt-4', 'p-0')}
                            style={{ width: 0, overflow: 'hidden', transition: '0.3s' }}
                        >
                            <p className={cx('ms-4', 'mb-4', 'text-white', 'fw-bold')}>MENU</p>
                            <MenuNavigation />
                        </div>
                    )}

                    <div className={cx('min-vh-100', 'mt-4')}>
                        <div className={cx('container-fluid', 'body-content', 'ms-2', 'me-2')}>
                            <div id="btn-menu" className={cx('p', 'text-decoration-none', 'mb-5', 'm-0')}>
                                <div>
                                    <FontAwesomeIcon
                                        style={{ cursor: 'pointer', color: 'black' }}
                                        icon={faBars}
                                        fontSize={24}
                                        onClick={() => setOpen(!open)}
                                    />
                                </div>
                            </div>
                            <div className="me-3">{children}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;
