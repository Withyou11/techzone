import { useState, createContext, useEffect } from 'react';
import cartApi from '~/api/cartApi';
const CartContext = createContext();

function CartProvider({ children }) {
    const [cartItemsState, setCartItemsState] = useState({});
    useEffect(() => {
        if (localStorage.getItem('customerName')) {
            async function getCart() {
                try {
                    let cartData = await cartApi.viewCart();
                    console.log(cartData);
                    setCartItemsState(cartData.data.cart);
                } catch (ex) {
                    console.log(ex);
                }
            }
            getCart();
        }
    }, [localStorage.getItem('accessToken')]);
    const value = {
        cartItemsState,
        setCartItemsState,
    };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export { CartContext, CartProvider };
