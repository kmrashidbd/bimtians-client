import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormInput from '../../Components/Shared/FormInput';
import Loading from '../../Components/Shared/Loading';
import ResetPasswordModal from '../../Components/modals/ResetPasswordModal';
import { useLoginStudentMutation } from '../../features/api/authApi';
import { setToken } from '../../features/reducers/authSlice';

const LoginComp = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [logIn, {isError, isSuccess, isLoading, error, data}] = useLoginStudentMutation();
    const onSubmit = async data => logIn(data);
    useEffect(() => {
        if(isSuccess){
            dispatch(setToken(data?.token))
            localStorage.setItem('authToken', data?.token)
            toast.success(data?.message)
            navigate('/dashboard')
        }
        if(isError){
            toast.error(error?.data?.message)
        }
    }, [isSuccess, isError, error, data, dispatch, navigate]);

    if(isLoading){
        return <Loading />
    };
    return (
        <div>
            <h2 className='text-center fw-lighter'>Login Here</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="login-email" className="form-label">Email address</label>
                    <FormInput
                        type='email'
                        name='email'
                        id='login-email'
                        placeholder='Type Your Valid Email'
                        register={register}
                    />
                    {errors?.email && <p className='text-red-500'>Please Input Valid Email</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="login-password" className="form-label">Password</label>
                    <FormInput
                        type='password'
                        name='password'
                        id='login-password'
                        placeholder='Enter Your Password'
                        register={register}
                    />
                    {errors?.password && <p className='text-red-500'>Please Provide Password</p>}
                </div>
                <input className="btn btn-primary" type="submit" value='Login' />
            </form>
            <p>Not Have Any Account? <Link to='/register'>Register Here</Link></p>
            <Nav.Link onClick={() => setModalOpen(true)}>Forgot Password!</Nav.Link>
            <ResetPasswordModal
                show={modalOpen}
                onHide={() => setModalOpen(false)}
            />
        </div>
    );
};

export default LoginComp;