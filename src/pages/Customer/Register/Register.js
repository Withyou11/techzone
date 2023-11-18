import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import logo from '~/assets/images/logo.png';
import { useNavigate, Link } from 'react-router-dom';
function Register() {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const cx = classNames.bind(styles);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const errors = [];

        if (!name) {
            errors.push('Full name field cannot be empty.');
        }

        const phoneRegex = /^\d{10}$/; // Matches 10 digits
        if (!phoneRegex.test(phoneNumber)) {
            errors.push('Invalid phone number. Please enter a 10-digit phone number.');
        }

        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            errors.push('Invalid email.');
        }

        if (password.length < 6) {
            errors.push('Password should be at least 6 characters long.');
        }

        if (confirmPassword != password) {
            errors.push('Confirm password is not valid.');
        }

        // Display errors in a single alert
        if (errors.length > 0) {
            alert(errors.join('\n'));
            return;
        }

        const userData = {
            name: name,
            phone_number: phoneNumber,
            email: email,
            password: password,
        };

        fetch('http://localhost:3001/auth/sign_up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then((response) => {
                response.json();
                console.log(response);
                if (response.status == 201) {
                    navigate('/login');
                }
            })
            // .then((data) => {
            //     console.log(data);
            // })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <p className={cx('limo')}>LIMO</p>
                <p className={cx('title')}>Register</p>
            </div>
            <div className={cx('content')}>
                <div className={cx('logoContainer')}>
                    <img className={cx('logo')} src={logo} alt="logo" />
                    <p className={cx('limoLarge')}>LIMO</p>
                </div>
                <form className={cx('form')} onSubmit={handleFormSubmit}>
                    <h3 style={{ fontSize: '28px', opacity: 0.6 }}>Register</h3>
                    <input
                        type="text"
                        className={cx('form-control')}
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        className={cx('form-control')}
                        placeholder="Enter your phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <input
                        type="text"
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
                    <input
                        type="password"
                        className={cx('form-control')}
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button type="submit" className={cx('loginButton')}>
                        Register
                    </button>
                    <div className={cx('bottomContainer')}>
                        <p>Already have account?</p>
                        <Link to={`/login`}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
