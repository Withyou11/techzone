import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function WarehouseItem({ image, name, location, id }) {
    return (
        <div className={'col-md-4 col-12 p-4'}>
            <Card>
                <Link to={'/admin/warehouse/' + id}>
                    <Card.Img variant="top" src={image} height={350} />{' '}
                </Link>
                <Card.Body className="p-3 mb-4">
                    <Link to={'/admin/warehouse/' + id} className="mb-2 h2 fw-bold">
                        {name}
                    </Link>
                    <Card.Text>
                        Address:
                        <br />
                        {location.address ? `${location.address}&nbsp;` : ''}
                        {location.district ? `${location.district}&nbsp;` : ''}
                        {location.city ? `${location.city}&nbsp;` : ''}
                        {location.nation ? `${location.address}&nation;` : ''}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default WarehouseItem;
