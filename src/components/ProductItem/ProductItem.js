import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
function ProductItem(data) {
    // console.log(data);
    const cx = classNames.bind(styles);
    const renderStars = () => {
        const roundedRating = Math.round(data.data.rating_average); // Làm tròn số sao

        const stars = [];
        for (let i = 0; i < 5; i++) {
            const starClassName = cx('star', { filled: i < roundedRating });
            stars.push(
                <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className={starClassName}
                    style={{ color: i < roundedRating ? '#fdbf00' : '#ccc' }}
                />,
            );
        }
        return stars;
    };

    return (
        <Link to={`/detail/${data.data.product_id}`} className={cx('wrapper')}>
            <div className={cx('imageContainer')}>
                <img className={cx('image')} src={data.data.image} alt="product" />
            </div>
            <div className={cx('infoContainer')}>
                <p className={cx('category')}>{data.data.category.name}</p>
                <p className={cx('name')}>{data.data.name}</p>
                <p className={cx('price')}>${data.data.price}</p>
                <div className={cx('starRating')}>{renderStars()}</div>
            </div>
        </Link>
    );
}

export default ProductItem;
