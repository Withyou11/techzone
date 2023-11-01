import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import CustomerHeader from '~/layouts/components/CustomerHeader/CustomerHeader';
import Footer from '../Footer/Footer';
const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div>
            <CustomerHeader />
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default DefaultLayout;
