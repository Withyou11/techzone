import styles from './CreateProduct.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faFilter } from '@fortawesome/free-solid-svg-icons';
import products from '~/Statics/products';
import { Card, Dropdown, Form } from 'react-bootstrap';

function CreateProduct() {
    const cx = classNames.bind(styles);

    const dataArray = products;

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
                                            <Form.Control className={cx('text-large')} type="text" />
                                        </div>
                                    </div>

                                    <div className={cx('form-group', 'mb-3', 'col-12')}>
                                        <label className={cx('form-control-label', 'h4')}>Category</label>
                                        <div className={cx('me-2')}>
                                            <Form.Select
                                                className={cx('text-large')}
                                                aria-label="Default select example"
                                            >
                                                <option>Open this select category</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </div>
                                    </div>
                                    <div className={cx('form-group', 'mb-3')}>
                                        <label className={cx('form-control-label', 'h4')}>
                                            The description of product
                                        </label>
                                        <div className={'me-2'}>
                                            <Form.Control className={cx('text-large')} as="textarea" type="text" />
                                        </div>
                                    </div>
                                    <div className={cx('form-group', 'mb-3', 'd-flex')}>
                                        <div className={cx('mb-3', 'col-md-6 ', 'col-12')}>
                                            <label className={cx('form-control-label', 'h4')}>Amount</label>
                                            <div className={'me-2'}>
                                                <Form.Control className={cx('text-large')} type="number" />
                                            </div>
                                        </div>
                                        <div className={cx('mb-3', 'col-md-6', 'col-12')}>
                                            <label className={cx('form-control-label', 'h4')}>Price</label>
                                            <div className={'me-2'}>
                                                <Form.Control className={cx('text-large')} type="number" />
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                            <Card className={cx('col-12', 'mb-3')}>
                                <Card.Header className={cx('card-header-style')}>
                                    <h3 className={cx('h2', 'fw-bold')}>Technical specifications </h3>
                                </Card.Header>
                                <Card.Body className={cx('a')}></Card.Body>
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
                                        />
                                    </div>
                                    <div>
                                        <img
                                            src="https://file.hstatic.net/1000026716/file/gearvn-ban-phim-co-akko-3098b-multi-modes-blue-on-white-4_e755d44a4a1a436cb350321635698e2c_grande.png"
                                            id="img"
                                            alt="user"
                                            className={cx('w-100')}
                                        />
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>

                    <div class={cx('mt-5', 'd-flex')}>
                        <div class={cx('col-md-offset-2', 'mb-3')}>
                            <input
                                type="submit"
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
