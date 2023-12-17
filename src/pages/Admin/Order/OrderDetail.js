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
import { NotificationManager } from 'react-notifications';

function OrderDetail() {
    const cx = classNames.bind(styles);
    const { id } = useParams();
    const [item, setItem] = useState(null);
    async function fetchData() {
        try {
            let list = await orderApi.getById(id);
            console.log(list);

            if (list.success) {
                setItem(list.data);
                console.log(list.data);
            }
        } catch (ex) {}
    }
    useEffect(() => {
        fetchData();
    }, []);
    const handleChangeStatus = async (status) => {
        try {
            let list = await orderApi.updateStatus(id, {
                status: status,
            });
            console.log(list);

            if (list.success) {
                NotificationManager.success('Update status successfully');
                await fetchData();
            } else NotificationManager.error('Update status failed');
        } catch (ex) {
            NotificationManager.error('Error: ' + ex.message);
        }
    };

    return item ? (
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
                            <Card className={cx('col-12', 'mb-4')}>
                                <Card.Header className={cx('card-header-style')}>
                                    <h3 className={cx('h2', 'fw-bold')}>Items</h3>
                                </Card.Header>
                                <Card.Body className={cx('p-0')}>
                                    <table className={cx('sa-table', 'table', 'text-nowrap', 'm-0')} width="100%">
                                        <tbody className={cx('p-0')}>
                                            {item &&
                                                item.order_details.map((value, index) => {
                                                    return (
                                                        <tr className={cx('border-0')}>
                                                            <td className={cx('d-flex', 'overflow-hidden')}>
                                                                <div>
                                                                    <img height="60" width="60" src="" alt="prd" />
                                                                </div>
                                                                <div className={cx('vertical-middle')}>
                                                                    <Link
                                                                        to={`/admin/products/detail/${value.product_id}`}
                                                                    >
                                                                        {value.product.name}
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                            <td>{value.product.price}</td>
                                                            <td style={{ minWidth: 40 }}>{value.quantity}</td>
                                                            <td style={{ textAlign: 'end', paddingRight: '20px' }}>
                                                                <div>
                                                                    <strong>$</strong>
                                                                    {value.quantity * value.product.price}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                        </tbody>
                                    </table>
                                </Card.Body>
                                <Card.Footer className={cx('card-header-style', 'd-flex', 'justify-content-between')}>
                                    <h3 className={cx('h3', 'fw-bold')}>Total</h3>
                                    <h3 className={cx('h3')}>${item.total_price}</h3>
                                </Card.Footer>
                            </Card>
                            <Card className={cx('mb-4', 'p-3')}>
                                <Card.Body className={cx('d-md-flex')}>
                                    <div style={{ marginRight: '60px' }}>
                                        <h3 className={cx('fw-bold', 'mb-3')}>Date Of Payment</h3>
                                        <div className={cx('')}>{item.date}</div>
                                    </div>
                                    <div style={{ marginRight: '60px' }} className={cx('mt-5', 'mt-md-0')}>
                                        <h3 className={cx('fw-bold', 'mb-3')}>Status</h3>
                                        <div
                                            className={
                                                item.status.toLowerCase().includes('shipping')
                                                    ? cx('text-warning', 'fw-bold')
                                                    : item.status.toLowerCase().includes('complete')
                                                    ? cx('text-success', 'fw-bold')
                                                    : item.status.toLowerCase().includes('processing')
                                                    ? cx('text-primary', 'fw-bold')
                                                    : cx('text-danger', 'fw-bold')
                                            }
                                        >
                                            {item.status}
                                        </div>
                                    </div>
                                    <div style={{ marginRight: '60px' }} className={cx('mt-5', 'mt-md-0')}>
                                        <h3 className={cx('fw-bold', 'mb-3')}>Payment Method</h3>
                                        <div className={cx('')}>{item.payment_method}</div>
                                    </div>
                                </Card.Body>
                            </Card>
                            <Card className={cx('col-12', 'mb-4')}>
                                <Card.Header className={cx('card-header-style')}>
                                    <h3 className={cx('h2', 'fw-bold')}>Shipping Address</h3>
                                </Card.Header>
                                <Card.Body className={cx('p-4')}>
                                    <div>{'Street: ' + JSON.parse(item.destination).street}</div>
                                    <div>{'City: ' + JSON.parse(item.destination).city}</div>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className={cx('col-lg-4')}>
                            <Card className={cx('text-center', 'mb-4')}>
                                <Card.Header className={cx('card-header-style')}>
                                    <h3 className={cx('h2', 'fw-bold')}>Avatar</h3>
                                </Card.Header>
                                <Card.Body className={cx('p-5', 'mb-3')}>
                                    <div>
                                        <img
                                            src={
                                                item.customer
                                                    ? item.customer.account.avatar
                                                    : require('../../../assets/images/avatar.png')
                                            }
                                            id="img"
                                            alt="user"
                                            className={cx('w-100')}
                                        />
                                    </div>
                                </Card.Body>
                            </Card>
                            <Card className={cx('text-center')}>
                                <Card.Header className={cx('card-header-style')}>
                                    <h3 className={cx('h2', 'fw-bold')}>Contact Person</h3>
                                </Card.Header>
                                <Card.Body className={cx('p-4', 'mb-3')}>
                                    <div className={cx('fw-bold')}>{item.customer.name}</div>
                                    <a
                                        href={'mailto:' + item.customer.account.email}
                                        className={cx('fw-bold', 'text-primary')}
                                    >
                                        {item.customer.account.email}
                                    </a>
                                    <div>{item.customer.phone_number}</div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                    <div className="d-flex">
                        {item.status.toLowerCase().includes('shipping') ? (
                            <div class={cx('mt-5', 'd-flex', 'me-2')}>
                                <div>
                                    <button
                                        class={cx(
                                            'btn',
                                            'btn-success',
                                            'opacity-75',
                                            'text-white',
                                            'text-center',
                                            'border-0',
                                            'btn-custom',
                                        )}
                                        onClick={(e) => handleChangeStatus('Complete')}
                                    >
                                        Change to Complete
                                    </button>
                                </div>
                            </div>
                        ) : item.status.toLowerCase().includes('processing') ? (
                            <div class={cx('mt-5', 'd-flex', 'me-2')}>
                                <div className="me-2">
                                    <button
                                        class={cx(
                                            'btn',
                                            'btn-warning',
                                            'opacity-75',
                                            'text-white',
                                            'text-center',
                                            'border-0',
                                            'btn-custom',
                                        )}
                                        onClick={(e) => handleChangeStatus('Shipping')}
                                    >
                                        Confirm
                                    </button>
                                </div>
                                <div>
                                    <button
                                        class={cx(
                                            'btn',
                                            'btn-danger',
                                            'opacity-75',
                                            'text-white',
                                            'text-center',
                                            'border-0',
                                            'btn-custom',
                                        )}
                                        onClick={(e) => handleChangeStatus('Cancel')}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            ''
                        )}
                        <div class={cx('mt-5', 'd-flex')}>
                            <div>
                                <a
                                    href="/admin/orders"
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
        </div>
    ) : (
        ''
    );
}

export default OrderDetail;
