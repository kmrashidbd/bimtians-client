import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { host } from '../Shared/host';
import Loading from '../Shared/Loading';


const ResetPasswordModal = (props) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(false);
    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault();
        try {
            const res = await axios.post(`${host}/api/v1/auth/forgotPassword/${email}`);
            if (res.status === 200) {
                setIsLoading(false)
                setMessage(true);
            }
        } catch (err) {
            setIsLoading(false)
            toast.error(err?.response?.data?.message)
        };
        e.target.reset()
    }
    useEffect(()=>{
        setMessage('')
    },[])
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Forgot Password!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                  isLoading? <Loading/> :  message ? <div>
                        <p>Reset Link Sent to your Registered Email</p>
                        <p>Please Check Your Email Inbox or Spam Folder</p>
                    </div> : <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter Your Registered Email" 
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                            <Form.Text className="text-muted">
                                We'll send reset password link on this Email.
                            </Form.Text>
                        </Form.Group>
                        <Button variant="info" type="submit">
                            Sent Reset Link
                        </Button>
                    </Form>
                }
            </Modal.Body>
        </Modal>
    );
};

export default ResetPasswordModal;