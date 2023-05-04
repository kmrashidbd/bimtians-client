import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormInput from '../../Components/Shared/FormInput';
import Loading from '../../Components/Shared/Loading';
import { useRegisterStudentMutation } from '../../features/api/authApi';

const Register = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [academic, setAcademic] = useState('');
    const [userRegistration, {isLoading, isError, error, data, isSuccess}] = useRegisterStudentMutation()
    const onSubmit = data => {
        const {name, email, password, confirmPassword, gender, course, mobile, intake, academicStatus, passingYear } = data;
        if(password !== confirmPassword){
            toast.error('Password & Confirm Password Must Be Same')
        }else{
            userRegistration({name, email, password, gender, course, mobile, intake, academicStatus, passingYear})
        }
    };
    useEffect(()=>{
        if(isError){
            toast.error(error?.data?.message)
        }
        if(isSuccess){
            toast.success(data?.message)
            reset()
            navigate('/login')
        }     
    },[data, error?.data?.message, isError, isSuccess, reset, navigate]) 
    if(isLoading){ return <Loading /> }  
    return (
        <div className='d-flex flex-column align-items-center gap-2'>
            <h2 className='text-center fw-lighter'>Register Here</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='d-flex flex-column flex-lg-row mt-2'>
                    <div className='px-2'>
                        <div className="mb-3">
                            <label htmlFor="register-name" className="form-label">Name</label>
                            <FormInput
                                type='text'
                                name='name'
                                id='register-name'
                                placeholder='Type Your Name'
                                register={register}
                            />
                            {errors?.name && <p className='text-red'>Please Enter Your Name</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="register-email" className="form-label">Email address</label>
                            <FormInput
                                type='email'
                                name='email'
                                id='register-email'
                                placeholder='Type Your Valid Email'
                                register={register}
                            />
                            {errors?.email && <p className='text-red-500'>Please Input Valid Email</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="register-password" className="form-label">Password</label>
                            <FormInput
                                type='password'
                                name='password'
                                id='register-password'
                                placeholder='Enter Your Password'
                                register={register}
                            />
                            {errors?.password && <p className='text-red-500'>Please Provide Password</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="register-confirmPassword" className="form-label">Confirm Password</label>
                            <FormInput
                                type='password'
                                name='confirmPassword'
                                id='register-confirmPassword'
                                placeholder='Enter Your Password Again'
                                register={register}
                            />
                            {errors?.confirmPassword && <p className='text-red-500'>Please Provide Confirm Password</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="register-mobile" className="form-label">Mobile No With Country Code</label>
                            <FormInput
                                type='text'
                                name='mobile'
                                id='register-mobile'
                                placeholder='Enter Your mobile No'
                                register={register}
                            />
                            {errors?.password && <p className='text-red-500'>Please Provide Mobile No</p>}
                        </div>
                    </div>
                    <div className='px-2'>
                        <div className="mb-3">
                            <label htmlFor="register-gender" className="form-label">Select Gender</label>
                            <select defaultValue='' {...register("gender")} id='register-gender' className="form-select form-select-md mb-3" aria-label=".form-select-lg example" required>
                                <option value='' disabled>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Others</option>
                            </select>
                            {errors?.gender && <p className='text-red-500'>Please Select Your Gender</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="register-course" className="form-label">Course Name</label>
                            <select id='register-course' defaultValue='' {...register("course")} className="form-select form-select-md mb-3" required>
                                <option value="" disabled>Select Course</option>
                                <option value="DEMT">DEMT</option>
                                <option value="DEST">DEST</option>
                                <option value="MDEA">MDEA</option>
                                <option value="SBW">SBW</option>
                                <option value="SBMD">SBMD</option>
                                <option value="SF">SF</option>
                            </select>
                            {errors?.course && <p className='text-red-500'>Please Select Your Course</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="register-intake" className="form-label">Intake</label>
                            <FormInput
                                type='number'
                                name='intake'
                                id='register-intake'
                                placeholder='Enter Your Intake No'
                                register={register}
                            />
                            {errors?.intake && <p className='text-red-500'>Please Provide Intake No</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="register-academic" className="form-label">Academic Status</label>
                            <select {...register("academicStatus")} defaultValue='select' onChange={(e) => setAcademic(e.target.value)} id='register-academic' className="form-select form-select-md mb-3" aria-label=".form-select-lg example">
                                <option value="select" disabled>Academic Status</option>
                                <option value="passed">Passed</option>
                                <option value="student">Running</option>
                            </select>
                        </div>
                        {
                            academic === "passed" && <div className="mb-3">
                                <label htmlFor="register-passed" className="form-label">Passing Year</label>
                                <FormInput
                                    type='number'
                                    name='passingYear'
                                    placeholder='Passing Year'
                                    register={register}
                                    id="register-passed"
                                />
                            </div>
                        }
                    </div>
                </div>
                <div className="mb-3 d-flex justify-content-center">
                    <input className='btn btn-info' type="submit" value='Register' />
                </div>
            </form>
            <p>Already Have Account! <Link to='/login'>Login Here</Link></p>
        </div>
    );
};

export default Register;