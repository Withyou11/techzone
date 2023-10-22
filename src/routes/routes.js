import config from '~/config';

// Layouts
import { AdminLayout, DefaultLayout } from '~/layouts';

// Pages
import Home from '~/pages/Customer/Home/Home';
import Dashboard from '~/pages/Admin/Dashboard/Dashboard';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.dashboard, component: Dashboard, layout: AdminLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
