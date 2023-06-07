import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Loading from '../../Components/Shared/Loading';
import PaginationComp from '../../Components/Shared/PaginationComp';
import { useGetAllStudentQuery } from '../../features/api/adminApi';

const SearchBloodGroup = () => {
    const { isLoading, data: students } = useGetAllStudentQuery();
    const [searchResult, setSearchResult] = useState([]);
    const [currentRecords, setCurrentRecords] = useState([]);
    const [location, setLocation] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastRecord = currentPage * 30;
    const indexOfFirstRecord = indexOfLastRecord - 30;
    
    const nPages = Math.ceil(searchResult?.length / 30);
    const handleChange = e => {
        const blood = e.target.value;
        setLocation(null)
        const result = students?.students?.filter(student => student?.personal_info?.bloodGroup === blood);
        setSearchResult(result);
    };
    useEffect(()=>{
        if(location){
            const data = [...searchResult]?.filter(res=>res?.personal_info?.presentDistrict === location).slice(indexOfFirstRecord, indexOfLastRecord);
            setCurrentRecords(data)
        }else{
            const data = [...searchResult]?.slice(indexOfFirstRecord, indexOfLastRecord);
            setCurrentRecords(data)            
        }
    },[location, indexOfFirstRecord, indexOfLastRecord, searchResult])
    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <h3 className='text-center'>Blood Group</h3>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Search Student By Blood Group</Form.Label>
                        <Form.Select onChange={handleChange} >
                            <option>Select Blood Group</option>
                            {
                                ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg, index) => <option key={index} value={bg}>{bg}</option>)
                            }
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Search Student By Current District</Form.Label>
                        <Form.Select disabled={currentRecords?.length <= 0} defaultValue='all' onChange={(e)=>setLocation(e.target.value)} >
                            <option>Select Current Location</option>
                            {
                                searchResult?.map((student, index) => <option key={index} value={student?.personal_info?.presentDistrict}>{student?.personal_info?.presentDistrict}</option>)
                            }
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            {currentRecords?.length > 0 ? <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Sl No</th>
                        <th>User Id</th>
                        <th>BIMTians</th>
                        <th>Course</th>
                        <th>Intake</th>
                        <th>Mobile</th>
                        <th>Present Address</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentRecords?.map((student, index) => <tr key={student?.id}>
                            <td>{index + 1}</td>
                            <td>{student?.numericId ? student?.numericId : 'NCY'}</td>
                            <td> <Link to={`/bimtian/${student?.name.replace(/\s+/g, "-")}?${student?.id}`}>{student?.name}</Link></td>
                            <td>{student?.course}</td>
                            <td>{student?.intake}</td>
                            <td>{student?.mobile}</td>
                            <td>{student?.personal_info?.presentRoad}, {student?.personal_info?.presentDistrict}</td>
                        </tr>)
                    }
                </tbody>
            </Table> : <p className='fw-bold text-center text-danger'>No Bimtians Found</p>}
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

export default SearchBloodGroup;