import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

const PersonalInfo = ({data}) => {
    return (
        <Card>
            <Card.Header>Personal Info</Card.Header>
            <Card.Body>
                <Table bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Blood Group</th>
                            <th>Present Address</th>
                            <th>Facebook ID</th>
                            <th>LinkedIn ID</th>
                            <th>Employment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{data?.bloodGroup}</td>
                            <td>{`${data?.presentRoad}, ${data?.presentDistrict}`}</td>
                            <td>{data?.facebook}</td>
                            <td>{data?.linkedIn}</td>
                            <td>{data?.employmentStatus}</td>
                        </tr>
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default PersonalInfo;