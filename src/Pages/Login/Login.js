import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../Components/Shared/Loading';
import LoginComp from './LoginComp';

const Login = () => {
    const student = useSelector(state => state.student);
    const token = localStorage.getItem('authToken');
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";
    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [from, navigate, token])
    if(student?.isLoading){
        return <Loading />
    }
    return (
        <div>
            <LoginComp />
        </div>
    );
};

export default Login;