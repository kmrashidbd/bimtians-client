import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../Components/Shared/Loading';
import { useAddEmergencyMutation } from '../../features/api/studentApi';

const AddEmergency = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [addEmergencyData, {isLoading, isSuccess, isError, error}] = useAddEmergencyMutation()
    const onSubmit = (data) =>{
       addEmergencyData(data)
    }
    useEffect(()=>{
        if(isSuccess){
            toast.success('Emmergency Contact Details Created Successfully');
            navigate('/dashboard')
        }
        if(isError){
            toast.error(error)
        }
    },[error, isError, isSuccess, navigate]);
    if(isLoading){
        return <Loading />
    }
    return (
        <div>
            <h4 className='text-center'>Add Emergency Contact Details</h4>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Name" 
                        {...register("name", { required: true })}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicRelation">
                    <Form.Label>Relation:</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Relation" 
                        {...register("relation", { required: true })}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicRelation">
                    <Form.Label>Mobile No:</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Mobile No" 
                        {...register("mobile", { required: true })}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicRelation">
                    <Form.Label>Corresponding Email (optional):</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Email" 
                        {...register("email")}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicRelation">
                    <Form.Label>Whatsapp No (optional):</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="WhatsApp" 
                        {...register("whatsApp")}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicRelation">
                    <Form.Label>Facebook (optional):</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Facebook Id" 
                        {...register("facebook")}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Emergency Contact
                </Button>
            </Form>
        </div>
    );
};

export default AddEmergency;