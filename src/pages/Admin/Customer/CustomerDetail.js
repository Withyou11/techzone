import styles from './CustomerDetail.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faFilter } from '@fortawesome/free-solid-svg-icons';
import products from '~/Statics/products';
import { Card, Dropdown, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import customerApi from '~/api/customerApi';
import axios from 'axios';

function CustomerDetail() {
    const cx = classNames.bind(styles);
    const { id } = useParams();
    const [item, setItem] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                let list = await customerApi.getById(id);
                if (list.success) {
                    setItem(list.data);
                }
            } catch (ex) {}
        }
        fetchData();
    }, []);

    return (
        <div className={cx('main-container')}>
            <div className={cx('header')}>
                <div>
                    <h6 className={cx('title')}>Customer Detail</h6>
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('form')}>
                    <div className={cx('d-lg-flex', 'justify-content-between', 'flex-row')}>
                        <div className={cx('me-lg-4', 'col-lg-8')}>
                            <Card className={cx('col-12', 'mb-5')}>
                                <Card.Header className={cx('card-header-style')}>
                                    <h3 className={cx('h2', 'fw-bold')}>Customer Information </h3>
                                </Card.Header>
                                <Card.Body className={cx('a')}>
                                    <div className={cx('form-group', 'mb-3', 'd-md-flex')}>
                                        <div className={cx('mb-3', 'col-md-6 ', 'col-12')}>
                                            <label className={cx('form-control-label', 'h4')}>Name</label>
                                            <div className={cx('me-2')}>
                                                <div className={cx('text-large')}>{item.name}</div>
                                            </div>
                                        </div>
                                        <div className={cx('mb-3', 'col-md-6 ', 'col-12')}>
                                            <label className={cx('form-control-label', 'h4')}>Gender</label>
                                            <div className={cx('me-2')}>
                                                <div className={cx('text-large')}>{item.gender}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={cx('form-group', 'mb-3', 'd-md-flex')}>
                                        <div className={cx('mb-3', 'col-md-6 ', 'col-12')}>
                                            <label className={cx('form-control-label', 'h4')}>Phone Number</label>
                                            <div className={'me-2'}>
                                                <div className={cx('text-large')}>{item.phone_number}</div>
                                            </div>
                                        </div>
                                        <div className={cx('mb-3', 'col-md-6 ', 'col-12')}>
                                            <label className={cx('form-control-label', 'h4')}>Email</label>
                                            <div className={cx('me-2')}>
                                                <div className={cx('text-large')}>
                                                    {item.account ? item.account.email : ''}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('form-group', 'mb-3')}>
                                        <label className={cx('form-control-label', 'h4')}>Address</label>
                                        <div className={'me-2'}>
                                            <div className={cx('text-large')}>
                                                {item.address
                                                    ? item.address.street + ' Street, ' + item.address.city + ' City'
                                                    : ''}
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                            <Card className={cx('col-12', 'mb-3')}>
                                <Card.Header className={cx('card-header-style')}>
                                    <h3 className={cx('h2', 'fw-bold')}>Recent Order</h3>
                                </Card.Header>
                                <Card.Body className={cx('a')}></Card.Body>
                            </Card>
                        </div>
                        <div className={cx('col-lg-4')}>
                            <Card className={cx('text-center')}>
                                <Card.Header className={cx('card-header-style')}>
                                    <h3 className={cx('h2', 'fw-bold')}>Avatar</h3>
                                </Card.Header>
                                <Card.Body className={cx('p-4', 'mb-3')}>
                                    <div>
                                        <img
                                            src={
                                                item.account
                                                    ? item.account.avatar
                                                    : require('../../../assets/images/avatar.png')
                                            }
                                            id="img"
                                            alt="user"
                                            className={cx('w-100')}
                                        />
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>

                    <div class={cx('mt-5', 'd-flex')}>
                        <div>
                            <a
                                href="/admin/customers"
                                class={cx(
                                    'btn',
                                    'btn-secondary',
                                    'opacity-75',
                                    'text-white',
                                    'text-center',
                                    'border-0',
                                    'btn-custom',
                                )}
                            >
                                Back to List
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerDetail;
