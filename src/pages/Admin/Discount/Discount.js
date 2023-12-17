import styles from './Discount.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { Card, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import categoryApi from '~/api/categoryApi';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ConfirmDialog from '~/components/Dialog/ConfirmDialog';
import discountApi from '~/api/discountApi';

function Discount() {
    const cx = classNames.bind(styles);
    const [data, setData] = useState([]);
    const [code, setCode] = useState('');
    const [value, setValue] = useState(0);
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [page, setPage] = useState(1);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    async function fetchData() {
        try {
            let list = await discountApi.getAll();
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
    const generateCode = (e) => {
        const characters = 'abcdefghijklmnopqrstuvwxyz' + 'abcdefghijklmnopqrstuvwxyz'.toUpperCase() + '1234567890'; // Các ký tự chữ cái
        let randomString = '';

        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }

        setCode(randomString);
    };
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
            let result = await discountApi.create({
                code: code,
                discount_value: value,
                start_day: start,
                end_day: end,
            });
            if (result.success) {
                NotificationManager.success('Create the discount successfully', 'Success');
                fetchData();
                setCode('');
                setValue(0);
                setEnd(null);
                setStart(null);
                setShowForm(false);
            } else {
                NotificationManager.error('Create the discount failed', 'Error');
            }
        } catch (ex) {
            NotificationManager.error('Create the discount failed', 'Error');
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
                    <h6 className={cx('title')}>Discounts</h6>
                </div>
                <div className={cx('header-right')}>
                    <div to="/admin/warehouse/create" className={cx('btn-add-new')} onClick={(e) => setShowForm(true)}>
                        <FontAwesomeIcon icon={Icons.faAdd} className={cx('icon')} />
                        <h5 className={cx('filter-text')}>Add new</h5>
                    </div>
                </div>
            </div>
            <div className={cx('content')}>
                <table className={cx('col-12')}>
                    <thead>
                        <th>Code</th>
                        <th>Value</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th></th>
                    </thead>
                    <tbody>
                        {data.map((value, index) => {
                            return (
                                <tr>
                                    <td>{value.code}</td>
                                    <td>{value.discount_value}</td>
                                    <td>{value.start_day}</td>
                                    <td>{value.end_day}</td>
                                    <td>
                                        {new Date(value.end_day) < new Date()
                                            ? 'Expired'
                                            : new Date() > new Date(value.start_day)
                                            ? 'Valid'
                                            : 'Incoming'}
                                    </td>
                                    <td>
                                        <button
                                            className={cx('btn', 'btn-danger', 'p-2')}
                                            value={value.discount_id}
                                            onClick={(e) => handleDelete(value.discount_id)}
                                        >
                                            <FontAwesomeIcon fontSize={20} icon={Icons.faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {showForm && (
                    <div className={cx('form-create-background')} onClick={handleBackgroundClick}>
                        <Card className={cx('form-create')}>
                            <Card.Header className={cx('card-header-style')}>ADD NEW DISCOUNT</Card.Header>
                            <Card.Body className={cx('p-5')}>
                                <form onSubmit={handleSubmit}>
                                    <h4 className="mb-2">CODE</h4>
                                    <div className="d-flex">
                                        <Form.Control
                                            className={cx('text-large', 'mb-4', 'me-2', 'w-50')}
                                            value={'Generate'}
                                            type="button"
                                            onClick={generateCode}
                                        />
                                        <Form.Control
                                            required
                                            className={cx('text-large', 'mb-4', 'w-75')}
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
                                            placeholder="Code discount..."
                                        />
                                    </div>

                                    <h4 className="mb-2">VALUE DISCOUNT</h4>
                                    <Form.Control
                                        required
                                        className={cx('text-large', 'mb-4')}
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                        type="number"
                                    />
                                    <h4 className="mb-2">EXPIRATION PERIOD</h4>
                                    <div className="d-flex">
                                        <Form.Control
                                            required
                                            className={cx('text-large', 'mb-4', 'me-2')}
                                            value={start}
                                            onChange={(e) => setStart(e.target.value)}
                                            type="date"
                                        />
                                        <Form.Control
                                            required
                                            className={cx('text-large', 'mb-4')}
                                            value={end}
                                            onChange={(e) => setEnd(e.target.value)}
                                            type="date"
                                        />
                                    </div>

                                    <input
                                        className={cx('col-12', 'btn', 'btn-dark', 'p-3')}
                                        type="submit"
                                        value="ADD NEW"
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

export default Discount;
