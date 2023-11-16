import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAddEmploymentMutation } from '../../features/api/studentApi';

const AddEmployment = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate()
    const [checked, setChecked] = useState(false);
    const [addEmploymentData, { isSuccess, isError, error }] = useAddEmploymentMutation();
    const onSubmit = (data) => {
        addEmploymentData(data)
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success('Employment Added Successfully')
            navigate('/dashboard')
        }
        if (isError) {
            toast.error(error)
        }
    }, [error, isError, isSuccess, navigate])
    return (
        <div>
            <h4 className='text-center my-2'>Add Employment Details</h4>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicCompanyName">
                    <Form.Label>Company Or Ship Name:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Company Or Ship Name"
                        {...register("companyName", { required: true })}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicGroupName">
                    <Form.Label>Group Name:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Group Name"
                        {...register("groupName", { required: true })}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDepartmentName">
                    <Form.Label>Department:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Department Name"
                        {...register("department", { required: true })}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDesignationName">
                    <Form.Label>Designation:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Group Name"
                        {...register("designation", { required: true })}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCountryName">
                    <Form.Label>Country:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Country Name"
                        {...register("country", { required: true })}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCityName">
                    <Form.Label>City:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter City Name"
                        {...register("city", { required: true })}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicJoiningYear">
                    <Form.Label>Joining Year:</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter Joining Year"
                        {...register("joiningYear", { required: true })}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" onClick={() => setChecked(!checked)} label="Currently Work Here" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicJoiningYear">
                    <Form.Label>Job End Year:</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter Job End Year"
                        disabled={checked}
                        {...register("jobEnd")}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Employment
                </Button>
            </Form>
        </div>
    );
};

export default AddEmployment;