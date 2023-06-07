import React, { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import ConfirmationModal from '../../Components/Shared/ConfirmationModal';
import Loading from '../../Components/Shared/Loading';
import PaginationComp from '../../Components/Shared/PaginationComp';
import NoImage from '../../assets/images/no-post-image.png';
import { useDeleteJobMutation, useGetJobByUserQuery } from '../../features/api/jobApi';
import { toast } from 'react-toastify';

const PostedJobs = () => {
    const [deleteId, setDeleteModalOpen] = useState('');
    const { data, isLoading } = useGetJobByUserQuery();
    const [deleteJob, {isError, isSuccess, error, data:deleted}] = useDeleteJobMutation();
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastRecord = currentPage * 20;
    const indexOfFirstRecord = indexOfLastRecord - 20;
    const currentRecords = data?.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(data?.length / 20);
    const handleDelete = (id)=>{
        deleteJob(id)
    }
    useEffect(()=>{
        if(isSuccess){
            toast.success(deleted?.message)
        }
        if(isError){
            console.log(error)
        }
    },[isSuccess, isError, error, deleted])
    if (isLoading) {
        return <Loading />
    }
    const today = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
    return (
        <div>
            <h4 className='text-center text-decoration-underline'>Job Posted By Me</h4>
            <div className='d-flex justify-content-end'>
            <Link className='text-decoration-none btn btn-info text-white fw-bold' to='/dashboard/post-job'>Post More Job</Link>
            </div>
            <Row xs={1} md={2}>
                {
                    currentRecords?.length > 0 ? currentRecords?.map(post => <Col key={post?.id}>
                        <Card>
                            <Link to={`/job/${post?.id}`}><Card.Img variant="top" className='rounded' src={post?.photo ? post?.photo : NoImage} alt={post?.position} /></Link>
                            <Card.Body>
                                <Card.Title>Position: <Link to={`/job/${post?.id}`}>{post?.position}</Link></Card.Title>
                                <Card.Text>Status: <span className={post?.status === 'pending' ? 'text-danger' : 'text-success'}>{post?.status}</span></Card.Text>
                                <Card.Text>Deadline: {post?.availability} {new Date(post?.availability).getTime() >= new Date(today).getTime() ? <Badge bg='primary'>Available</Badge> : <Badge bg='danger'>Expired</Badge>}</Card.Text>
                                <Button onClick={()=>setDeleteModalOpen(post?.id)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    </Col>) : <p className='fw-bold text-warning text-center'>No Job Post Found</p>
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
            {
                <ConfirmationModal
                    modalData={deleteId}
                    setModalOpen={setDeleteModalOpen}
                    action={handleDelete}
                    title='Delete'
                    text='Delete'
                />
            }
        </div>
    );
};

export default PostedJobs;