import React, { useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import GenericPdfdownloader from '../../Components/GenericPdfdownloader/GenericPdfdownloader';
import Loading from '../../Components/Shared/Loading';
import Female from '../../assets/images/female.jpg';
import Male from '../../assets/images/male.png';
import { useStudentByIdQuery } from '../../features/api/studentApi';
import AcademicInfo from './AcademicInfo';
import EmergencyContact from './EmergencyContact';
import EmploymentInfo from './EmploymentInfo';
import PersonalInfo from './PersonalInfo';

const SingleStudent = () => {
    const location = useLocation();
    const id = location.search.split(['?'])[1];
    const { loggedInStudent } = useSelector(state => state.student);
    const { isError, isLoading, data, error } = useStudentByIdQuery(id);
    useEffect(() => {
        if (isError) {
            console.log(error)
        }
    }, [error, isError]);
    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <section id='testId'>
                <section className='d-flex flex-column align-items-center flex-md-row justify-content-md-center gap-2 my-1'>
                    <div>
                        <Image src={data?.photo ? data?.photo : data?.gender === 'male' ? Male : Female} width='200px' />
                    </div>
                    <div className='d-flex flex-column justify-content-center'>
                        <p>User Id: {data?.numericId ? <span className='text-primary'>{data?.numericId}</span> : <span className='text-danger'>Not Set Yet</span>}</p>
                        <p>Name: {data?.name}</p>
                        <p>Email: {data?.shareContact === "yes" ? data?.email : <span className='text-danger'>Not Have Permission to See</span>}</p>
                        <p>Mobile: {data?.shareContact === "yes" ? data?.mobile : <span className='text-danger'>Not Have Permission to See</span>}</p>
                    </div>
                </section>
                <section className='my-2'>
                    {
                        data?.personal_info && <PersonalInfo data={data?.personal_info} />
                    }
                </section>
                <section className='my-2'>
                    {
                        data?.academic_info?.length > 0 && <AcademicInfo data={data?.academic_info} />
                    }
                </section>
                <section className='my-2'>
                    {
                        data?.employment_info?.length > 0 && <EmploymentInfo data={data?.employment_info} />
                    }
                </section>
                <section className='my-2'>
                    {
                        (loggedInStudent?.role === 'admin' || loggedInStudent?.role === 'moderator') && data?.others_info?.length > 0 && <EmergencyContact data={data?.others_info} />
                    }
                </section>
            </section>
            <div className='d-flex justify-content-end'>
                <GenericPdfdownloader
                    rootElementId="testId"
                />
            </div>
        </div>
    );
};

export default SingleStudent;