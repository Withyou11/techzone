import config from '~/config';

// Layouts
import { AdminLayout, DefaultLayout, AuthLayout } from '~/layouts';

// Pages
import Home from '~/pages/Customer/Home/Home';
import Dashboard from '~/pages/Admin/Dashboard/Dashboard';
import ProductPage from '~/pages/Customer/ProductPage/ProductPage';
import ProductDetail from '~/pages/Customer/ProductDetail/ProductDetail';
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
    { path: config.routes.dashboard, component: Dashboard, layout: AdminLayout },
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
