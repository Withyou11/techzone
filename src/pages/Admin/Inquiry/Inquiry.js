import styles from './Inquiry.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faFilter } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import inquiryApi from '~/api/inquiryApi';

function Inquiry() {
    const cx = classNames.bind(styles);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    useEffect(() => {
        async function fetchData() {
            try {
                let list = await inquiryApi.getPage(page);
                if (list.success) {
                    setData(list.data);
                }
            } catch (ex) {}
        }
        fetchData();
    }, []);

    return (
        <div className={cx('main-container')}>
            <div className={cx('header')}>
                <div>
                    <h6 className={cx('title')}>Inquiries</h6>
                </div>
            </div>
            <div className={cx('content')}>
                <table>
                    <thead>
                        <th style={{ width: '15%' }}>Date</th>
                        <th style={{ width: '20%' }}>Customer</th>
                        <th style={{ width: '20%' }}>Employee</th>
                        <th style={{ width: '40%' }}>Content</th>
                        <th style={{ width: '10%' }}>Star</th>
                    </thead>
                    <tbody>
                        {data.map((value, index) => {
                            return (
                                <tr>
                                    <td>{value.date}</td>
                                    <td>{value.customer.name}</td>
                                    <td>
                                        {value.employee.name} #{value.employee.employee_id}
                                    </td>
                                    <td>{value.content}</td>
                                    <td>{value.star}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Inquiry;
