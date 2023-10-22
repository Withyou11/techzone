import classNames from 'classnames/bind';
import styles from './Home.module.scss';

function Home() {
    const cx = classNames.bind(styles);

    return (
        <div className={cx('wrapper')}>
            <p className={cx('title')}>Customer Homepage</p>
        </div>
    );
}

export default Home;
