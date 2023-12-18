import FunctionTitle from '~/components/FunctionTitle/FunctionTitle';
import styles from './History.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import PurchaseHistoryItem from '~/components/PurchaseHistoryItem/PurchaseHistoryItem';
import orderApi from '~/api/orderApi';

function History() {
    const [histories, setHistories] = useState([]);
    useEffect(() => {
        if (localStorage.getItem('customerId')) {
            async function getOrder() {
                try {
                    let ordersData = await orderApi.getCustomerOrderHistory();
                    console.log(ordersData);
                    setHistories(ordersData.data);
                } catch (ex) {
                    console.log(ex);
                }
            }
            getOrder();
        }
        window.scrollTo(0, 0);
    }, [localStorage.getItem('customerId')]);
    // fetch(`http://localhost:3001/orders/${localStorage.getItem('customer_id')}`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // })
    //     .then((response) => response.json())
    //     .then((data) => {
    //         setHistories(data.listOrder);
    //     })
    //     .catch((error) => {
    //         // Handle any errors
    //         console.error(error);
    //     });

    const cx = classNames.bind(styles);
    const handleDelete = (order_id) => {
        const data = {
            order_id: order_id,
            status: 'Canceled',
        };
        fetch(`http://localhost:3001/orders/update_status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                window.location.reload();
            })
            .catch((error) => {
                // Handle any errors
                console.error(error);
            });
    };
    return (
        <div>
            <FunctionTitle title="Home > Purchase History" />
            <div className={cx('wrapper')}>
                {histories.reverse().map((item, index) => (
                    <div key={index}>
                        <PurchaseHistoryItem data={item} onDelete={handleDelete} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default History;
