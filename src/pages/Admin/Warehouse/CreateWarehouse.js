import styles from './CreateWarehouse.module.scss';
import classNames from 'classnames/bind';
import { Card, Dropdown, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import categoryApi from '~/api/categoryApi';
import productApi from '~/api/productApi';
import { NotificationManager } from 'react-notifications';

function CreateWarehouse() {
    const cx = classNames.bind(styles);

    const [selectedFile, setSelectedFile] = useState(null);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [categoriesL, setCategoriesL] = useState([]);
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState(0);
    const [amount, setAmount] = useState(0);
    const [previewImage, setPreviewImage] = useState(null);

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

    useEffect(() => {
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

        try {
            productApi.create({
                name: name,
                category_id: category,
                description: desc,
                price: price,
                amount: amount,
                image: selectedFile,
            });
        } catch (error) {
            console.error('Error create product:', error);
            NotificationManager.error('Error create product');
        }
    };

    return (
        <div className={cx('main-container')}>
            <div className={cx('header')}>
                <div>
                    <h6 className={cx('title')}>Create Warehouse</h6>
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('form')}>
                    <div className={cx('d-lg-flex', 'justify-content-between', 'flex-row')}>
                        <div className={cx('me-lg-4', 'col-lg-8')}>
                            <Card className={cx('col-12', 'mb-5')}>
                                <Card.Header className={cx('card-header-style')}>
                                    <h3 className={cx('h2', 'fw-bold')}>Information </h3>
                                </Card.Header>
                                <Card.Body className={cx('a')}>
                                    <div className={cx('form-group', 'mb-3', 'col-12')}>
                                        <label className={cx('form-control-label', 'h4')}>WAREHOUSE CODE</label>
                                        <div className={cx('me-2')}>
                                            <Form.Control className={cx('text-large')} type="text" />
                                        </div>
                                    </div>

                                    <div className={cx('form-group', 'mb-3', 'col-12')}>
                                        <label className={cx('form-control-label', 'h4')}>DESCRIPTION</label>
                                        <div className={cx('me-2')}>
                                            <Form.Control className={cx('text-large')} type="text" />
                                        </div>
                                    </div>
                                    <div className={cx('form-group', 'mb-3')}>
                                        <label className={cx('form-control-label', 'h4')}>LOCATION</label>
                                        <div className={'me-2'}>
                                            <div className={cx('mb-3', 'col-12')}>
                                                <label className={cx('form-control-label', 'h5')}>Country</label>
                                                <div className={cx('me-2')}>
                                                    <Form.Control className={cx('text-large')} type="text" />
                                                </div>
                                            </div>
                                            <div className={cx('mb-3', 'col-12')}>
                                                <label className={cx('form-control-label', 'h5')}>
                                                    City/Provinces/State
                                                </label>
                                                <div className={cx('me-2')}>
                                                    <Form.Control className={cx('text-large')} type="text" />
                                                </div>
                                            </div>
                                            <div className={cx('mb-3', 'col-12')}>
                                                <label className={cx('form-control-label', 'h5')}>
                                                    County/District
                                                </label>
                                                <div className={cx('me-2')}>
                                                    <Form.Control className={cx('text-large')} type="text" />
                                                </div>
                                            </div>
                                            <div className={cx('mb-3', 'col-12')}>
                                                <label className={cx('form-control-label', 'h5')}>Local Address</label>
                                                <div className={cx('me-2')}>
                                                    <Form.Control className={cx('text-large')} type="text" />
                                                </div>
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
                                            <img src={previewImage} id="img" alt="user" className={cx('w-100')} />
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
                                onClick={handleSubmit}
                                value="Create warehouse"
                                class={cx(
                                    'btn',
                                    'btn-dark',
                                    'opacity-75',
                                    'text-white',
                                    'text-center',
                                    'border-0',
                                    'me-2',
                                    'btn-custom',
                                )}
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
    );
}

export default CreateWarehouse;
