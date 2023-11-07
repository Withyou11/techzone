import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from '~/components/GlobalStyles';
import { CartProvider } from './Context/CartContext/CartContext';
import { HistoryProvider } from './Context/HistoryContext/HistoryContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GlobalStyles>
        <HistoryProvider>
            <CartProvider>
                <App />
            </CartProvider>
        </HistoryProvider>
    </GlobalStyles>,
);
