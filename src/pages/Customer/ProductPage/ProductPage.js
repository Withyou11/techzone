import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ProductPage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import LongSidebar from '~/layouts/components/LongSidebar/LongSidebar';
import FunctionTitle from '~/components/FunctionTitle/FunctionTitle';
import SearchBar from '~/layouts/components/SearchBar/SearchBar';
import products from '~/Statics/products';
import ProductItem from '~/components/ProductItem/ProductItem';
function ProductPage() {
    const { categoryName } = useParams();
    const cx = classNames.bind(styles);
    const [listProducts, setListProducts] = useState(products);
    // const [listProducts, setListProducts] = useState([]);
    useEffect(() => {
        window.scrollTo(0, 0);
        fetch('http://localhost:3001/products', {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setListProducts(data.listProduct);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    const handleSearch = (searchTerm) => {
        fetch(`http://localhost:3001/products/search?q=${searchTerm}`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setListProducts(data.listProduct);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    return (
        <div className={cx('wrapper')}>
            <FunctionTitle title="Home > Products" />
            <div className={cx('container')}>
                <LongSidebar data={categoryName} />
                <div className={cx('mainContain')}>
                    <SearchBar onSearch={handleSearch} />
                    {listProducts?.length > 0 && (
                        <div className={cx('bestSellerAllProducts')}>
                            {listProducts.map((item, index) => (
                                <div key={index}>
                                    <ProductItem data={item} />
                                </div>
                            ))}
                        </div>
                    )}
                    {listProducts?.length === 0 && (
                        <div className={cx('bestSellerAllProducts')}>
                            <p style={{ fontStyle: 'italic' }}>Product(s) not found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductPage;
