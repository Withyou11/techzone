import styles from './Category.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { Table } from 'ka-table';
import { DataType, EditingMode, SortingMode } from 'ka-table/enums';
import { Button, Card, Form, FormControl } from 'react-bootstrap';
import Select from 'react-select';
import { icons } from '~/Statics/icons';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { useEffect, useState } from 'react';
import categoryApi from '~/api/categoryApi';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ConfirmDialog from '~/components/Dialog/ConfirmDialog';

function Customer() {
    const cx = classNames.bind(styles);
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [page, setPage] = useState(1);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    async function fetchData() {
        try {
            let list = await categoryApi.getAll();
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
    const onDelete = async (id) => {
        setIsOpenDialog(false);

        try {
            let result = await categoryApi.delete(id);
            if (result.success) {
                NotificationManager.success('Delete the category successfully', 'Success');
                fetchData();
                setName('');
            } else {
                NotificationManager.error('Delete the category failed', 'Error');
            }
        } catch (ex) {
            NotificationManager.error('Delete the category failed', 'Error');
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
            let result = await categoryApi.create({
                name: name,
            });
            if (result.success) {
                NotificationManager.success('Create the category successfully', 'Success');
                fetchData();
                setName('');
            } else {
                NotificationManager.error('Create the category failed', 'Error');
            }
        } catch (ex) {
            NotificationManager.error('Create the category failed', 'Error');
            console.log(ex);
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
                    <h6 className={cx('title')}>Categories</h6>
                </div>
            </div>
            <div className={cx('content', 'd-lg-flex', 'justify-content-between')}>
                <table className={cx('col-12 col-lg-8 me-lg-5')}>
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th></th>
                    </thead>
                    <tbody>
                        {data.map((value, index) => {
                            return (
                                <tr>
                                    <td>{value.category_id}</td>
                                    <td>{value.name}</td>
                                    <td>
                                        <button
                                            className={cx('btn', 'btn-danger', 'p-2')}
                                            value={value.category_id}
                                            onClick={(e) => handleDelete(value.category_id)}
                                        >
                                            <FontAwesomeIcon fontSize={20} icon={Icons.faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className={cx('col-12 col-lg-4 mt-5 mt-lg-0')}>
                    <Card>
                        <Card.Header className={cx('card-header-style')}>ADD NEW CATEGORY</Card.Header>
                        <Card.Body className={cx('p-5')}>
                            <form onSubmit={handleSubmit}>
                                <h4 className="mb-2">Name</h4>
                                <Form.Control
                                    required
                                    className={cx('text-large', 'mb-4')}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {/* <h4 className="mb-2">Icon</h4>
                                <div className={cx('d-sm-flex')}>
                                    <Select required className={cx('col-12', 'col-sm-8', 'mb-4')} options={icons} />
                                    
                                </div> */}
                                <input
                                    className={cx('col-12', 'btn', 'btn-dark', 'p-3')}
                                    type="submit"
                                    value="ADD NEW"
                                />
                            </form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Customer;
