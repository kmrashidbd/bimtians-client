import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import PaginationComp from '../../Components/Shared/PaginationComp';
import Female from '../../assets/images/female.jpg';
import Male from '../../assets/images/male.png';

const SearchedStudent = ({ students, reSearch }) => {
    const [size, setSize] = useState(20)
    const [currentPage, setCurrentPage] = useState(1);
    const [record, setRecord] = useState([]);
    const indexOfLastRecord = currentPage * size;
    const indexOfFirstRecord = indexOfLastRecord - size;
    const currentRecords = record?.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(record?.length / size);
    useEffect(() => {
        setRecord(students)
    }, [students])
    return (
        <Stack gap={2} className='mt-2'>
            <div className='d-flex flex-column flex-md-row gap-2 justify-content-around align-items-center'>
                <Form.Group className="mb-1">
                    <Form.Label>Show BIMTian Per Page</Form.Label>
                    <Form.Select onChange={(e) => setSize(e.target.value)} value={size} required aria-label="Select Here">
                        <option>Open this select menu</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                    </Form.Select>
                </Form.Group>
                <h4>Result: Total {students.length} {students.length > 1 ? 'BIMTians' : 'BIMTian'} Found</h4>
                <div>
                    <Button variant='primary' onClick={() => reSearch([])}>Search Again</Button>
                </div>
            </div>
            <div>
                <Table striped responsive bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>SL No</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Course</th>
                            <th>Intake</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentRecords?.sort((a,b)=>a?.intake - b?.intake).map((student, index) => <tr key={student?.id}>
                                <td>{index + 1}</td>
                                <td><Image src={student?.student?.photo ? student?.student?.photo : student?.student?.gender === 'male' ? Male : Female} width='35px' thumbnail /></td>
                                <td><Link to={`/bimtian/${student?.studentName.replace(/\s+/g, "-")}?${student?.student.id}`}>{student?.studentName}</Link></td>
                                <td>{student?.course}</td>
                                <td>{student?.intake}</td>
                            </tr>)
                        }
                    </tbody>
                </Table>
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
        </Stack>
    );
};

export default SearchedStudent;