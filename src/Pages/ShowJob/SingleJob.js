import React from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../Components/Shared/Loading';
import NoImage from '../../assets/images/no-post-image.png';
import { useGetjobByIdQuery } from '../../features/api/jobApi';

const SingleJob = () => {
    const { id } = useParams();
    const { isLoading, data } = useGetjobByIdQuery(id);
    if (isLoading) {
        return <Loading />
    }
    return (
        <div className='d-flex flex-column align-items-center my-2'>
            <img width='350px' src={data?.photo ? data?.photo : NoImage} alt={data?.position} />
            <div>
                <p>Post: {data?.position}</p>
                <p>Department: {data?.department}</p>
                <p>Company: {data?.company}</p>
                <p>Job Description: {data?.description}</p>
                <p>Education Requirement: {data?.education}</p>
                <p>Requirements: {data?.requerment}</p>
                <p>Job Location: {data?.location}</p>
                <p>Contact Details: {data?.contact}</p>
                <p>Salary: {data?.salary}</p>
                <p>Link (if any): {data?.link}</p>
            </div>
        </div>
    );
};

export default SingleJob;