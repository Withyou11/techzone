import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import logo from '~/assets/images/logo.png';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const cx = classNames.bind(styles);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const errors = [];
        if (!email) {
            errors.push('Email field cannot be empty.');
        }

        if (!password) {
            errors.push('Password should be at least 6 characters long.');
        }

        if (errors.length > 0) {
            alert(errors.join('\n'));
            return;
        }

        // API call for login
        const userData = {
            email: email,
            password: password,
        };

        fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.account_info.role === 'customer') {
                    localStorage.setItem('customer_id', data.account_info.customer_id);
                    localStorage.setItem('name', data.account_info.name);
                    localStorage.setItem('role', data.account_info.role);
                    localStorage.setItem('activeTab', 'home');
                    navigate('/');
                } else if (data.account_info.role === 'employee') {
                    localStorage.setItem('employee', data.account_info.name);
                    navigate('/order');
                } else {
                    navigate('/dashboard');
                }
            })
            .catch((error) => {
                // Handle any errors
                console.error(error);
            });

        // Other form submission logic
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <p className={cx('limo')}>LIMO</p>
                <p className={cx('title')}>Login</p>
            </div>
            <div className={cx('content')}>
                <div className={cx('logoContainer')}>
                    <img className={cx('logo')} src={logo} alt="logo" />
                    <p className={cx('limoLarge')}>LIMO</p>
                </div>
                <form className={cx('form')} onSubmit={handleFormSubmit}>
                    <h3 style={{ fontSize: '28px', opacity: 0.6 }}>Login</h3>
                    <input
                        type="email"
                        className={cx('form-control')}
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className={cx('form-control')}
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className={cx('loginButton')}>
                        Login
                    </button>
                    <div className={cx('bottomContainer')}>
                        <p>Forgot password?</p>
                        <Link to={`/register`}>Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
