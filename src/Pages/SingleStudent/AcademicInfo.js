import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

const AcademicInfo = ({data}) => {
    return (
        <Card>
            <Card.Header>Academic Info</Card.Header>
            <Card.Body>
                <Table bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Sl No</th>
                            <th>Course</th>
                            <th>Intake</th>
                            <th>Status</th>
                            <th>Passing Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((ac, index)=><tr key={ac?.id}>
                                <td>{index+1}</td>
                                <td>{ac?.course}</td>
                                <td>{ac?.intake}</td>
                                <td>{ac?.status}</td>
                                <td>{ac?.passingYear?ac?.passingYear : 'Running'}</td>
                            </tr>)
                        }
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default AcademicInfo;