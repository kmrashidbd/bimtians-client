import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import GenericPdfdownloader from '../../Components/GenericPdfdownloader/GenericPdfdownloader';
import ConfirmationModal from '../../Components/Shared/ConfirmationModal';
import Loading from '../../Components/Shared/Loading';
import PaginationComp from '../../Components/Shared/PaginationComp';
import female from "../../assets/images/female.jpg";
import male from "../../assets/images/male.png";
import { useDeleteStudentMutation, useGetAllStudentQuery, useUpdateStudentMutation } from '../../features/api/adminApi';

const AllStudent = () => {
    const [modalData, setModalOpen] = useState('');
    const [deleteId, setDeleteModalOpen] = useState('');
    const [userId, setUserId] = useState(null);
    const { loggedInStudent } = useSelector(state => state.student);
    const { isLoading, data: students } = useGetAllStudentQuery();
    // paginate previus system
    const [size, setSize] = useState(30)
    const [select, setSelct] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [record, setRecord] = useState([]);
    const indexOfLastRecord = currentPage * size;
    const indexOfFirstRecord = indexOfLastRecord - size;
    const currentRecords = record?.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(record?.length / size);
    const moderator = students?.students?.filter(student => student?.role === "moderator");
    const pending = students?.students?.filter(student => student?.status === "pending");
    const active = students?.students?.filter(student => student?.status === "active");
    useEffect(() => {
        if (select === "all") {
            setRecord(students?.students)
        }
        if (select === "pending") {
            setRecord(pending)
        }
        if (select === "active") {
            setRecord(active)
        }
        if (select === "moderator") {
            setRecord(moderator)
        }
    }, [students, select])
    //paginate code finish
    const [updateStudent, { isSuccess, isError, error, data }] = useUpdateStudentMutation();
    const [deleteStudent, { isSuccess: isDeleted, isError: isDeletedError, error: deletedError, data: deleted }] = useDeleteStudentMutation();
    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message)
        }
        if (isError) {
            toast.error(error?.data?.message)
        }
        if (isDeleted) {
            toast.success(deleted?.message)
        }
        if (isDeletedError) {
            console.log(deletedError)
        }
    }, [isSuccess, isError, error, data, isDeleted, isDeletedError, deleted, deletedError]);
    const handleUpdate = (data) => {
        updateStudent(data)
    };
    const handleDelete = (id) => {
        deleteStudent(id)
    }
    const handleSeachId = e => {
        e.preventDefault();
        const searchedStudent = [students?.students?.find(user => user?.numericId === parseInt(userId))];
        searchedStudent[0] && searchedStudent?.length > 0 && setRecord(searchedStudent);
    }
    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <section>
                <div className='d-flex flex-column flex-md-row justify-content-around align-items-center'>
                    <Form.Group className="mb-1">
                        <Form.Label>Filter By:</Form.Label>
                        <Form.Select onChange={(e) => setSelct(e.target.value)} value={select} required aria-label="Select Here">
                            <option>Open this select menu</option>
                            <option value="all">All</option>
                            <option value="pending">Pending</option>
                            <option value="active">Active</option>
                            <option value="moderator">Moderator</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-1">
                        <Form.Label>Show Student Per Page</Form.Label>
                        <Form.Select onChange={(e) => setSize(e.target.value)} value={size} required aria-label="Select Here">
                            <option>Open this select menu</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                        </Form.Select>
                    </Form.Group>
                    <div>
                        <GenericPdfdownloader
                            rootElementId="testId"
                        />
                    </div>
                </div>
                <div className='my-2' id='testId'>
                    <Row>
                        <Col md={3}>
                            <Form onSubmit={handleSeachId}>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        onChange={(e) => setUserId(e.target.value)}
                                        placeholder="Search By User Id"
                                        aria-label="Search By User Id"
                                        aria-describedby="search-by-id"
                                        type='number'
                                    />
                                    <Button type='submit' variant="outline-secondary" id="search-by-id">
                                        <svg className="feather feather-search" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>
                                    </Button>
                                </InputGroup>
                            </Form>
                        </Col>
                        <Col md={9}>
                            <h5 className='text-center'>Total {select !== "all" ? currentRecords?.length : students?.students.length} no Of {currentRecords?.length > 1 ? 'BIMTians' : 'BIMTian'} are {select === "all" ? "Registered" : select}</h5>
                        </Col>
                    </Row>
                    {currentRecords?.length > 0 ? <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Sl No</th>
                                <th>User Id</th>
                                <th>User</th>
                                <th>Course</th>
                                <th>Intake</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Change Role</th>
                                <th>Change Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentRecords?.sort((a, b) => (typeof a?.numericId === 'number' && b?.numericId === 'number') && parseInt(a?.numericId) - parseInt(b?.numericId)).map((student, index) => <tr key={student?.id}>
                                    <td>{index + 1}</td>
                                    <td>{student?.numericId ? student?.numericId : 'NCY'}</td>
                                    <td><Image src={student?.photo
                                        ? student?.photo
                                        : student?.gender === "male"
                                            ? male
                                            : female} alt={student?.name} thumbnail width='40px' /> <Link to={`/bimtian/${student?.name.replace(/\s+/g, "-")}?${student?.id}`}>{student?.name}</Link></td>
                                    <td>{student?.course}</td>
                                    <td>{student?.intake}</td>
                                    <td>{student?.role}</td>
                                    <td>{student?.status}</td>
                                    <td>{
                                        loggedInStudent?.id !== student?.id && student?.role === 'user' ? <Button onClick={() => setModalOpen({ data: { role: 'moderator' }, id: student?.id })} variant='warning' size='sm'>Make Moderator</Button> : student?.role !== 'admin' && <Button variant='secondary' onClick={() => setModalOpen({ data: { role: 'user' }, id: student?.id })} size='sm'>Make User</Button>
                                    }</td>
                                    <td>{
                                        student?.role !== 'admin' && loggedInStudent?.id !== student?.id ? student?.status === 'active' ? <Button onClick={() => setModalOpen({ data: { status: 'pending' }, id: student?.id })} variant='primary' size='sm'>Make Pending</Button> : <Button variant='secondary' onClick={() => setModalOpen({ data: { status: 'active' }, id: student?.id })} size='sm'>Make Active</Button> : ''
                                    }</td>
                                    <td>
                                        {student?.role !== 'admin' && <Button variant='danger' onClick={() => setDeleteModalOpen(student?.id)} size='sm'>Delete</Button>}
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </Table> : <h5 className='text-center text-danger'>No {select} Student Found!</h5>}
                </div>
                <div className='d-flex justify-content-center'>
                    {
                        nPages > 1 && <PaginationComp
                            nPages={nPages + 1}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    }
                </div>
            </section>
            {
                <ConfirmationModal
                    modalData={modalData}
                    setModalOpen={setModalOpen}
                    action={handleUpdate}
                    title='Update'
                    text='Change'
                />
            }
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

export default AllStudent;