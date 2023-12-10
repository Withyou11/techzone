import styles from './Category.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { Table } from 'ka-table';
import { DataType, EditingMode, SortingMode } from 'ka-table/enums';
import Categories from '~/Statics/categories';
import { Button, Card, Form, FormControl } from 'react-bootstrap';
import Select from 'react-select';
import { icons } from '~/Statics/icons';
import { icon } from '@fortawesome/fontawesome-svg-core';

function Customer() {
    const cx = classNames.bind(styles);

    const dataArray = Categories;

    return (
        <div className={cx('main-container')}>
            <div className={cx('header')}>
                <div>
                    <h6 className={cx('title')}>Categories</h6>
                </div>
            </div>
            <div className={cx('content', 'd-lg-flex', 'justify-content-between')}>
                <table className={cx('col-12 col-lg-8 me-lg-5')}>
                    <thead>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Icon</th>
                    </thead>
                    <tbody>
                        {dataArray.map((value, index) => {
                            return (
                                <tr>
                                    <td>{value.name}</td>
                                    <td className={cx('product')}>
                                        <img className={cx('product-img')} src={value.image} alt="img-product" />
                                    </td>
                                    <td>
                                        <FontAwesomeIcon icon={Icons[value.iconName]} />
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
                            <form onSubmit={(e) => e.preventDefault()}>
                                <h4 className="mb-2">Name</h4>
                                <Form.Control required className={cx('text-large', 'mb-4')} />
                                <h4 className="mb-2">Image</h4>
                                <Form.Control required className={cx('text-large', 'mb-4')} />
                                <h4 className="mb-2">Icon</h4>
                                <div className={cx('d-sm-flex')}>
                                    <Select required className={cx('col-12', 'col-sm-8', 'mb-4')} options={icons} />
                                    <input
                                        className={cx('col-12', 'col-sm-4', 'mb-4', 'btn', 'btn-dark')}
                                        type="submit"
                                        value="ADD NEW"
                                    />
                                </div>
                            </form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Customer;
