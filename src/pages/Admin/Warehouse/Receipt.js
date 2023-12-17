import styles from './Receipt.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { Card, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ConfirmDialog from '~/components/Dialog/ConfirmDialog';
import discountApi from '~/api/discountApi';
import warehouseApi from '~/api/warehouseApi';

function Receipt() {
    const cx = classNames.bind(styles);
    const [data, setData] = useState([]);
    const [product, setProduct] = useState('');
    const [warehouse, setWarehouse] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [unit, setUnit] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [page, setPage] = useState(1);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    async function fetchData() {
        try {
            let list = await warehouseApi.getAllReceipt();
            if (list.success) {
                setData(list.data);
            }
        } catch (ex) {
            console.log(ex);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        if (showForm) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'visible';
        }
    }, [showForm]);

    const onDelete = async (id) => {
        setIsOpenDialog(false);

        try {
            let result = await discountApi.delete(id);
            if (result.success) {
                NotificationManager.success('Delete the discount successfully', 'Success');
                fetchData();
            } else {
                NotificationManager.error('Delete the discount failed', 'Error');
            }
        } catch (ex) {
            NotificationManager.error('Delete the discount failed', 'Error');
            console.log(ex);
        }
    };
    const handleDelete = async (id) => {
        setIsOpenDialog(true);
        setDeleteId(id);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let result = await warehouseApi.receipt({
                warehouse_details: [
                    {
                        warehouse_id: warehouse,
                        product_id: product,
                        quantity: quantity,
                        unit: unit,
                    },
                ],
            });
            if (result.success) {
                NotificationManager.success('Receipt successfully', 'Success');
                fetchData();
                setWarehouse('');
                setProduct('');
                setUnit('');
                setQuantity(0);
                setShowForm(false);
            } else {
                NotificationManager.error('Receipt failed', 'Error');
            }
        } catch (ex) {
            NotificationManager.error('Receipt failed', 'Error');
            console.log(ex);
        }
    };
    const handleBackgroundClick = (e) => {
        if (!e.target.closest('.card')) {
            setShowForm(false);
        }
    };
    return (
        <div className={cx('main-container')}>
            <ConfirmDialog
                isOpenDialog={isOpenDialog}
                setIsOpenDialog={setIsOpenDialog}
                question={'Do you want to delete it?'}
                action={onDelete}
                id={deleteId}
            />
            <div className={cx('header')}>
                <div>
                    <h6 className={cx('title')}>Product Receipt History</h6>
                </div>
                <div className={cx('header-right')}>
                    <div to="/admin/warehouse/create" className={cx('btn-add-new')} onClick={(e) => setShowForm(true)}>
                        <FontAwesomeIcon icon={Icons.faAdd} className={cx('icon')} />
                        <h5 className={cx('filter-text')}>Receive</h5>
                    </div>
                </div>
            </div>
            <div className={cx('content')}>
                <table className={cx('col-12')}>
                    <thead>
                        <th>Product ID</th>
                        <th>Warehouse ID</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Trans Date</th>
                        {/* <th></th> */}
                    </thead>
                    <tbody>
                        {data.map((value, index) => {
                            return (
                                <tr>
                                    <td>{value.product_id}</td>
                                    <td>{value.warehouse_id}</td>
                                    <td>{value.quantity}</td>
                                    <td>{value.unit}</td>
                                    <td>{new Date(value.created_at).toUTCString()}</td>
                                    {/* <td>
                                        <button
                                            className={cx('btn', 'btn-danger', 'p-2')}
                                            value={value.discount_id}
                                            onClick={(e) => handleDelete(value.discount_id)}
                                        >
                                            <FontAwesomeIcon fontSize={20} icon={Icons.faTrash} />
                                        </button>
                                    </td> */}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {showForm && (
                    <div className={cx('form-create-background')} onClick={handleBackgroundClick}>
                        <Card className={cx('form-create')}>
                            <Card.Header className={cx('card-header-style')}>TO RECEIPT</Card.Header>
                            <Card.Body className={cx('p-5')}>
                                <form onSubmit={handleSubmit}>
                                    <h4 className="mb-2">PRODUCT</h4>
                                    <Form.Control
                                        required
                                        className={cx('text-large', 'mb-4')}
                                        value={product}
                                        onChange={(e) => setProduct(e.target.value)}
                                    />
                                    <h4 className="mb-2">WAREHOUSE</h4>
                                    <Form.Control
                                        required
                                        className={cx('text-large', 'mb-4')}
                                        value={warehouse}
                                        onChange={(e) => setWarehouse(e.target.value)}
                                    />
                                    <div className="d-flex">
                                        <div>
                                            <h4 className="mb-2">QUANTITY</h4>
                                            <Form.Control
                                                required
                                                className={cx('text-large', 'mb-4', 'me-2')}
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                                type="number"
                                            />
                                        </div>

                                        <div>
                                            <h4 className="mb-2">UNIT</h4>
                                            <Form.Control
                                                required
                                                className={cx('text-large', 'mb-4', 'me-2')}
                                                value={unit}
                                                onChange={(e) => setUnit(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <input
                                        className={cx('col-12', 'btn', 'btn-dark', 'p-3')}
                                        type="submit"
                                        value="Submit"
                                    />
                                </form>
                            </Card.Body>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Receipt;
