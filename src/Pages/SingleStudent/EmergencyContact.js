import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

const EmergencyContact = ({data}) => {
    return (
        <Card>
            <Card.Header>Emergency Contact</Card.Header>
            <Card.Body>
                <Table bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Sl No</th>
                            <th>Name</th>
                            <th>Relation</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>WhatsApp</th>
                            <th>Facebook</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((em, index)=><tr key={em?.id}>
                                <td>{index+1}</td>
                                <td>{em?.name}</td>
                                <td>{em?.relation}</td>
                                <td>{em?.mobile}</td>
                                <td>{em?.email?em?.email:'Not Given'}</td>
                                <td>{em?.whatsApp?em?.whatsApp:'Not Given'}</td>
                                <td>{em?.facebook?em?.facebook:'Not Given'}</td>
                            </tr>)
                        }
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default EmergencyContact;