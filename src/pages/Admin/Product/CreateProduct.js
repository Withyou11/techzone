import styles from './CreateProduct.module.scss';
import classNames from 'classnames/bind';
import { Card, Dropdown, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import categoryApi from '~/api/categoryApi';
import productApi from '~/api/productApi';
import { NotificationManager } from 'react-notifications';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faSubtract } from '@fortawesome/free-solid-svg-icons';

function CreateProduct() {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
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
        // let specificationObject = {};
        // for (let item in specification) {
        //     specificationObject = { ...specificationObject, specification[item] };
        //     console.log(specification[item]);
        // }
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
            form.append('created_at', Date.now());
            form.append('update_at', Date.now());

            var result = await productApi.create(form);

            if (result.success) {
                NotificationManager.success('Create product successfully');
                navigate('/admin/products');
            }
        } catch (error) {
            console.error('Error create product:', error);
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
    return (
        <div className={cx('main-container')}>
            <div className={cx('header')}>
                <div>
                    <h6 className={cx('title')}>Create Product</h6>
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
                                                onChange={(e) => {
                                                    setCategory(e.target.value);
                                                    console.log(category);
                                                }}
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
                                value="Create"
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

export default CreateProduct;
