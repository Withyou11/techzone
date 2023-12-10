import config from '~/config';

// Layouts
import { AdminLayout, DefaultLayout, AuthLayout } from '~/layouts';

// Pages
import Home from '~/pages/Customer/Home/Home';
import Dashboard from '~/pages/Admin/Dashboard/Dashboard';
import AdminProducts from '~/pages/Admin/Product/Product';
import AdminCustomers from '~/pages/Admin/Customer/Customer';
import ProductPage from '~/pages/Customer/ProductPage/ProductPage';
import ProductDetail from '~/pages/Customer/ProductDetail/ProductDetail';
import CreateProduct from '~/pages/Admin/Product/CreateProduct';
import DetailProduct from '~/pages/Admin/Product/DetailProduct';
import AdminCustomerDetail from '~/pages/Admin/Customer/CustomerDetail';
import AdminOrders from '~/pages/Admin/Order/Order';
import AdminCategories from '~/pages/Admin/Category/Category';
import AdminInquiry from '~/pages/Admin/Inquiry/Inquiry';
import AdminOrderDtl from '~/pages/Admin/Order/OrderDetail';
import CartPage from '~/pages/Customer/CartPage/CartPage';
import History from '~/pages/Customer/History/History';
import Login from '~/pages/Customer/Login/Login';
import Register from '~/pages/Customer/Register/Register';
import ShippingPage from '~/pages/Customer/ShippingPage/ShippingPage';
import Profile from '~/pages/Customer/Profile/Profile';
import AboutUs from '~/pages/Customer/AboutUs/AboutUs';
// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.adminDashboard, component: Dashboard, layout: AdminLayout },
    { path: config.routes.adminProducts, component: AdminProducts, layout: AdminLayout },
    { path: config.routes.adminCustomers, component: AdminCustomers, layout: AdminLayout },
    { path: config.routes.adminCustomerDtl, component: AdminCustomerDetail, layout: AdminLayout },
    { path: config.routes.adminOrders, component: AdminOrders, layout: AdminLayout },
    { path: config.routes.adminCategory, component: AdminCategories, layout: AdminLayout },
    { path: config.routes.adminInquiry, component: AdminInquiry, layout: AdminLayout },
    { path: config.routes.adminOrderDtl, component: AdminOrderDtl, layout: AdminLayout },

    { path: config.routes.createProduct, component: CreateProduct, layout: AdminLayout },
    { path: config.routes.detailProduct, component: DetailProduct, layout: AdminLayout },
    { path: config.routes.product_categoty, component: ProductPage },
    { path: config.routes.products, component: ProductPage, layout: DefaultLayout },
    { path: config.routes.product_detail, component: ProductDetail },
    { path: config.routes.cart, component: CartPage },
    { path: config.routes.history, component: History, layout: DefaultLayout },
    { path: config.routes.login, component: Login, layout: AuthLayout },
    { path: config.routes.register, component: Register, layout: AuthLayout },
    { path: config.routes.shipping, component: ShippingPage },
    { path: config.routes.profile, component: Profile, layout: DefaultLayout },
    { path: config.routes.about, component: AboutUs },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
