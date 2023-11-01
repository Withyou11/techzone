import classNames from 'classnames/bind';
import styles from './CategoryItem.module.scss';

function CategoryItem(data) {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <img className={cx('image')} src={data.data.image} alt="avatar" />
            <p className={cx('name')}>{data.data.name}</p>
        </div>
    );
}

export default CategoryItem;
