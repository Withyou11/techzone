import styles from './DetailProduct.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faFilter } from '@fortawesome/free-solid-svg-icons';
import products from '~/Statics/products';
import { Card, Dropdown, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosClient from '~/api/axiosClient';
import categoryApi from '~/api/categoryApi';

function DetailProduct() {
    const cx = classNames.bind(styles);
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [categoriesL, setCategoriesL] = useState([]);
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState(0);
    const [amount, setAmount] = useState(0);
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        axiosClient.get('http://localhost:8000/api/products/' + id).then((res) => {
            if (res.status === 200) {
                let resData = res.data;
                if (resData.success) {
                    let product = resData.data;
                    setItem(product);
                    setName(product.name);
                    setCategory(product.category_id);
                    setDesc(product.description);
                    setPrice(product.price);
                    setAmount(product.amount);
                }
            }
        });

        async function fetchData() {
            let list = await categoryApi.getAll();
            if (list.success) {
                setCategoriesL(list.data);
            }
        }

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.put(
            'http://localhost:8000/products/' + id,
            JSON.stringify(
                {
                    name: name,
                    price: price,
                    description: desc,
                    amount: amount,
                },
                {
                    headers: {},
                },
            ),
        );
        try {
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleLoadImage = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedFile(file);
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return item != null ? (
        <div className={cx('main-container')}>
            <div className={cx('header')}>
                <div>
                    <h6 className={cx('title')}>Edit Product</h6>
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('form')}>
                    <div className={cx('d-lg-flex', 'justify-content-between', 'flex-row')}>
                        <div className={cx('me-lg-4', 'col-lg-8')}>
                            <Card className={cx('col-12', 'mb-5')}>
                                <Card.Header className={cx('card-header-style')}>
                                    <h3 className={cx('h2', 'fw-bold')}>Overview information </h3>
                                </Card.Header>
                                <Card.Body className={cx('a')}>
                                    <div className={cx('form-group', 'mb-3', 'col-12')}>
                                        <label className={cx('form-control-label', 'h4')}>Name</label>
                                        <div className={cx('me-2')}>
                                            <Form.Control
                                                className={cx('text-large')}
                                                value={name}
                                                type="text"
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className={cx('form-group', 'mb-3', 'col-12')}>
                                        <label className={cx('form-control-label', 'h4')}>Category</label>
                                        <div className={cx('me-2')}>
                                            <Form.Select
                                                className={cx('text-large')}
                                                aria-label="Default select example"
                                                value={category}
                                            >
                                                <option>Open this select category</option>
                                                {categoriesL.map((item) => (
                                                    <option value={item.category_id}>{item.name}</option>
                                                ))}
                                            </Form.Select>
                                        </div>
                                    </div>
                                    <div className={cx('form-group', 'mb-3')}>
                                        <label className={cx('form-control-label', 'h4')}>
                                            The description of product
                                        </label>
                                        <div className={'me-2'}>
                                            <Form.Control
                                                className={cx('text-large')}
                                                as="textarea"
                                                value={desc}
                                                rows={6}
                                                type="text"
                                                onChange={(e) => setDesc(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className={cx('form-group', 'mb-3', 'd-md-flex')}>
                                        <div className={cx('mb-3', 'col-md-6 ', 'col-12')}>
                                            <label className={cx('form-control-label', 'h4')}>Amount</label>
                                            <div className={'me-2'}>
                                                <Form.Control
                                                    className={cx('text-large')}
                                                    type="number"
                                                    value={amount}
                                                    onChange={(e) => setAmount(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className={cx('mb-3', 'col-md-6', 'col-12')}>
                                            <label className={cx('form-control-label', 'h4')}>Price</label>
                                            <div className={'me-2'}>
                                                <Form.Control
                                                    className={cx('text-large')}
                                                    type="number"
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className={cx('col-lg-4')}>
                            <Card className={cx('text-center')}>
                                <Card.Header className={cx('card-header-style')}>
                                    <h3 className={cx('h2', 'fw-bold')}>Image</h3>
                                </Card.Header>
                                <Card.Body className={cx('p-4', 'mb-3')}>
                                    <div>
                                        <label for="files" className={cx('btn', 'btn-dark', 'btn-custom')}>
                                            Select Image
                                        </label>
                                        <input
                                            class="d-none"
                                            type="file"
                                            accept=".jpg, .png, .jpeg"
                                            multiple
                                            title="search image"
                                            id="files"
                                            name="files"
                                            onChange={handleLoadImage}
                                        />
                                    </div>
                                    <div>
                                        {selectedFile !== null && (
                                            <img
                                                src={previewImage}
                                                id="img"
                                                alt="user"
                                                className={cx('w-100', 'mt-4')}
                                            />
                                        )}
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>

                    <div class={cx('mt-5', 'd-flex')}>
                        <div class={cx('col-md-offset-2', 'mb-3')}>
                            <input
                                type="submit"
                                value="Save"
                                class={cx(
                                    'btn',
                                    'btn-warning',
                                    'text-white',
                                    'text-center',
                                    'border-0',
                                    'me-2',
                                    'btn-custom',
                                )}
                                onClick={handleSubmit}
                            />
                        </div>
                        <div>
                            <a
                                href="/admin/products"
                                class={cx(
                                    'btn',
                                    'btn-secondary',
                                    'opacity-75',
                                    'text-white',
                                    'text-center',
                                    'border-0',
                                    'btn-custom',
                                )}
                            >
                                Back to List
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        ''
    );
}

export default DetailProduct;
