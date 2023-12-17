import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Warehouse.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import reviewApi from '~/api/reviewApi';
import warehouseApi from '~/api/warehouseApi';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import WarehouseItem from '~/components/Admin/WarehouseItem';

function Warehouse() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                let list = await warehouseApi.getAll();
                if (list.success) {
                    setData(list.data);
                }
            } catch (ex) {}
        }

        fetchData();
    }, []);

    const cx = classNames.bind(styles);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div className={cx('main-container')}>
            <div className={cx('header')}>
                <div>
                    <h6 className={cx('title')}>Warehouses</h6>
                </div>
                <div className={cx('header-right')}>
                    {/* <input type="text" className={cx('filter')} onChange={(e) => handleSearch(e)} /> */}

                    <Link to="/admin/warehouse/create" className={cx('btn-add-new')}>
                        <FontAwesomeIcon icon={faAdd} className={cx('icon')} />
                        <h5 className={cx('filter-text')}>Add new</h5>
                    </Link>
                </div>
            </div>
            <div className={'row'}>
                {data.map((value, index) => (
                    <WarehouseItem
                        image={value.image}
                        name={value.warehouse_name}
                        location={value.location}
                        id={value.warehouse_id}
                    />
                ))}
            </div>
        </div>
    );
}

export default Warehouse;
