import classNames from 'classnames/bind';
import styles from './AboutUs.module.scss';
import FunctionTitle from '~/components/FunctionTitle/FunctionTitle';
import map from '~/assets/images/map.png';
function AboutUs() {
    const cx = classNames.bind(styles);
    return (
        <div>
            <FunctionTitle title="Home > About Us" />
            <div className={cx('wrapper')}>
                <p className={cx('title')}>Location</p>
                <hr />
                <div className={cx('mapContainer')}>
                    <img src={map} className={cx('map')} />
                </div>
                <p className={cx('title')}>Welcome to TechZone</p>
                <hr />
                <p className={cx('about')}>
                    At TechZone, we pride ourselves on being your go-to online destination for the latest and most
                    innovative technology products. Whether you're a tech enthusiast, a gadget lover, or someone in
                    search of smart solutions, we have a wide range of products to cater to your needs.
                </p>
                <p className={cx('about')}>
                    Explore our extensive collection of top-notch electronics, including smartphones, laptops, tablets,
                    smart home devices, wearables, gaming accessories, and much more. We carefully curate our selection
                    to offer you the best-in-class products from renowned brands, ensuring superior quality and
                    exceptional performance.
                </p>
                <p className={cx('about')}>
                    With TechZone, you can stay up-to-date with the latest technology trends and advancements. Our
                    dedicated team is passionate about tech and strives to bring you the most exciting and
                    groundbreaking products available in the market. From powerful processors and stunning displays to
                    innovative features and seamless connectivity, we've got you covered.
                </p>
                <p className={cx('about')}>
                    We also prioritize customer satisfaction, offering a seamless online shopping experience. Our
                    user-friendly website is designed to make your journey enjoyable and convenient, with easy
                    navigation, detailed product descriptions, and secure payment options. We value your trust and
                    strive to provide excellent customer service every step of the way.
                </p>
                <p className={cx('about')}>
                    Join the TechZone community and stay connected with our tech-savvy enthusiasts. Explore our tech
                    blog, where you can find the latest news, insightful reviews, helpful tips, and engaging discussions
                    about all things tech-related.
                </p>
                <p className={cx('about')}>
                    Experience the future with TechZone - your trusted destination for the latest and greatest
                    technology products. Start browsing our collection today and embark on a journey of innovation and
                    endless possibilities.
                </p>
            </div>
        </div>
    );
}

export default AboutUs;
