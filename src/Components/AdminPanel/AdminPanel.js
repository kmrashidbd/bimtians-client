import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import Female from '../../assets/images/female.jpg';
import Male from '../../assets/images/male.png';
import { useGetAdminsQuery } from '../../features/api/authApi';
import Loading from '../Shared/Loading';

const AdminPanel = () => {
    const { data, isLoading } = useGetAdminsQuery();

    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <h3 className='text-center text-decoration-underline'>Admin Panel</h3>
            <Row xs={1} md={4}>
                {
                    data?.map(admin => <Col key={admin?.id}><Card style={{ width: '18rem' }}>
                        <Card.Img className='p-2' variant="top" src={admin?.photo
                            ? admin?.photo
                            : admin?.gender === "male"
                                ? Male
                                : Female}
                        />
                        <Card.Body>
                            <Card.Title><Link to={`/bimtian/${admin?.name.replace(/\s+/g, "-")}?${admin?.id}`}>{admin?.name}</Link></Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>Website ID: {admin?.numericId}</ListGroup.Item>
                            <ListGroup.Item>Role: {admin?.role}</ListGroup.Item>
                        </ListGroup>
                    </Card></Col>)
                }
            </Row>
        </div>
    );
};

export default AdminPanel;