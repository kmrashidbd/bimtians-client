import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useEditAcademicMutation } from '../../features/api/studentApi';

const EditAcademicModal = (props) => {
    const [academicDetails, setAcademicDetails] = useState({
        course: '',
        intake: '',
        status: '',
        passingYear: ''
    })
    const [editEm, {isError, error, isSuccess}] = useEditAcademicMutation();
    const handleChange = (e) => {
        setAcademicDetails({
            ...academicDetails,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = e => {
        e.preventDefault();
        editEm({data:academicDetails, id: props.data.id});
        props.onHide();
    };
    useEffect(() => {
        setAcademicDetails({
            course: props.data.course,
            intake: props.data.intake,
            status: props.data.status,
            passingYear: props.data.passingYear
        })
    }, [props.data])
    useEffect(()=>{
        if(isSuccess){
            toast.success('Academic Data Updated Successfully')
        }
        if(isError){
            toast.error(error.data.message)
        }
    },[isSuccess, isError, error])
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
                        <Form.Label>Course</Form.Label>
                        <Form.Select onChange={handleChange} name='course' value={academicDetails.course} required aria-label="Select Here">
                            <option>Open this select menu</option>
                            <option value="DEMT">DEMT</option>
                            <option value="DEST">DEST</option>
                            <option value="MDEA">MDEA</option>
                            <option value="SBW">SBW</option>
                            <option value="SBMD">SBMD</option>
                            <option value="SF">SF</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Intake</Form.Label>
                        <Form.Control
                            name='intake'
                            type="number"
                            placeholder="Enter Intake Number"
                            value={academicDetails.intake || ''}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select onChange={handleChange} name='status' value={academicDetails.status} aria-label="Select Here">
                            <option>Open this select menu</option>
                            <option value="passed">Passed</option>
                            <option value="student">Running</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Passing Year</Form.Label>
                        <Form.Control
                            name='passingYear'
                            type="number"
                            placeholder="Enter Valid Email"
                            value={academicDetails.status === 'passed' ? academicDetails.passingYear : 0}
                            onChange={handleChange}
                            disabled={academicDetails.status !== 'passed'}
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

export default EditAcademicModal;