import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAddAcademicMutation } from '../../features/api/studentApi';

const AddAcademic = () => {
    const [academicData, setAcademicData] = useState({
        course: '',
        intake: '',
        status: '',
        passingYear: ''
    })
    const handleChange = e => {
        setAcademicData({
            ...academicData,
            [e.target.name]: e.target.value
        })
    }
    const navigate = useNavigate();
    const [addAcademicData, { isSuccess, isError, error }] = useAddAcademicMutation()
    const handleSubmit = (e) => {
        e.preventDefault();
        addAcademicData(academicData)
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success('New Course Created Successfully');
            navigate('/dashboard')
        }
        if (isError) {
            toast.error(error.data.message)
        }
    }, [error, isError, isSuccess, navigate]);
    return (
        <div>
            <h4 className='text-center'>Add Emergency Contact Details</h4>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Course:</Form.Label>
                    <Form.Select onChange={handleChange} name='course' value={academicData.course} required aria-label="Select Here">
                        <option>Open this select menu</option>
                        <option value="DEMT">DEMT</option>
                        <option value="DEST">DEST</option>
                        <option value="MDEA">MDEA</option>
                        <option value="SBW">SBW</option>
                        <option value="SBMD">SBMD</option>
                        <option value="SF">SF</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicRelation">
                    <Form.Label>Intake:</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Intake No"
                        name='intake'
                        onChange={handleChange}
                        value={academicData.intake}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicRelation">
                    <Form.Label>Academic Status:</Form.Label>
                    <Form.Select onChange={handleChange} name='status' value={academicData.status} aria-label="Select Here">
                        <option>Open this select menu</option>
                        <option value="passed">Passed</option>
                        <option value="student">Running</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicRelation">
                    <Form.Label>Passing Year:</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Passing Year"
                        name='passingYear'
                        onChange={handleChange}
                        value={academicData.passingYear}
                        disabled={academicData.status !== 'passed'}
                        required={academicData.status === 'passed'}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Academic Info
                </Button>
            </Form>
        </div>
    );
};

export default AddAcademic;