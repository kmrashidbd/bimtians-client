import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDeleteEmergencyMutation } from '../../features/api/studentApi';
import DeleteConfirmation from '../Shared/DeleteConfirmation';
import Loading from '../Shared/Loading';
import EditPersonalModal from '../editModal/EditPersonalModal';
import EmEditModal from '../editModal/EmEditModal';

const Personal = ({ personal, others }) => {
    const [emDeleteModal, setEmDelete] = useState('');
    const [emEditModal, setEmEdit] = useState('');
    const [personalEditModal, setPersonalEditModal] = useState('');
    const [deleteEmergency, {isSuccess, isLoading}] = useDeleteEmergencyMutation();

    const handleDeleteOthers = (data) => {
        deleteEmergency(data.id)
    };
    useEffect(()=>{
        if(isSuccess){
            toast.success('Emmergency Contact Removed Successfully')
        }
    },[isSuccess])
    if(isLoading){
        return <Loading />
    }
    return (
        <Card>
            <Card.Header>Personal Info</Card.Header>
            <Card.Body className='d-flex flex-column flex-lg-row justify-content-lg-around gap-2 align-items-center'>
                {
                    personal && Object.keys(personal).length > 0 ? <div>
                        <Card.Title>Personal Details:</Card.Title>
                        <ListGroup>
                            <ListGroup.Item>Father : {personal?.father}</ListGroup.Item>
                            <ListGroup.Item>Mother : {personal?.mother}</ListGroup.Item>
                            <ListGroup.Item>Blood Group : {personal?.bloodGroup}</ListGroup.Item>
                            <ListGroup.Item>Date of Birth : {personal?.dateOfBirth}</ListGroup.Item>
                            <ListGroup.Item>Present Address : {personal?.presentDistrict}, {personal?.presentCountry}</ListGroup.Item>
                            <ListGroup.Item>Permanent Address : {personal?.permanentDistrict}, {personal?.permanentCountry}</ListGroup.Item>
                            <ListGroup.Item>National ID No : {personal?.nId}</ListGroup.Item>
                            <ListGroup.Item>Whatsapp : {!personal?.whatsApp ? <span>Not Given</span> : personal?.whatsApp}</ListGroup.Item>
                            <ListGroup.Item>Facebook : {!personal?.facebook ? <span>Not Given</span> : personal?.facebook}</ListGroup.Item>
                            <ListGroup.Item>Linkedin : {!personal?.linkedIn ? <span>Not Given</span> : personal?.linkedIn}</ListGroup.Item>
                            <ListGroup.Item>Employmental Status : {personal?.employmentStatus}</ListGroup.Item>
                            <ListGroup.Item><Button onClick={()=>setPersonalEditModal(personal)} variant='info' size='sm'>Edit</Button></ListGroup.Item>
                        </ListGroup>
                    </div> : <div><Link className='btn btn-primary' to="/bimtian/add/personal">Add Personal Details</Link></div>
                }
                <div>
                    <div>
                        <Card.Title>Emergency Contact:</Card.Title>
                        {
                            others?.map(em => <ListGroup className='mt-2' key={em?.id}>
                                <ListGroup.Item>Name : {em?.name}</ListGroup.Item>
                                <ListGroup.Item>Relation : {em?.relation}</ListGroup.Item>
                                <ListGroup.Item>Mobile No : {em?.mobile}</ListGroup.Item>
                                <ListGroup.Item>Email : {em?.email}</ListGroup.Item>
                                <ListGroup.Item>Facebook ID : {!em?.facebook ? <span>Not Given</span> : em?.facebook}</ListGroup.Item>
                                <ListGroup.Item>Whatsapp : {!em?.whatsApp ? <span>Not Given</span> : em?.whatsApp}</ListGroup.Item>
                                <ListGroup.Item><Button variant='info' size='sm' onClick={()=>setEmEdit(em)}>Edit</Button> <Button variant='danger' size='sm' onClick={() => setEmDelete(em)}>Delete</Button></ListGroup.Item>
                            </ListGroup>)
                        }
                    </div>
                    <div><Link className='btn btn-primary mt-2' to="/bimtian/add/emergency">Add {others?.length > 0 ? 'More' : ''} Emergency Contact Info</Link></div>
                    <DeleteConfirmation
                        data={emDeleteModal}
                        setDelete={setEmDelete}
                        handleDelete={handleDeleteOthers}
                        show={emDeleteModal}
                        onHide={() => setEmDelete('')}
                    />
                    <EmEditModal    
                        data={emEditModal}
                        show={emEditModal}
                        onHide={()=>setEmEdit('')}
                    />
                    <EditPersonalModal 
                        data={personalEditModal}
                        show={personalEditModal}
                        onHide={()=>setPersonalEditModal('')}
                    />
                </div>
            </Card.Body>
        </Card>
    );
};

export default Personal;