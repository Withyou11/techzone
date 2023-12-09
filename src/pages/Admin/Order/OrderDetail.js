import styles from './OrderDetail.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faFilter } from '@fortawesome/free-solid-svg-icons';
import products from '~/Statics/products';
import { Card, Dropdown, Form } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import customerApi from '~/api/customerApi';
import axios from 'axios';
import orderApi from '~/api/orderApi';

function OrderDetail() {
    const cx = classNames.bind(styles);
    const { id } = useParams();
    const [item, setItem] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                let list = await orderApi.getById(id);
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
                    <h6 className={cx('title')}>Order Detail</h6>
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('form')}>
                    <div className={cx('d-lg-flex', 'justify-content-between', 'flex-row')}>
                        <div className={cx('me-lg-4', 'col-lg-8')}>
                            <Card className={cx('col-12', 'mb-5')}>
                                <Card.Header className={cx('card-header-style')}>
                                    <h3 className={cx('h2', 'fw-bold')}>Items</h3>
                                </Card.Header>
                                <Card.Body className={cx('p-0')}>
                                    <table className={cx('sa-table', 'table', 'text-nowrap', 'm-0')} width="100%">
                                        <tbody className={cx('p-0')}>
                                            <tr className={cx('border-0')}>
                                                <td className={cx('d-flex', 'overflow-hidden')}>
                                                    <div>
                                                        <img height="60" width="60" src="" alt="prd" />
                                                    </div>
                                                    <div className={cx('vertical-middle')}>
                                                        <Link className="" href="">
                                                            Product name
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td>@item.Product.Price</td>
                                                <td style={{ minWidth: 40 }}>2</td>
                                                <td>
                                                    <div>
                                                        <strong>$</strong>99
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Card.Body>
                                <Card.Footer className={cx('card-header-style', 'd-flex', 'justify-content-between')}>
                                    <h3 className={cx('h3', 'fw-bold')}>Total</h3>
                                    <h3 className={cx('h3')}>$100</h3>
                                </Card.Footer>
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

export default OrderDetail;
