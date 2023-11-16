import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useEditEmploymentMutation } from '../../features/api/studentApi';

const EditEmploymentModal = (props) => {
    const [emDetails, setEmDetails] = useState({
        city: '',
        companyName: '',
        country: '',
        department: '',
        designation: '',
        groupName: '',
        jobEnd: '',
        joiningYear: ''
    });
    const [editEmployment, {isSuccess, data, isError, error}] = useEditEmploymentMutation();
    const [checked, setChecked] = useState(false);
    const handleChange = e => {
        setEmDetails({
            ...emDetails,
            [e.target.name]: e.target.value
        })
    };
    const handleSubmit = async e => {
        e.preventDefault()
        const { joiningYear, jobEnd } = emDetails;
        if (parseInt(joiningYear) > parseInt(jobEnd)) {
            toast.error('Job End Year must Be Bigger Then Job Start Year')
        } else {
            editEmployment({id : props.data?.id, data: emDetails})
        }
    }
    useEffect(() => {
        setEmDetails({
            city: props.data.city,
            companyName: props.data.companyName,
            country: props.data.country,
            department: props.data.department,
            designation: props.data.designation,
            groupName: props.data.groupName,
            jobEnd: props.data.jobEnd,
            joiningYear: props.data.joiningYear
        })
    }, [props.data])
    useEffect(() => {
        if (checked) {
            setEmDetails(em => ({
                ...em,
                jobEnd: null
            }))
        }
    }, [checked])
    useEffect(()=>{
        if(isSuccess){
            toast.success(data.message)
            props.onHide()
        }
        if(isError){
            toast.error(error.data.message)
        }
    },[isSuccess, isError, data, error, props])
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
                        Edit Employment Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Company or Ship</Form.Label>
                            <Form.Control
                                name='companyName'
                                type="text"
                                placeholder="Company or Ship Name"
                                value={emDetails.companyName || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Group</Form.Label>
                            <Form.Control
                                name='groupName'
                                type="text"
                                placeholder="Group Name"
                                value={emDetails.groupName || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Department</Form.Label>
                            <Form.Control
                                name='department'
                                type="text"
                                placeholder="Department Name"
                                value={emDetails.department || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Designation</Form.Label>
                            <Form.Control
                                name='designation'
                                type="text"
                                placeholder="Designation"
                                value={emDetails.designation || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                name='city'
                                type="text"
                                placeholder="City Name"
                                value={emDetails.city || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                name='country'
                                type="text"
                                placeholder="Country Name"
                                value={emDetails.country || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Joining Year</Form.Label>
                            <Form.Control
                                name='joiningYear'
                                type="number"
                                placeholder="Joining Year"
                                value={emDetails.joiningYear || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check onClick={() => setChecked(!checked)} type="checkbox" label="Currently Work Here" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Job End</Form.Label>
                            <Form.Control
                                name='jobEnd'
                                type="number"
                                placeholder="Job End Date"
                                value={emDetails.jobEnd || ''}
                                onChange={handleChange}
                                disabled={checked}
                            />
                        </Form.Group>
                        <Button variant="info" type="submit">
                            Update
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default EditEmploymentModal;