import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import FormInput from '../../Components/Shared/FormInput';
import Loading from '../../Components/Shared/Loading';
import { useCreateJobMutation } from '../../features/api/jobApi';

const PostJob = () => {
    const [image, setImage] = useState('');
    const [error, setError] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const [createJob, {isLoading, isError, isSuccess, error: jobError, data}] = useCreateJobMutation();
    const checkDate = e => {
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        let currentDate = `${year}-${month}-${day}`;

        const dateDifference = Math.floor((new Date(e.target.value) - new Date(currentDate)) / (1000 * 60 * 60 * 24));

        if (dateDifference <= 0) {
            setError(true)
        } else {
            setError(false)
        }
    }
    const onSubmit = data => {
        const formData = new FormData();
        formData.append('photo', image);
        for(const value in data){
            formData.append(value, data[value])
        }
        createJob(formData)
    }
    useEffect(()=>{
        if(isSuccess){
            toast.success(data?.message)
            reset();
            setImage('')
        }
        if(isError){
            console.log(jobError)
        }
    },[data, isSuccess, isError, jobError, reset]);
    if(isLoading){
        return <Loading />
    }
    return (
        <div>
            <h3 className='text-center text-decoration-underline'>Post A Job</h3>
            <h6 className='text-center text-decoration-underline'>If Any Option you Don't Have Please Write N/A</h6>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-1">
                    <Form.Label>Post Name</Form.Label>
                    <FormInput
                        type='text'
                        name='position'
                        id='position'
                        placeholder='Type Post Title'
                        register={register}
                    />
                </Form.Group>
                <Form.Group className="mb-1">
                    <Form.Label>Department</Form.Label>
                    <FormInput
                        type='text'
                        name='department'
                        id='department'
                        placeholder='Type Department Name'
                        register={register}
                    />
                </Form.Group>
                <Form.Group className="mb-1">
                    <Form.Label>Company</Form.Label>
                    <FormInput
                        type='text'
                        name='company'
                        id='company'
                        placeholder='Type Company Name'
                        register={register}
                    />
                </Form.Group>
                <Form.Group className="mb-1">
                    <Form.Label>Salary</Form.Label>
                    <FormInput
                        type='text'
                        name='salary'
                        id='salary'
                        placeholder='Type Salary Range'
                        register={register}
                    />
                </Form.Group>
                <Form.Group className="mb-1">
                    <Form.Label>Location</Form.Label>
                    <FormInput
                        type='text'
                        name='location'
                        id='location'
                        placeholder='Location'
                        register={register}
                    />
                </Form.Group>
                <Form.Group className="mb-1">
                    <Form.Label>Contact Info</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder='Enter Contact Info'
                        className="form-control"
                        id='contact'
                        {...register("contact")}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-1">
                    <Form.Label>Education</Form.Label>
                    <FormInput
                        type='text'
                        name='education'
                        id='education'
                        placeholder='Type Required Education'
                        register={register}
                    />
                </Form.Group>
                <Form.Group className="mb-1">
                    <Form.Label>Requirements</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder='Enter Aditional Requirements'
                        className="form-control"
                        id='requerment'
                        {...register("requerment")}
                    />
                </Form.Group>
                <Form.Group className="mb-1">
                    <Form.Label>Job Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder='Enter Job Description'
                        className="form-control"
                        id='description'
                        {...register("description")}
                    />
                </Form.Group>
                <Form.Group controlId="formFileSm" className="mb-3">
                    <Form.Label>Please Select Photo if any (upto 1 mb & jpg/jpeg/png types only)</Form.Label>
                    <Form.Control onChange={(e) => setImage(e.target.files[0])} type="file" size="sm" />
                    {image.size > 1000000 && <p className='text-danger'>Photo size maximum 1 mb.</p>}
                </Form.Group>
                <Form.Group className="mb-1">
                    <Form.Label>Job Link</Form.Label>
                    <FormInput
                        type='text'
                        name='link'
                        id='link'
                        placeholder='Past if any Job Link'
                        register={register}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Deadline</Form.Label>
                    <Form.Control
                        type='date'
                        {...register("availability", { required: true })}
                        onChange={checkDate}
                    />
                    {error && <p className='text-danger'>Can't Select Today or Previous Day For Deadline</p>}
                </Form.Group>
                <Button disabled={error} variant="primary" type="submit">
                    Post Job
                </Button>
            </Form>
        </div>
    );
};

export default PostJob;