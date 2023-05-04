import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDeleteEmploymentMutation } from '../../features/api/studentApi';
import DeleteConfirmation from '../Shared/DeleteConfirmation';
import EditEmploymentModal from '../editModal/EditEmploymentModal';

const EmploymentInfo = ({ details }) => {
    const [employmentEditModal, setModalOpen] = useState({});
    const [deleteConfirmationId, setDeleteConfirmation] = useState('');
    const [deleteEmployment, {isSuccess, isError, error, data}] = useDeleteEmploymentMutation()
    const handleDelete = id => {
        deleteEmployment(id)
        setDeleteConfirmation('')
    }
    useEffect(()=>{
        if(isSuccess){
            toast.success(data.message)
        }
        if(isError){
            toast.error(error)
        }
    },[data, error, isError, isSuccess])
    return (
        <Card>
            <Card.Header>Employment Info</Card.Header>
            <Card.Body>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>SL No</th>
                            <th>Company</th>
                            <th>Department</th>
                            <th>Designation</th>
                            <th>City</th>
                            <th>Country</th>
                            <th>Service Duration</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            details?.map((data, index) => <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data?.companyName}</td>
                                <td>{data?.department}</td>
                                <td>{data?.designation}</td>
                                <td>{data?.city}</td>
                                <td>{data?.country}</td>
                                <td>{data?.joiningYear} To {data?.jobEnd ? data?.jobEnd : 'Continue'}</td>
                                <td><Button onClick={() => setModalOpen(data)} variant="info" className='me-2' size="sm"> Edit</Button><Button onClick={() => setDeleteConfirmation(data?.id)} variant="danger" size="sm"> Delete</Button></td>
                            </tr>)
                        }
                    </tbody>
                </Table>
                <Link className='btn btn-secondary' to="/bimtian/add/employment">Add {details?.length > 0 ? 'More' : ''} Employment Details</Link>
                {deleteConfirmationId && <DeleteConfirmation data={deleteConfirmationId} handleDelete={handleDelete} setDelete={setDeleteConfirmation} />}
                <EditEmploymentModal
                    show={Object.keys(employmentEditModal).length > 0}
                    onHide={() => setModalOpen({})}
                    data={employmentEditModal}
                />
            </Card.Body>
        </Card>
    );
};

export default EmploymentInfo;