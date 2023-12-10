import { faDashboard, faDollar, faInbox, faLaptop, faPhone } from '@fortawesome/free-solid-svg-icons';
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
                                itemId: '/admin/review',
                            },
                        ],
                    },
                    {
                        title: 'Product',
                        itemId: '/admin/products',
                        elemBefore: () => <FontAwesomeIcon icon={faLaptop} className={'icon'} />,
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
                                itemId: '/admin/trackorder',
                            },
                        ],
                    },
                ]}
            />
        </>
    );
}
export default MenuNavigation;
