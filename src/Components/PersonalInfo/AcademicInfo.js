import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDeleteAcademicMutation } from '../../features/api/studentApi';
import DeleteConfirmation from '../Shared/DeleteConfirmation';
import EditAcademicModal from '../editModal/EditAcademicModal';

const AcademicInfo = ({ details }) => {
    const [deleteConfirmationId, setDeleteConfirmation] = useState('');
    const [academicModal, setModalOpen] = useState('');
    const [deleteAcademic, {isSuccess, isError, error, data}] = useDeleteAcademicMutation();
    const handleDelete=(id)=>{
        deleteAcademic(id)
    }
    useEffect(()=>{
        if(isSuccess){
            toast.success(data.message)
        }
        if(isError){
            console.log(error)
        }
    },[isSuccess, isError, error, data])
    return (
        <Card>
            <Card.Header>Academic Info (Maximum Two Course)</Card.Header>
            <Card.Body>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>SL No</th>
                            <th>Course</th>
                            <th>Intake</th>
                            <th>Status</th>
                            <th>Passing Year</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            details?.map((acInfo, index) => <tr key={acInfo?.id}>
                                <td>{index + 1}</td>
                                <td>{acInfo?.course}</td>
                                <td>{acInfo?.intake}</td>
                                <td>{acInfo?.status}</td>
                                <td>{acInfo?.passingYear>0?acInfo?.passingYear:'Running'}</td>
                                <td><Button onClick={() => setModalOpen(acInfo)} variant="info" className='me-2' size="sm"> Edit</Button><Button onClick={() => setDeleteConfirmation(acInfo?.id)} variant="danger" size="sm"> Delete</Button></td>
                            </tr>)
                        }
                    </tbody>
                </Table>
                {
                    details?.length < 2 && <Link className='btn btn-secondary' to='/bimtian/add/academic'>Add More Course</Link>
                }
            </Card.Body>
            <DeleteConfirmation
                data={deleteConfirmationId}
                setDelete={setDeleteConfirmation}
                handleDelete={handleDelete}
                show={deleteConfirmationId}
                onHide={() => setDeleteConfirmation('')}
            />
            <EditAcademicModal
                data = {academicModal}
                show = {academicModal}
                onHide = {() => setModalOpen('')}
            />
        </Card>
    );
};

export default AcademicInfo;