import {
    faDashboard,
    faDollar,
    faInbox,
    faLaptop,
    faPhone,
    faTicket,
    faWarehouse,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './MenuNavigation.modules.scss';
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { useNavigate } from 'react-router-dom';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBuysellads, faProductHunt, faSellcast } from '@fortawesome/free-brands-svg-icons';

function MenuNavigation() {
    const navigate = useNavigate();

    return (
        <>
            <Navigation
                // you can use your own router's api to get pathname
                activeItemId="/management/members"
                onSelect={({ itemId }) => {
                    if (!itemId.includes('#')) navigate(itemId);
                }}
                items={[
                    {
                        title: 'Dashboard',
                        itemId: '/admin/dashboard',
                        // you can use your own custom Icon component as well
                        // icon is optional
                        elemBefore: () => <FontAwesomeIcon icon={faInbox} className={'icon'} />,
                    },
                    {
                        title: 'Customer',
                        itemId: 'customer#',
                        elemBefore: () => <FontAwesomeIcon icon={faUser} className={'icon'} />,
                        subNav: [
                            {
                                title: 'Customer Information',
                                itemId: '/admin/customers',
                            },
                            {
                                title: 'Customer Inquiry',
                                itemId: '/admin/inquiries',
                            },
                            {
                                title: 'Customer Review',
                                itemId: '/admin/reviews',
                            },
                        ],
                    },
                    {
                        title: 'Product',
                        itemId: 'product#',
                        elemBefore: () => <FontAwesomeIcon icon={faLaptop} className={'icon'} />,
                        subNav: [
                            {
                                title: 'Products List',
                                itemId: '/admin/products',
                            },
                            {
                                title: 'Categories List',
                                itemId: '/admin/categories',
                            },
                        ],
                    },
                    {
                        title: 'Order',
                        itemId: 'order#',
                        elemBefore: () => <FontAwesomeIcon icon={faDollar} className={'icon'} />,
                        subNav: [
                            {
                                title: 'Order List',
                                itemId: '/admin/orders',
                            },
                            {
                                title: 'Track Order',
                                itemId: '/admin/order-tracker',
                            },
                        ],
                    },
                    {
                        title: 'Warehouse',
                        itemId: '#warehouse',
                        elemBefore: () => <FontAwesomeIcon icon={faWarehouse} className={'icon'} />,
                        subNav: [
                            {
                                title: 'Warehouse List',
                                itemId: '/admin/warehouse',
                            },
                            {
                                title: 'Receipt',
                                itemId: '/admin/receipt',
                            },
                        ],
                    },
                    {
                        title: 'Discount',
                        itemId: '/admin/discounts',
                        elemBefore: () => <FontAwesomeIcon icon={faTicket} className={'icon'} />,
                    },
                ]}
            />
        </>
    );
}
export default MenuNavigation;
