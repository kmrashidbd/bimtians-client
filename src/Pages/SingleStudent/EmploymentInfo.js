import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

const EmploymentInfo = ({data}) => {
    return (
        <Card>
            <Card.Header>Employment Status</Card.Header>
            <Card.Body>
                <Table bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Sl No</th>
                            <th>Company / Ship</th>
                            <th>Department</th>
                            <th>Designation</th>
                            <th>City</th>
                            <th>Country</th>
                            <th>Service Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((em, index)=><tr key={em?.id}>
                                <td>{index+1}</td>
                                <td>{em?.companyName}</td>
                                <td>{em?.department}</td>
                                <td>{em?.designation}</td>
                                <td>{em?.city}</td>
                                <td>{em?.country}</td>
                                <td>{em?.joiningYear} To {em?.jobEnd>0?em?.jobEnd:'Running'}</td>
                            </tr>)
                        }
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default EmploymentInfo;