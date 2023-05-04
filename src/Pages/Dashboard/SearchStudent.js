import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Jetty from '../../assets/images/bimt_jetty_gate_new.jpg';
import Campus from '../../assets/images/Campus.jpeg';
import Slider from '../../Components/Slider/Slider';
import { useSearchStudentMutation } from '../../features/api/studentApi';
import SearchedStudent from './SearchedStudent';

const SearchStudent = () => {
    const { register, handleSubmit } = useForm();
    const [search, { isSuccess, isError, error, data }] = useSearchStudentMutation();
    const [serchedStudent, setSearchStudent] = useState([]);
    const sliderData = [
        {
            img: Campus,
            title: 'BIMT Campus',
            alt: 'campus'
        },
        {
            img: Jetty,
            title: 'BIMT Jetty',
            alt: 'jetty'
        }
    ];
    const onSubmit = data => {
        search(data)
    }
    useEffect(() => {
        if (isSuccess) {
            const activeStudent = data.filter(std => std.student.status === 'active')
            setSearchStudent(activeStudent)
        }
        if (isError) {
            setSearchStudent([])
            toast.error(error?.data?.message)
        }
    }, [data, isSuccess, isError, error])
    return (
        <div>
            {
                serchedStudent.length > 0 ? <SearchedStudent students={serchedStudent} reSearch={setSearchStudent} /> : <div>
                    <h4 className='text-center'>Search BIMTians</h4>
                    <Slider data={sliderData} />
                    <div className='my-2'>
                        <h5 className='text-center text-decoration-underline'>Search Area</h5>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="2">Name</Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type="text"
                                        placeholder="Student Name"
                                        {...register('name')}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="2">Course</Form.Label>
                                <Col sm="10">
                                    <Form.Select
                                        aria-label="Select Here"
                                        {...register('course')}
                                    >
                                        <option disabled>Select Course From Here</option>
                                        <option>DEMT</option>
                                        <option>DEST</option>
                                        <option>MDEA</option>
                                        <option>SBW</option>
                                        <option>SBMD</option>
                                        <option>SF</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="2">Intake</Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type="number"
                                        placeholder="Student Intake No"
                                        {...register('intake')}
                                    />
                                </Col>
                            </Form.Group>
                            <div className='d-flex justify-content-end'>
                                <Button type='submit' variant='primary'>Search</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            }
        </div>
    );
};

export default SearchStudent;