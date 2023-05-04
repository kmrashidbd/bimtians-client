import axios from 'axios';
import React, { useState } from 'react';
import Figure from 'react-bootstrap/Figure';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AcademicInfo from '../../Components/PersonalInfo/AcademicInfo';
import EmploymentInfo from '../../Components/PersonalInfo/EmploymentInfo';
import Personal from '../../Components/PersonalInfo/Personal';
import EditPhotoModal from '../../Components/Shared/EditPhotoModal';
import Loading from '../../Components/Shared/Loading';
import { host } from '../../Components/Shared/host';
import BasicEditModal from '../../Components/editModal/BasicEditModal';
import female from "../../assets/images/female.jpg";
import male from "../../assets/images/male.png";
import { useSingleStudentQuery } from '../../features/api/studentApi';
import setAuthHeader from '../../utils/setAuthHeader';

const Profile = () => {
    const token = localStorage.getItem('authToken');
    const [photoEditModal, setPhotoEditModal] = useState(false);
    const [basicEditModalOpen, setBasicEditModal] = useState(false);
    const { loggedInStudent, isLoading: idLoading } = useSelector(state => state.student);
    const { data: singleStudent, isLoading, isError, error, refetch } = useSingleStudentQuery(loggedInStudent?.id);
    const handleChange = async (data) => {
        setAuthHeader(token)
        const result = await axios.put(`${host}/api/v1/student/editBasic`, data);
        if (result?.status === 201) {
            refetch()
        }
    }
    if (isLoading || idLoading) {
        return <Loading />
    }
    if (isError) {
        toast.error(error)
    }
    return (
        <div>
            <div className="h4 text-center my-2">Welcome <span className='fw-light font-monospace text-success'>{singleStudent?.name}</span> To Your Dashboard</div>
            <div className='d-flex justify-content-center justify-content-lg-start'>
                <div className='d-flex height: 200px gap-2 flex-column align-items-center flex-lg-row'>
                    <Figure className='pe-auto' onClick={() => setPhotoEditModal(true)}>
                        <Figure.Image className='h-100' src={singleStudent?.photo
                            ? singleStudent?.photo
                            : singleStudent?.gender === "male"
                                ? male
                                : female} alt={singleStudent?.name}
                            width={200}
                            rounded
                        />
                    </Figure>
                    <div>
                        <p>User Id: {singleStudent?.numericId ? singleStudent?.numericId : 'Not Set Yet'}</p>
                        <p>Name : {singleStudent?.name}</p>
                        <p>Email : {singleStudent?.email} <span className={`px-2 rounded text-light ${singleStudent?.shareContact === "yes" ? 'bg-success' : "bg-danger"}`}>{singleStudent?.shareContact === "yes" ? "Shared" : "Hide"}</span></p>
                        <p>Mobile : {singleStudent?.mobile} <span className={`px-2 rounded text-light ${singleStudent?.shareContact === "yes" ? 'bg-success' : "bg-danger"}`}>{singleStudent?.shareContact === "yes" ? "Shared" : "Hide"}</span></p>
                        <p>Status : <span className={`${singleStudent?.status === "pending" ? 'text-danger' : 'text-success text-capitalize fw-bold'}`}>{singleStudent?.status}</span> <br />{singleStudent?.status === "pending" && <span className="text-danger">Your Profile is Deactive! We Will Approve You Shortly......</span>}</p>
                    </div>
                    <div className='d-flex flex-row flex-lg-column gap-2 justify-content-lg-center'>
                        <button onClick={() => setBasicEditModal(true)} className='btn btn-info'>Edit</button>
                        {singleStudent?.shareContact === "yes" ? <button onClick={() => handleChange({ shareContact: "no" })} className="btn btn-primary">Hide Contact</button> : <button onClick={() => handleChange({ shareContact: "yes" })} className="btn btn-secondary">Share Contact</button>}
                    </div>
                </div>
            </div>
            <section className='d-flex flex-column gap-2 mt-2'>
                <div>
                    {
                        singleStudent?.employment_info ? <EmploymentInfo details={singleStudent?.employment_info} loggedInStudent={loggedInStudent} /> : <Link className='btn btn-primary' to="/bimtian/add/employment">Add Employment Details</Link>
                    }
                </div>
                <div>
                    <AcademicInfo details={singleStudent?.academic_info} />
                </div>
                <div>
                    <Personal personal={singleStudent?.personal_info} others={singleStudent?.others_info} />
                </div>
            </section>
            {photoEditModal && <EditPhotoModal show={photoEditModal} onHide={() => setPhotoEditModal(false)} />}
            {basicEditModalOpen && <BasicEditModal
                loggedinstudent={loggedInStudent}
                show={basicEditModalOpen}
                student={singleStudent}
                onHide={() => setBasicEditModal(false)}
            />}
        </div>
    );
};

export default Profile;