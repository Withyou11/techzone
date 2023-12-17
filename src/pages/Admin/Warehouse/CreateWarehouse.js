import styles from './DetailWarehouse.module.scss';
import classNames from 'classnames/bind';
import { Card, Dropdown, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import categoryApi from '~/api/categoryApi';
import productApi from '~/api/productApi';
import { NotificationManager } from 'react-notifications';
import warehouseApi from '~/api/warehouseApi';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import employeeApi from '~/api/employeeApi';
import ConfirmDialog from '~/components/Dialog/ConfirmDialog';
import { Cloudinary } from '@cloudinary/url-gen';
import CloudinaryUploadWidget from '~/components/CloudinaryUploadWidget/CloudinaryUploadWidget';

function CreateWarehouse() {
    const cx = classNames.bind(styles);
    const { id } = useParams();
    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState([]);
    const [previewImage, setPreviewImage] = useState([]);
    const [whCode, setWhCode] = useState('');
    const [whDesc, setWhDesc] = useState('');
    const [whEmpl, setWhEmpl] = useState('');
    const [country, setContry] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [address, setAddress] = useState('');
    const [employees, setEmployees] = useState([]);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageChange = (event) => {
        const files = event.target.files;
        if (files) {
            const imagesArray = Array.from(files).map((file) => {
                const reader = new FileReader();

                return new Promise((resolve) => {
                    reader.onloadend = () => {
                        resolve(reader.result);
                    };
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(imagesArray).then((imagesData) => {
                setSelectedImages((prevImages) => [...imagesData]);
                console.log(selectedImages);
            });
        }
    };
    const handleLoadImage = (event) => {
        const files = event.target.files;
        const arrFiles = Object.keys(files).map((key) => ({ key, value: files[key] }));
        setSelectedFile([]);
        setPreviewImage([]);
    };

    useEffect(() => {
        async function getEmployees() {
            let list = await employeeApi.getAll();
            if (list.success) {
                const data = list.data;
                const dataCus = data.map(function (item) {
                    return {
                        value: item.employee_id,
                        label: item.name,
                    };
                });
                setEmployees(dataCus);
            }
        }

        getEmployees();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(
                JSON.stringify({
                    warehouse_name: whCode,
                    description: whDesc,
                    location: {
                        address: address,
                        district: district,
                        city: city,
                        country: country,
                    },
                    employee_id: whEmpl.value,
                    image: selectedImages[0],
                    warehouse_details: [],
                }),
            );

            const result = await warehouseApi.create({
                warehouse_name: whCode,
                description: whDesc,
                location: {
                    country: country,
                    city: city,
                    district: district,
                    address: address,
                },
                employee_id: whEmpl.value,
                image: selectedImages[0],
                warehouse_details: [],
            });

            if (result.success) {
                NotificationManager.success('Create warehouse successfully');
            } else {
                NotificationManager.error('Error Create warehouse');
            }
        } catch (error) {
            console.error('Create warehouse:', error);
            NotificationManager.error('Error Create warehouse');
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
                                            <Form.Control
                                                className={cx('text-large')}
                                                type="text"
                                                value={whCode}
                                                onChange={(e) => setWhCode(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className={cx('form-group', 'mb-3', 'col-12')}>
                                        <label className={cx('form-control-label', 'h4')}>DESCRIPTION</label>
                                        <div className={cx('me-2')}>
                                            <Form.Control
                                                className={cx('text-large')}
                                                type="text"
                                                value={whDesc}
                                                onChange={(e) => setWhDesc(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className={cx('form-group', 'mb-3')}>
                                        <label className={cx('form-control-label', 'h4')}>LOCATION</label>
                                        <div className={'me-2'}>
                                            <div className={cx('mb-3', 'col-12')}>
                                                <label className={cx('form-control-label', 'h5')}>Country</label>
                                                <div className={cx('me-2')}>
                                                    <Form.Control
                                                        className={cx('text-large')}
                                                        type="text"
                                                        value={country}
                                                        onChange={(e) => setContry(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className={cx('mb-3', 'col-12')}>
                                                <label className={cx('form-control-label', 'h5')}>
                                                    City/Provinces/State
                                                </label>
                                                <div className={cx('me-2')}>
                                                    <Form.Control
                                                        className={cx('text-large')}
                                                        type="text"
                                                        value={city}
                                                        onChange={(e) => setCity(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className={cx('mb-3', 'col-12')}>
                                                <label className={cx('form-control-label', 'h5')}>
                                                    County/District
                                                </label>
                                                <div className={cx('me-2')}>
                                                    <Form.Control
                                                        className={cx('text-large')}
                                                        type="text"
                                                        value={district}
                                                        onChange={(e) => setDistrict(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className={cx('mb-3', 'col-12')}>
                                                <label className={cx('form-control-label', 'h5')}>Local Address</label>
                                                <div className={cx('me-2')}>
                                                    <Form.Control
                                                        className={cx('text-large')}
                                                        type="text"
                                                        value={address}
                                                        onChange={(e) => setAddress(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('form-group', 'mb-3', 'col-12')}>
                                        <label className={cx('form-control-label', 'h4')}>MANAGER</label>
                                        <div className={cx('me-2')}>
                                            <Select
                                                required
                                                className="basic-single"
                                                classNamePrefix="select"
                                                name="color"
                                                options={employees}
                                                value={whEmpl}
                                                onChange={(value) => {
                                                    setWhEmpl(value);
                                                }}
                                            />
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
                                    {/* <div>
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
                                            onChange={handleImageChange}
                                        />
                                    </div> */}
                                    <div>
                                        {/* {selectedFile !== null &&
                                            previewImage.map((value) => {
                                                <img src={value} id="img" alt="user" className={cx('w-100')} />;
                                            })} */}
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
                                onClick={handleSubmit}
                                value="Save"
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
                                href="/admin/warehouse"
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
