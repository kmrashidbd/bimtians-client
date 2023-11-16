import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useSendMessageMutation } from '../../features/api/authApi';

const Contact = () => {
    const [sendMessage, {isLoading, isError, isSuccess}] = useSendMessageMutation();
    const [data, setData] = useState({
        name:'',
        email: '',
        message: ''
    });
    const handleChange=e=>{
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.warning('working now')
    };
    return (
        <div>
            <section>
                <h4 className='text-center'>Send Your Message</h4>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="name">Name:</Form.Label>
                        <Form.Control
                            type='text'
                            name='name'
                            placeholder='Type Your Name'
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="email" >Email address</Form.Label>
                        <Form.Control
                            type='email'
                            name='email'
                            placeholder='Type Your Valid Email'
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Your Message</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            name='message'
                            onChange={handleChange}
                            placeholder='Type Your Message'
                            required
                        />
                    </Form.Group>
                    <input className="btn btn-primary" type="submit" value='Send' />
                </Form>
            </section>
        </div>
    );
};

export default Contact;