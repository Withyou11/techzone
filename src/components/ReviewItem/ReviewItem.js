import classNames from 'classnames/bind';
import styles from './ReviewItem.module.scss';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function ReviewItem(data) {
    const cx = classNames.bind(styles);
    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            const starClassName = cx('star', { filled: i < data.data.rating });
            stars.push(
                <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className={starClassName}
                    style={{ color: i < data.data.rating ? '#fdbf00' : '#ccc' }}
                />,
            );
        }
        return stars;
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('infoContainer')}>
                <img className={cx('avatar')} src={data.data.avatar} alt="people" />
                <div className={cx('nameContainer')}>
                    <p className={cx('name')}>{data.data.name}</p>
                    <div className={cx('starRating')}>{renderStars()}</div>
                </div>
                <div className={cx('time')}>{data.data.datetime}</div>
            </div>
            <p className={cx('content')}>{data.data.content}</p>
        </div>
    );
}

export default ReviewItem;
