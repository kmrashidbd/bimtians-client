import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useResetPasswordMutation } from '../../features/api/authApi';

const ResetPassword = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [resetPass, {isSuccess, isError, error, data}] = useResetPasswordMutation();
    const [input, setInput] = useState({
        password: '',
        confirmPassword: ''
    });
    const handleChange = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    };
    const handleSubmit = e => {
        e.preventDefault();
        resetPass({id, password: input.password})
    };
    useEffect(()=>{
        if(isSuccess){
            toast.success(data?.message);
            navigate('/login')
        }
        if(isError){
            toast.error(error?.data?.message)
        }
    },[isSuccess, isError, error, data, navigate])
    return (
        <div>
            <h4 className='text-center text-decoration-underline'>Reset Password </h4>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        name='password'
                        type="password"
                        placeholder="Enter New Password"
                        value={input.password || ''}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                        name='confirmPassword'
                        type="password"
                        placeholder="Enter New Password Again"
                        value={input.confirmPassword || ''}
                        onChange={handleChange}
                        required
                    />
                    {input.password !== input.confirmPassword ? <p className='text-danger'>Password Not Matched!</p> : ''}
                </Form.Group>
                <input
                    type="submit"
                    className='btn btn-info'
                    value='Reset Password'
                    disabled={input.password !== input.confirmPassword}
                />
            </Form>
        </div>
    );
};

export default ResetPassword;