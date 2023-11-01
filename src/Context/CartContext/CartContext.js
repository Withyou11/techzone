import { useState, createContext, useEffect } from 'react';
const CartContext = createContext();

function CartProvider({ children }) {
    const [cartItemsState, setCartItemsState] = useState({});
    useEffect(() => {
        if (localStorage.getItem('customer_id')) {
            fetch(`http://localhost:3001/carts/${localStorage.getItem('customer_id')}`, {
                method: 'GET',
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setCartItemsState(data.cart);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);
    const value = {
        cartItemsState,
        setCartItemsState,
    };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export { CartContext, CartProvider };
