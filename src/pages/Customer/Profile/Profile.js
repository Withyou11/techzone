import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import FunctionTitle from '~/components/FunctionTitle/FunctionTitle';
import avatar from '~/assets/images/avatar.png';
function Profile() {
    const [customerInfo, setCustomerInfo] = useState({});

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
        window.scrollTo(0, 0);
    }, []);
    const cx = classNames.bind(styles);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState(customerInfo?.name);
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const [city, setCity] = useState(customerInfo.address?.city);
    const handleCityChange = (e) => {
        setCity(e.target.value);
    };
    const [district, setDistrict] = useState(customerInfo.address?.district);
    const handleDistrictChange = (e) => {
        setDistrict(e.target.value);
    };
    const [detail, setDetail] = useState(customerInfo.address?.detail);
    const handleDetailChange = (e) => {
        setDetail(e.target.value);
    };

    const [phoneNumber, setPhoneNumber] = useState(customerInfo?.phone_number);
    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const [dateOfBirth, setDateOfBirth] = useState(customerInfo?.birthday);
    const handleDateChange = (e) => {
        setDateOfBirth(e.target.value);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    const [gender, setGender] = useState(customerInfo?.gender);
    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };
    const handleFormSubmit = (event) => {
        const data = {
            name: name,
            phone_number: phoneNumber,
            gender: gender,
            birthday: dateOfBirth,
            address: {
                city: city,
                district: district,
                detail: detail,
            },
        };
        event.preventDefault();
        if (!gender || !dateOfBirth || !city || !district || !detail || !name || !phoneNumber) {
            console.log('🚀 ~ file: Profile.js:75 ~ handleFormSubmit ~ phoneNumber:', phoneNumber);
            console.log('🚀 ~ file: Profile.js:75 ~ handleFormSubmit ~ name:', name);
            console.log('🚀 ~ file: Profile.js:75 ~ handleFormSubmit ~ detail:', detail);
            console.log('🚀 ~ file: Profile.js:75 ~ handleFormSubmit ~ district:', district);
            console.log('🚀 ~ file: Profile.js:75 ~ handleFormSubmit ~ city:', city);
            console.log('🚀 ~ file: Profile.js:75 ~ handleFormSubmit ~ dateOfBirth:', dateOfBirth);
            console.log('🚀 ~ file: Profile.js:75 ~ handleFormSubmit ~ gender:', gender);
            window.alert('Please enter all required information');
        } else {
            if (validateDateOfBirth(dateOfBirth) && validateFullName(name)) {
                fetch(`http://localhost:3001/customers/${localStorage.getItem('customer_id')}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                    .then((respone) => respone.json())
                    .then((data) => {
                        window.location.reload();
                    });
            } else {
                alert('Wrong data format');
            }
        }
    };

    function validateFullName(fullName) {
        // Check if the input is empty
        if (fullName.trim() === '') {
            return false;
        }
        var regex = /^[A-Za-z\s]+$/;
        if (!regex.test(fullName)) {
            return false;
        }
        return true;
    }

    function validateDateOfBirth(dateString) {
        // Regular expression pattern for yyyy-mm-dd format
        const pattern = /^\d{4}-\d{2}-\d{2}$/;

        // Check if the date string matches the pattern
        if (!pattern.test(dateString)) {
            return false;
        }

        // Parse the date string to check if it's a valid date
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are zero-based
        const day = date.getDate();

        // Check if the parsed date components match the input date
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        return formattedDate === dateString;
    }

    const handleUpdateProfile = () => {
        setIsModalOpen(true);
    };
    return (
        <div>
            <FunctionTitle title="Home > Your Profile" />
            <div className={cx('wrapper')}>
                <div className={cx('imageContainer')}>
                    <img src={avatar} className={cx('avatar')} />
                    <p className={cx('nameBold')}>{customerInfo.name}</p>
                    <button onClick={handleUpdateProfile} className={cx('edit')}>
                        Update Profile
                    </button>
                </div>

                <div className={cx('fullProfile')}>
                    <p className={cx('title')}>Profile</p>
                    <hr />
                    <div className={cx('profileItem')}>
                        <div className={cx('titleContainer')}>
                            <p className={cx('profileTitle')}>Name:</p>
                        </div>
                        <p className={cx('content')}>{customerInfo.name}</p>
                    </div>
                    <div className={cx('profileItem')}>
                        <div className={cx('titleContainer')}>
                            <p className={cx('profileTitle')}>Email:</p>
                        </div>
                        <p className={cx('content')}>{customerInfo.email}</p>
                    </div>
                    <div className={cx('profileItem')}>
                        <div className={cx('titleContainer')}>
                            <p className={cx('profileTitle')}>Phone Number:</p>
                        </div>
                        <p className={cx('content')}>{customerInfo.phone_number}</p>
                    </div>
                    <div className={cx('profileItem')}>
                        <div className={cx('titleContainer')}>
                            <p className={cx('profileTitle')}>Gender:</p>
                        </div>
                        <p className={cx('content')}>{customerInfo.gender}</p>
                    </div>
                    <div className={cx('profileItem')}>
                        <div className={cx('titleContainer')}>
                            <p className={cx('profileTitle')}>Date of birth:</p>
                        </div>
                        <p className={cx('content')}>{customerInfo.birthday}</p>
                    </div>
                    <p className={cx('title')}>Address</p>
                    <hr />
                    <div className={cx('profileItem')}>
                        <div className={cx('titleContainer')}>
                            <p className={cx('profileTitle')}>City:</p>
                        </div>
                        <p className={cx('content')}>{customerInfo.address?.city}</p>
                    </div>
                    <div className={cx('profileItem')}>
                        <div className={cx('titleContainer')}>
                            <p className={cx('profileTitle')}>District:</p>
                        </div>
                        <p className={cx('content')}>{customerInfo.address?.district}</p>
                    </div>
                    <div className={cx('profileItem')}>
                        <div className={cx('titleContainer')}>
                            <p className={cx('profileTitle')}>Address:</p>
                        </div>
                        <p className={cx('content')}>{customerInfo.address?.detail}</p>
                    </div>
                </div>
                {isModalOpen && (
                    <div className={cx('modal')}>
                        {/* Modal content */}
                        <div className={cx('modalContent')}>
                            {/* Modal form */}
                            <form>
                                <h2>Update Profile</h2>
                                <input
                                    className={cx('input')}
                                    type="text"
                                    value={name}
                                    defaultValue={customerInfo.name}
                                    placeholder="David Nguyen"
                                    onChange={handleNameChange}
                                />
                                <input
                                    style={{ backgroundColor: '#f1f1f1', cursor: 'default' }}
                                    className={cx('input')}
                                    type="email"
                                    defaultValue={customerInfo.email}
                                    readOnly
                                />
                                <input
                                    className={cx('input')}
                                    type="text"
                                    value={phoneNumber}
                                    defaultValue={customerInfo.phone_number}
                                    placeholder="0123456789"
                                    onChange={handlePhoneNumberChange}
                                />
                                <div className={cx('radioContainer')}>
                                    <label className={cx('radioLabel')}>
                                        <input
                                            className={cx('radioButton')}
                                            type="radio"
                                            id="gender"
                                            name="gender"
                                            value="Male"
                                            checked={gender === 'Male'}
                                            onChange={handleGenderChange}
                                        />
                                        Male
                                    </label>
                                    <label className={cx('radioLabel')}>
                                        <input
                                            className={cx('radioButton')}
                                            type="radio"
                                            id="gender"
                                            name="gender"
                                            value="Female"
                                            checked={gender === 'Female'}
                                            onChange={handleGenderChange}
                                        />
                                        Female
                                    </label>
                                    <label className={cx('radioLabel')}>
                                        <input
                                            className={cx('radioButton')}
                                            type="radio"
                                            id="gender"
                                            name="gender"
                                            value="Other"
                                            checked={gender === 'Other'}
                                            onChange={handleGenderChange}
                                        />
                                        Other
                                    </label>
                                </div>
                                <input
                                    className={cx('input')}
                                    type="text"
                                    defaultValue={customerInfo.birthday}
                                    value={dateOfBirth}
                                    onChange={handleDateChange}
                                    placeholder="2002-03-25"
                                />
                                <input
                                    className={cx('input')}
                                    type="text"
                                    value={city}
                                    defaultValue={customerInfo.address?.city}
                                    onChange={handleCityChange}
                                    placeholder="Ho Chi Minh City"
                                />
                                <input
                                    className={cx('input')}
                                    type="text"
                                    value={district}
                                    defaultValue={customerInfo.address?.district}
                                    onChange={handleDistrictChange}
                                    placeholder="District 1"
                                />
                                <input
                                    className={cx('input')}
                                    type="text"
                                    value={detail}
                                    defaultValue={customerInfo.address?.detail}
                                    onChange={handleDetailChange}
                                    placeholder="15 Le Duan"
                                />
                                <div className={cx('buttons')}>
                                    <button onClick={handleFormSubmit} type="submit">
                                        Save
                                    </button>
                                    <button type="button" onClick={handleModalClose}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
