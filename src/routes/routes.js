import config from '~/config';

// Layouts
import { AdminLayout, DefaultLayout } from '~/layouts';

// Pages
import Home from '~/pages/Customer/Home/Home';
import Dashboard from '~/pages/Admin/Dashboard/Dashboard';
import AdminProducts from '~/pages/Admin/Product/Product';
import AdminCustomers from '~/pages/Admin/Customer/Customer';
import ProductPage from '~/pages/Customer/ProductPage/ProductPage';
import ProductDetail from '~/pages/Customer/ProductDetail/ProductDetail';
import CreateProduct from '~/pages/Admin/Product/CreateProduct';
import AdminCustomerDetail from '~/pages/Admin/Customer/CustomerDetail';
import AdminOrders from '~/pages/Admin/Order/Order';
import AdminCategories from '~/pages/Admin/Category/Category';
// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.adminDashboard, component: Dashboard, layout: AdminLayout },
    { path: config.routes.adminProducts, component: AdminProducts, layout: AdminLayout },
    { path: config.routes.adminCustomers, component: AdminCustomers, layout: AdminLayout },
    { path: config.routes.adminCustomerDtl, component: AdminCustomerDetail, layout: AdminLayout },
    { path: config.routes.adminOrders, component: AdminOrders, layout: AdminLayout },
    { path: config.routes.adminCategory, component: AdminCategories, layout: AdminLayout },
    { path: config.routes.createProduct, component: CreateProduct, layout: AdminLayout },
    { path: config.routes.product_categoty, component: ProductPage },
    { path: config.routes.products, component: ProductPage, layout: DefaultLayout },
    { path: config.routes.product_detail, component: ProductDetail },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
