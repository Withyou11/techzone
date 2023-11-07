import React from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
function Footer() {
    const cx = classNames.bind(styles);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('infoContainer')}>
                <h4>Customer Support</h4>
                <ul>
                    <li>Privilege card</li>
                    <li>Online purchasing guide</li>
                    <li>Business-exclusive benefits</li>
                    <li>Install payment policy</li>
                </ul>
            </div>
            <div className={cx('infoContainer')}>
                <h4>Purchase Policy</h4>
                <ul>
                    <li>General transaction terms</li>
                    <li>Guarantee policy</li>
                    <li>Exchange policy</li>
                    <li>Payment policy</li>
                </ul>
            </div>
            <div className={cx('infoContainer')}>
                <h4>Limo Information</h4>
                <ul>
                    <li>Limo introduction</li>
                    <li>Service center</li>
                    <li>FAQ</li>
                    <li>Recruitment</li>
                </ul>
            </div>
            <div className={cx('infoContainer')}>
                <h4>Limo community</h4>
                <ul>
                    <li>
                        Call to purchase (toll-free) <span style={{ color: '#0058DB' }}>0123456789</span>
                    </li>
                    <li>
                        Contact customer support <span style={{ color: '#0058DB' }}>0123456788</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;
