import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useEditBasicMutation } from '../../features/api/studentApi';
import Loading from '../Shared/Loading';

const BasicEditModal = (props) => {
    const [details, setDetails] = useState({
        name: props.student.name,
        email: props.student.email,
        mobile: props.student.mobile
    })
    const [editBasic, { isLoading, isSuccess, data, isError, error }] = useEditBasicMutation();
    const handleChange = e => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        editBasic(details)
    }
    useEffect(() => {
        if (isSuccess) {
            props.onHide()
            toast.success(data)
        }
        if(isError){
            toast.error(error)
        }
    }, [data, isError, error, isSuccess, props]);
    if(isLoading){
        return <Loading/>
    }
    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update Basic Info
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formFileSm" className="mb-3">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control onChange={handleChange} name='name' type="text" size="sm" required value={details.name || ''} />
                        </Form.Group>
                        <Form.Group controlId="formFileSm" className="mb-3">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control onChange={handleChange} name='email' type="email" size="sm" required value={details.email || ''} />
                        </Form.Group>
                        <Form.Group controlId="formFileSm" className="mb-3">
                            <Form.Label>Mobile:</Form.Label>
                            <Form.Control onChange={handleChange} name='mobile' type="text" size="sm" required value={details.mobile || ''} />
                        </Form.Group>
                        <Button variant="secondary" type="submit">
                            Update
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default BasicEditModal;