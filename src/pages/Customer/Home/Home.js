import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Carousel } from 'react-bootstrap';
import ShortSidebar from '~/layouts/components/ShortSidebar/ShortSidebar';
import SearchBar from '~/layouts/components/SearchBar/SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import categories from '~/Statics/categories';
import products from '~/Statics/products';
import FeatureProductItem from '~/components/FeatureProductItem/FeatureProductItem';
import CategoryItem from '~/components/CategoryItem/CategoryItem';
import ProductItem from '~/components/ProductItem/ProductItem';
import TopRateTabs from '~/components/TopRateTabs/TopRateTabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import {
    faAngleLeft,
    faAngleRight,
    faArrowRotateLeft,
    faHandshake,
    faHeadset,
    faTruckFast,
} from '@fortawesome/free-solid-svg-icons';
function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const cx = classNames.bind(styles);
    const handleSearch = (searchTerm) => {
        navigate('/products');
        // Perform search logic using the searchTerm
        console.log('Searching for:', searchTerm);
    };
    const featureProductItems = [
        { id: 1, image: 'https://vnreview.vn/image/21/74/32/2174324.jpg', name: 'Iphone 14 Promax', price: '1,299$' },
        {
            id: 2,
            image: 'https://m.media-amazon.com/images/S/aplus-media/sc/044dfdc6-f09f-4587-a5ab-4af2fafd12b8.__CR0,0,970,600_PT0_SX970_V1___.jpg',
            name: '',
            price: '78$',
        },
        {
            id: 3,
            image: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/e1fd8b140514745.62431b9026f0e.jpg',
            name: 'Macbook Air M1',
            price: '2300$',
        },
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 < 0 ? categories.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1 >= categories.length ? 0 : prevIndex + 1));
    };

    const isAtFirst = currentIndex === 0;
    const isAtLast = currentIndex === categories.length - 6;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('aboveWrapper')}>
                <ShortSidebar />
                <div className={cx('aboveRightWrapper')}>
                    <SearchBar onSearch={handleSearch} />
                    <div className={cx('advWrapper')}>
                        <div className={cx('featureProductContainer')}>
                            <Carousel slide>
                                {featureProductItems.map((item) => (
                                    <Carousel.Item key={item.id}>
                                        <FeatureProductItem data={item} />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>
                        <div className={cx('newProductContainer')}>
                            <div className={cx('newProductItem1')}>
                                <p className={cx('newProductItem')}>Headphone</p>
                                <p className={cx('newProductPrice')}>Starting from $69</p>
                                <p className={cx('shopNow')}>SHOP NOW</p>
                            </div>
                            <div className={cx('newProductItem2')}>
                                <p className={cx('newProductItem')}>Gaming Laptop</p>
                                <p className={cx('newProductPrice')}>Starting from $638</p>
                                <p className={cx('shopNow')}>SHOP NOW</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('categoryListContainer')}>
                <button className={cx('prevButton')} onClick={handlePrev} disabled={isAtFirst}>
                    <FontAwesomeIcon icon={faAngleLeft} style={{ fontSize: '30px', color: 'black' }} />
                </button>
                {categories.slice(currentIndex, currentIndex + 6).map((category, index) => (
                    <div key={index}>
                        <CategoryItem key={index} data={category} />
                    </div>
                ))}
                <button className={cx('nextButton')} onClick={handleNext} disabled={isAtLast}>
                    <FontAwesomeIcon icon={faAngleRight} style={{ fontSize: '30px', color: 'black' }} />
                </button>
            </div>
            <div className={cx('bestSellerContainer')}>
                <h2 className={cx('bestSellerTitle')}>Our Best Seller</h2>
                <hr style={{ margin: '20px 0' }} />
                <div className={cx('bestSellerAllProducts')}>
                    {products.slice(18, 26).map((item) => (
                        <div key={item.id}>
                            <ProductItem data={item} />
                        </div>
                    ))}
                </div>
            </div>
            <div className={cx('weekendDiscountContainer')}>
                <div className={cx('weekendDiscountItem')}>
                    <div className={cx('weekendDiscountInfo')}>
                        <p className={cx('weekendDiscountTitle')}>WEEKEND DISCOUNT</p>
                        <p className={cx('weekendDiscountName')}>Wireless Speaker</p>
                        <p className={cx('weekendDiscountOff')}>Enjoy 25% Off Speakers</p>
                        <p className={cx('weekendDiscountShopNow')}>SHOP NOW</p>
                    </div>
                    <img
                        className={cx('imagweekendDiscountImg')}
                        src="https://products.mpowerpromo.com/SJ/SPK025A/138846_570/20191126195056-8893837bkzhcgl4.png"
                        alt="product"
                    />
                </div>
                <div className={cx('weekendDiscountItem')}>
                    <div className={cx('weekendDiscountInfo')}>
                        <p className={cx('weekendDiscountTitle')}>WEEKEND DISCOUNT</p>
                        <p className={cx('weekendDiscountName')}>New Smartphone</p>
                        <p className={cx('weekendDiscountOff')}>Available in 64GB and 256GB</p>
                        <p className={cx('weekendDiscountShopNow')}>SHOP NOW</p>
                    </div>
                    <img
                        className={cx('imagweekendDiscountImg')}
                        src="https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1641445030.61728714!500x500.png"
                        alt="product"
                    />
                </div>
            </div>
            <div className={cx('topRateWrapper')}>
                <TopRateTabs />
            </div>
            <div className={cx('benefitContainer')}>
                <div className={cx('benefitItem')}>
                    <FontAwesomeIcon className={cx('benefitIcon')} icon={faTruckFast}></FontAwesomeIcon>
                    <p className={cx('benefitTitle')}>Free Shipping Worldwide</p>
                    <p className={cx('benefitDetail')}>Tell about your all services</p>
                </div>
                <div className={cx('benefitItem')}>
                    <FontAwesomeIcon className={cx('benefitIcon')} icon={faArrowRotateLeft}></FontAwesomeIcon>
                    <p className={cx('benefitTitle')}>Money Back Guarantee</p>
                    <p className={cx('benefitDetail')}>Within 50 days for an exchange</p>
                </div>
                <div className={cx('benefitItem')}>
                    <FontAwesomeIcon className={cx('benefitIcon')} icon={faHeadset}></FontAwesomeIcon>
                    <p className={cx('benefitTitle')}>Online Support</p>
                    <p className={cx('benefitDetail')}>24 hours a day, 7 days a week</p>
                </div>
                <div className={cx('benefitItem')}>
                    <FontAwesomeIcon className={cx('benefitIcon')} icon={faHandshake}></FontAwesomeIcon>
                    <p className={cx('benefitTitle')}>Long Term Connection</p>
                    <p className={cx('benefitDetail')}>Tell about your all services</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
