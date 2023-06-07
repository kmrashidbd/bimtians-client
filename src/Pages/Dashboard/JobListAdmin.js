import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { toast } from 'react-toastify';
import Loading from '../../Components/Shared/Loading';
import PaginationComp from '../../Components/Shared/PaginationComp';
import NoImage from '../../assets/images/no-post-image.png';
import { useAllJobQuery, useEditJobMutation } from '../../features/api/jobApi';

const JobListAdmin = () => {
    const { isLoading, data } = useAllJobQuery();
    const [updateJob, { isLoading: updateLoading, isSuccess, isError, error, data: result }] = useEditJobMutation();
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastRecord = currentPage * 20;
    const indexOfFirstRecord = indexOfLastRecord - 20;
    const currentRecords = data?.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(data?.length / 20);
    const handleUpdateJob = (id, status) => {
        updateJob({ id: id, data: status })
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success(result?.message)
        }
        if (isError) {
            console.log(error)
        }
    }, [isSuccess, isError, result, error])
    
    if (isLoading || updateLoading) {
        return <Loading />
    }
    return (
        <div>
            <h3 className='text-center text-decoration-underline'>All Job Posted By BIMTians</h3>
            <Row xs={1} md={2}>
                {
                    currentRecords?.length > 0 ? currentRecords?.map(post => <Col key={post?.id}>
                        <Card>
                            <Card.Img variant="top" src={post?.photo ? post?.photo : NoImage} />
                            <Card.Body>
                                <Card.Title>Post: {post?.position}</Card.Title>
                                <Card.Text>Status: {post?.status}</Card.Text>
                                <Card.Text>Posted By: {post?.student?.name}</Card.Text>
                                <Card.Text>Course: {post?.student?.course}</Card.Text>
                                <Card.Text>Intake: {post?.student?.intake}</Card.Text>
                                <Card.Text>Deadline: {post?.availability}</Card.Text>
                                {
                                    post?.status === "pending" ? <Button onClick={() => handleUpdateJob(post?.id, { status: "public" })}>Make Public</Button> : <Button onClick={() => handleUpdateJob(post?.id, { status: "pending" })} variant='warning'>Make Pending</Button>
                                }
                            </Card.Body>
                        </Card>
                    </Col>) : <p className='fw-bold text-danger'>No Post Found</p>
                }
            </Row>
            <div className='d-flex justify-content-center'>
                {
                    nPages > 1 && <PaginationComp
                        nPages={nPages + 1}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                }
            </div>
        </div>
    );
};

export default JobListAdmin;