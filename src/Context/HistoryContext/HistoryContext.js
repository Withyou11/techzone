import { useState, createContext } from 'react';
const HistoryContext = createContext();

function HistoryProvider({ children }) {
    let orderHistory = [
        {
            orderId: 'ABC123',
            status: 'Shipping',
            date: '2023-06-10',
            products: [
                {
                    id: 1,
                    productId: 23,
                    name: 'Lenovo Yoga 9i 14',
                    image: 'https://www.notebookcheck.net/fileadmin/_processed_/3/6/csm_Lenovo_Yoga_9i_Gen_7_Front_Facing_Windows_11_d915a18c77.png',
                    price: 339,
                    amount: 1,
                },
                {
                    id: 2,
                    productId: 28,
                    name: 'ASUS ROG Gladius III Wireless AimPoint',
                    image: 'https://dlcdnwebimgs.asus.com/gain/751E7672-D4BE-41E7-AAC1-C0E8B3A10DF5/w1000/h732',
                    price: 155,
                    amount: 1,
                },
                {
                    id: 3,
                    productId: 29,
                    name: 'SAMSUNG Galaxy S23 Ultra',
                    image: 'https://smartviets.com/upload/S23%20Series/s23-ultra-kem-600x600.png',
                    price: 1199,
                    amount: 1,
                },
            ],
            total: 1693,
        },
        {
            orderId: 'DEF456',
            status: 'Complete',
            date: '2023-06-08',
            products: [
                {
                    id: 4,
                    productId: 20,
                    name: 'Audeze Euclid in-Ear Audiophile',
                    image: 'https://i.shgcdn.com/14170c55-9273-42f6-bee5-a3ad6cdc0697/-/format/auto/-/preview/3000x3000/-/quality/lighter/',
                    price: 87,
                    amount: 1,
                },
                {
                    id: 5,
                    productId: 19,
                    name: 'KOORUI 27 Inch Computer Monitor',
                    image: 'https://lzd-img-global.slatic.net/g/p/1e1da3ce66a9b921ded65dea70c62dbd.png_720x720q80.png',
                    price: 122,
                    amount: 1,
                },
            ],
            total: 209,
        },
    ];
    const [historyItemsState, setHistoryItemsState] = useState(orderHistory);
    const value = {
        historyItemsState,
        setHistoryItemsState,
    };
    return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>;
}

export { HistoryContext, HistoryProvider };
