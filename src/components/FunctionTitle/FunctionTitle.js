import classNames from 'classnames/bind';
import styles from './FunctionTitle.module.scss';

function FunctionTitle(data) {
    const cx = classNames.bind(styles);

    return (
        <div className={cx('wrapper')}>
            <p className={cx('title')}>{data.title}</p>
        </div>
    );
}

export default FunctionTitle;
