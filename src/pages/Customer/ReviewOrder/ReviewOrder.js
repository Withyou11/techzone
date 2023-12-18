import classNames from 'classnames';
import React, { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import styles from './ReviewOrder.module.scss';
import { useLocation } from 'react-router-dom';
import reviewApi from '~/api/reviewApi';
import { NotificationManager } from 'react-notifications';

const ProductReview = () => {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const cx = classNames.bind(styles);
    console.log('product');

    const { state } = useLocation();
    console.log(state);
    const handleRatingChange = (event) => {
        setRating(Number(event.target.value));
    };
    const goBack = (event) => {
        window.history.back();
    };
    const handleReviewTextChange = (event) => {
        setReviewText(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let result = await reviewApi.create({
                product_id: state.product_id,
                customer_id: localStorage.getItem('customerId'),
                date: '2023/12/18',
                star: rating,
                content: reviewText,
            });

            if (result.success) {
                NotificationManager.success('Thank for your review');
                setRating(0);
                setReviewText('');
                setTimeout(() => {
                    goBack();
                }, 1000);
            } else {
                NotificationManager.error('Review product failed');
            }
        } catch (ex) {
            NotificationManager.error('Review product failed');
        }
    };

    return (
        <Card className={cx('form-create', 'm-auto', 'mb-5', 'col-12', 'col-md-8')}>
            <Card.Header className={cx('card-header-style')} style={{ backgroundColor: 'black', color: 'white' }}>
                Product Review Form
            </Card.Header>
            <Card.Body>
                <div>
                    {state && (
                        <div className={cx('wrapper', 'd-flex', 'm-4')}>
                            <img className={cx('image', 'me-5')} src={state.product.image} alt="avatar" width={100} />
                            <div className={cx('nameContainer', 'w-100', 'd-flex', 'justify-content-between')}>
                                <div>
                                    <p className={cx('name')}>{state.product.name}</p>
                                    <p className={cx('price')}>${state.product.price}</p>
                                </div>

                                <p className={cx('amountText')}>Quantity: {state.quantity}</p>
                            </div>
                        </div>
                    )}
                </div>
            </Card.Body>
            <Card.Body className={cx('p-5', 'row')}>
                <Form.Group className={cx('mb-5', 'col-12', 'col-sm-6')}>
                    <h2 className={cx('fw-bold')} htmlFor="reviewText">
                        Review:
                    </h2>
                    <Form.Control
                        style={{ fontSize: 16 }}
                        as="textarea"
                        id="reviewText"
                        value={reviewText}
                        onChange={handleReviewTextChange}
                        placeholder="Write your review here"
                    />
                </Form.Group>
                <Form.Group className={cx('mb-5', 'col-12', 'col-sm-6')}>
                    <Form.Group>
                        <h2 className={cx('fw-bold')} htmlFor="rating">
                            Rating:
                        </h2>
                        <Form.Select id="rating" value={rating} onChange={handleRatingChange} style={{ fontSize: 16 }}>
                            <option value={0}>Select Rating</option>
                            <option value={1}>1 star</option>
                            <option value={2}>2 stars</option>
                            <option value={3}>3 stars</option>
                            <option value={4}>4 stars</option>
                            <option value={5}>5 stars</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className={cx('mt-5')}>
                        <button
                            className={cx('btn', 'btn-dark', 'me-2')}
                            style={{ fontSize: 16 }}
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Submit Review
                        </button>
                        <button className={cx('btn', 'btn-danger')} style={{ fontSize: 16 }} onClick={goBack}>
                            Cancel
                        </button>
                    </Form.Group>
                </Form.Group>
            </Card.Body>
        </Card>
    );
};

export default ProductReview;
