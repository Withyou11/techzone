import styles from './DetailProduct.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faFilter, faSubtract } from '@fortawesome/free-solid-svg-icons';
import products from '~/Statics/products';
import { Card, Dropdown, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosClient from '~/api/axiosClient';
import categoryApi from '~/api/categoryApi';
import productApi from '~/api/productApi';
import { NotificationManager } from 'react-notifications';
import ConfirmDialog from '~/components/Dialog/ConfirmDialog';
import CloudinaryUploadWidget from '~/components/CloudinaryUploadWidget/CloudinaryUploadWidget';

function DetailProduct() {
    const cx = classNames.bind(styles);
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [categoriesL, setCategoriesL] = useState([]);
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState(0);
    const [amount, setAmount] = useState(0);
    const [previewImage, setPreviewImage] = useState(null);
    const [specification, setSpecification] = useState([]);
    const [highlight, setHighlight] = useState([]);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);

    const [deleteId, setDeleteId] = useState(null);
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
                    setPreviewImage(product.image);
                    const detail_images = JSON.parse(product.detail_images);
                    setSelectedImages(detail_images);

                    const speciData = JSON.parse(product.specifications);
                    const speciObj = Object.entries(speciData).map(([key, value]) => ({
                        key,
                        value,
                    }));
                    setSpecification(speciObj);
                    const highlData = JSON.parse(product.highlight);
                    const highlObj = Object.entries(highlData).map(([key, value]) => ({
                        key,
                        value,
                    }));
                    setHighlight(highlObj);
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
    const onDelete = async (id) => {
        setIsOpenDialog(false);

        try {
            let result = await productApi.delete(id);
            if (result.success) {
                NotificationManager.success('Delete the product successfully', 'Success');
                navigate('/admin/products');
            } else {
                NotificationManager.error('Delete the product failed', 'Error');
            }
        } catch (ex) {
            NotificationManager.error('Delete the product failed', 'Error');
            console.log(ex);
        }
    };
    const handleDelete = async (id) => {
        setIsOpenDialog(true);
        setDeleteId(id);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const specificationObject = specification.reduce((result, item) => {
            let newObj = { [item.key]: item.value };
            result = { ...result, ...newObj };
            console.log(result);
            return result;
        }, {});
        const highlightObject = highlight.reduce((result, item) => {
            let newObj = { [item.key]: item.value };
            result = { ...result, ...newObj };
            console.log(result);
            return result;
        }, {});
        try {
            var form = new FormData();
            form.append('name', name);
            form.append('category_id', category);
            form.append('description', desc);
            form.append('price', price);
            form.append('amount', amount);
            form.append('image', selectedFile);
            form.append('rating_average', 0);
            form.append('specifications', JSON.stringify(specificationObject));
            form.append('highlight', JSON.stringify(highlightObject));
            form.append('updated_at', Date.now());

            var result = await productApi.update(id, form);

            if (result.success) {
                NotificationManager.success('Update product successfully');
                navigate('/admin/products');
            }
        } catch (error) {
            console.error('Error update product:', error);
            NotificationManager.error(error.message);
        }
    };
    const addSpefication = () => {
        setSpecification((prevTextboxes) => [...prevTextboxes, { key: '', value: '' }]);
    };
    const addHighlight = () => {
        setHighlight((prevTextboxes) => [...prevTextboxes, { key: '', value: '' }]);
    };
    const reduceSpecification = () => {
        const newArray = [...specification];
        newArray.pop();
        setSpecification(newArray);
    };
    const reduceHighlight = () => {
        const newArray = [...highlight];
        newArray.pop();
        setHighlight(newArray);
    };

    const handleSpeficationChange = (index, field, value) => {
        setSpecification((prevTextboxes) => {
            const newTextboxes = [...prevTextboxes];
            newTextboxes[index][field] = value;
            return newTextboxes;
        });
    };
    const handleHighlightChange = (index, field, value) => {
        setHighlight((prevTextboxes) => {
            const newTextboxes = [...prevTextboxes];
            newTextboxes[index][field] = value;
            return newTextboxes;
        });
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
            <ConfirmDialog
                isOpenDialog={isOpenDialog}
                setIsOpenDialog={setIsOpenDialog}
                question={'Do you want to delete it?'}
                action={onDelete}
                id={deleteId}
            />
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
                            <Card className={cx('col-12', 'mb-5')}>
                                <Card.Header className={cx('card-header-style')}>
                                    <h3 className={cx('h2', 'fw-bold')}>Technical Information </h3>
                                </Card.Header>
                                <Card.Body className={cx('a')}>
                                    <div className={cx('form-group', 'mb-3', 'col-12')}>
                                        <label className={cx('form-control-label', 'h4')}>Specifications</label>
                                        {specification.map((value, index) => {
                                            return (
                                                <div key={index} className={cx('me-2', 'mb-2', 'd-flex')}>
                                                    <Form.Control
                                                        className={cx('text-large', 'me-3')}
                                                        type="text"
                                                        value={value.key}
                                                        placeholder="Feature..."
                                                        onChange={(e) =>
                                                            handleSpeficationChange(index, 'key', e.target.value)
                                                        }
                                                    />
                                                    <Form.Control
                                                        className={cx('text-large')}
                                                        type="text"
                                                        value={value.value}
                                                        placeholder="Value..."
                                                        onChange={(e) =>
                                                            handleSpeficationChange(index, 'value', e.target.value)
                                                        }
                                                    />
                                                </div>
                                            );
                                        })}
                                        <div>
                                            <button className={cx('btn', 'btn-info', 'me-3')} onClick={addSpefication}>
                                                <FontAwesomeIcon icon={faAdd} className={cx('text-dark', 'me-2')} />
                                                Add more feature
                                            </button>
                                            <button className={cx('btn', 'btn-warning')} onClick={reduceSpecification}>
                                                <FontAwesomeIcon
                                                    icon={faSubtract}
                                                    className={cx('text-dark', 'me-2')}
                                                />
                                                Reduce feature
                                            </button>
                                        </div>
                                    </div>
                                    <div className={cx('form-group', 'mb-3', 'col-12')}>
                                        <label className={cx('form-control-label', 'h4')}>Highlights</label>
                                        {highlight.map((value, index) => {
                                            return (
                                                <div key={index} className={cx('me-2', 'mb-2', 'd-flex')}>
                                                    <Form.Control
                                                        className={cx('text-large', 'me-3')}
                                                        type="text"
                                                        value={value.key}
                                                        placeholder="Feature..."
                                                        onChange={(e) =>
                                                            handleHighlightChange(index, 'key', e.target.value)
                                                        }
                                                    />
                                                    <Form.Control
                                                        className={cx('text-large')}
                                                        type="text"
                                                        value={value.value}
                                                        placeholder="Value..."
                                                        onChange={(e) =>
                                                            handleHighlightChange(index, 'value', e.target.value)
                                                        }
                                                    />
                                                </div>
                                            );
                                        })}
                                        <div>
                                            <button className={cx('btn', 'me-3', 'btn-info')} onClick={addHighlight}>
                                                <FontAwesomeIcon icon={faAdd} className={cx('text-dark', 'me-2')} /> Add
                                                more feature
                                            </button>
                                            <button className={cx('btn', 'btn-warning')} onClick={reduceHighlight}>
                                                <FontAwesomeIcon
                                                    icon={faSubtract}
                                                    className={cx('text-dark', 'me-2')}
                                                />
                                                Reduce feature
                                            </button>
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
                                <Card.Body>
                                    <CloudinaryUploadWidget
                                        uwConfig={{
                                            cloudName: 'df7ziv4hz',
                                            uploadPreset: 'h8r2lchy',
                                        }}
                                        setPublicId={setSelectedImages}
                                    />
                                </Card.Body>
                                <Card.Body className={cx('p-4', 'mb-3')}>
                                    <div>
                                        {selectedImages.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image}
                                                alt={`Selected ${index}`}
                                                style={{
                                                    maxWidth: '100%',
                                                    maxHeight: '150px',
                                                    marginRight: '10px',
                                                    marginBottom: '10px',
                                                }}
                                            />
                                        ))}
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
                        <div class={cx('col-md-offset-2', 'mb-3')}>
                            <input
                                type="button"
                                value="Delete"
                                class={cx(
                                    'btn',
                                    'btn-danger',
                                    'text-white',
                                    'text-center',
                                    'border-0',
                                    'me-2',
                                    'btn-custom',
                                )}
                                onClick={(e) => handleDelete(id)}
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
