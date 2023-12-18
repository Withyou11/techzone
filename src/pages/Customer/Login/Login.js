import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import logo from '~/assets/images/logo.png';
import { useNavigate, Link } from 'react-router-dom';
import authApi from '~/api/authApi';

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

        var form = new FormData();
        form.append('email', email);
        form.append('password', password);

        // API call for login
        async function login() {
            try {
                let login = await authApi.login(form);
                localStorage.setItem('expires', login.expires_in);
                localStorage.setItem('accessToken', login.access_token);
                localStorage.setItem('refreshToken', login.refresh_token);

                let profile = await authApi.profile();
                localStorage.setItem('customerName', profile.customer.name);
                localStorage.setItem('role', profile.role);

                if (profile.role.includes('customer')) {
                    navigate('/');
                } else {
                    navigate('/admin/dashboard');
                }
                // if else gì đó ở đây
            } catch (ex) {
                alert('Login failed!');
            }
        }
        login();
    };

    return (
        <div className={cx('wrapper')}>
            <Link to={'/'} className={cx('header')}>
                <p className={cx('limo')}>TechZone</p>
                <p className={cx('title')}>Login</p>
            </Link>
            <div className={cx('content')}>
                <div className={cx('logoContainer')}>
                    <img className={cx('logo')} src={logo} alt="logo" />
                    <p className={cx('limoLarge')}>TechZone</p>
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
