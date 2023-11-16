import React, { useState } from 'react';
import { usePublishedJobQuery } from '../../features/api/jobApi';
import Loading from '../../Components/Shared/Loading';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import NoImage from '../../assets/images/no-post-image.png';
import { Link } from 'react-router-dom';
import PaginationComp from '../../Components/Shared/PaginationComp';

const ShowJob = () => {
    const { data, isLoading } = usePublishedJobQuery();

    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastRecord = currentPage * 20;
    const indexOfFirstRecord = indexOfLastRecord - 20;
    const currentRecords = data?.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(data?.length / 20);

    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <h3 className="text-center text-decoration-underline">All Job Query</h3>
            <Row md={4} xs={1}>
                {
                    currentRecords?.length > 0 ? currentRecords?.map(job => <Col key={job?.id}>
                        <Card>
                            <Card.Img src={job?.photo ? job?.photo : NoImage} />
                            <Card.Body>
                                <Card.Title>Post: {job?.position}</Card.Title>
                                <Card.Text>Company: {job?.company}</Card.Text>
                                <Card.Text>Deadline: {job?.availability}</Card.Text>
                                <Link className="btn btn-primary" to={`/job/${job?.id}`}>See Details</Link>
                            </Card.Body>
                        </Card>
                    </Col>) : <p className="text-center text-danger fw-bold">No Job Found</p>
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

export default ShowJob;