import styles from './Dashboard.module.scss';
import classNames from 'classnames/bind';

function Dashboard() {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <p className={cx('title')}>Dashboard</p>
        </div>
    );
}

export default Dashboard;
