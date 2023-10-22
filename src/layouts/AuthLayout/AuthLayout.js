import classNames from 'classnames/bind';
import styles from './AuthLayout.module.scss';

const cx = classNames.bind(styles);

function AuthLayout({ children }) {
    return (
        <div style={{ overflow: 'hidden', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div className={cx('wrapper')}>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default AuthLayout;
