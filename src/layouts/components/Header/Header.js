import classNames from 'classnames/bind';
import styles from './Header.module.scss';

function Header() {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('content')}>
            <p>header</p>
        </div>
    );
}

export default Header;
