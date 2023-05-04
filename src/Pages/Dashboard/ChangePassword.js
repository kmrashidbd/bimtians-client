import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useChangePasswordMutation } from '../../features/api/authApi';

const ChangePassword = () => {
    const [values, setData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passChange, { isError, isSuccess, error, data }] = useChangePasswordMutation();
    const handleSubmit = e => {
        e.preventDefault();
        console.log(values)
        const { currentPassword, newPassword, confirmPassword } = values;
        if (currentPassword === newPassword) {
            toast.error("Can't Use Same Password")
        } else if (newPassword !== confirmPassword) {
            toast.error('Password and Confirm Password must be same')
        } else {
            passChange({ currentPassword, newPassword })
            setData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            })
        }
    }
    const handleChange = e => {
        setData({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message)
        }
        if (isError) {
            toast.error(error?.data?.message)
        }
    }, [data, isSuccess, isError, error])
    return (
        <div>
            <h4 className='text-center text-decoration-underline'>Change Password</h4>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                        name='currentPassword'
                        type="password"
                        placeholder="Enter Current Password"
                        value={values.currentPassword || ''}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        name='newPassword'
                        type="password"
                        placeholder="Enter New Password"
                        value={values.newPassword || ''}
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
                        value={values.confirmPassword || ''}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <input
                    type="submit"
                    className='btn btn-warning'
                    value='Change Password'
                />
            </Form>
        </div>
    );
};

export default ChangePassword;