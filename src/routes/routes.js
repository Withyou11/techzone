import config from '~/config';

// Layouts
import { AdminLayout, DefaultLayout } from '~/layouts';

// Pages
import Home from '~/pages/Customer/Home/Home';
import Dashboard from '~/pages/Admin/Dashboard/Dashboard';
import ProductPage from '~/pages/Customer/ProductPage/ProductPage';
import ProductDetail from '~/pages/Customer/ProductDetail/ProductDetail';
import CartPage from '~/pages/Customer/CartPage/CartPage';
import History from '~/pages/Customer/History/History';
// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.dashboard, component: Dashboard, layout: AdminLayout },
    { path: config.routes.product_categoty, component: ProductPage },
    { path: config.routes.products, component: ProductPage, layout: DefaultLayout },
    { path: config.routes.product_detail, component: ProductDetail },
    { path: config.routes.cart, component: CartPage },
    { path: config.routes.history, component: History, layout: DefaultLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
