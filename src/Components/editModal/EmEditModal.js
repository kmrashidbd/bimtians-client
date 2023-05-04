import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useEditEmergencyMutation } from '../../features/api/studentApi';
import Loading from '../Shared/Loading';

const EmEditModal = (props) => {
    const [editEm, {isLoading, isSuccess, data, isError, error}] = useEditEmergencyMutation();
    const [emDetails, setEmDetails] = useState({
        id:'',
        name: '',
        relation: '',
        email: '',
        mobile: '',
        facebook: '',
        whatsApp: ''
    })
    useEffect(() => {
        setEmDetails({
            id:props.data.id,
            name: props.data.name,
            relation: props.data.relation,
            email: props.data.email,
            mobile: props.data.mobile,
            facebook: props.data.facebook,
            whatsApp: props.data.whatsApp
        })
    }, [props.data])
    const handleChange = (e) => {
        setEmDetails({
            ...emDetails,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit=e=>{
        e.preventDefault();
        editEm(emDetails);
        props.onHide()
    };
    useEffect(()=>{
        if(isSuccess){
            toast.success(data.message)
        }
        if(isError){
            console.log(error)
        }
    },[data, isSuccess, isError, error]);
    if(isLoading){
        return <Loading/>
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit Emergency Contact</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            name='name'
                            type="text"
                            placeholder="Enter Name"
                            value={emDetails.name || ''}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Relation</Form.Label>
                        <Form.Control
                            name='relation'
                            type="text"
                            placeholder="Enter Relation"
                            value={emDetails.relation || ''}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control
                            name='mobile'
                            type="text"
                            placeholder="Enter Mobile Number"
                            value={emDetails.mobile || ''}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email (optional)</Form.Label>
                        <Form.Control
                            name='email'
                            type="email"
                            placeholder="Enter Valid Email"
                            value={emDetails.email || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Facebook ID (optional)</Form.Label>
                        <Form.Control
                            name='facebook'
                            type="text"
                            placeholder="Enter Facebook ID"
                            value={emDetails.facebook || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Whatsapp (optional)</Form.Label>
                        <Form.Control
                            name='whatsApp'
                            type="number"
                            placeholder="Enter Whatsapp Number"
                            value={emDetails.whatsApp || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button variant="info" type='submit'>
                        Update
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EmEditModal;