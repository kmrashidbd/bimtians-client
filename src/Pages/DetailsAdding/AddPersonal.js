import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAddPersonalMutation } from '../../features/api/studentApi';
import bdDistrict from '../../lib/bangladesh_json_data/bd-districts';

const AddPersonal = () => {
    const { register, handleSubmit } = useForm();
    const [countries, setCountries] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({});
    const [addPersonal, {isSuccess, isError, error}] = useAddPersonalMutation();
    const navigate = useNavigate();
    const onSubmit = (data) => {
       addPersonal({...data, presentCountry: selectedCountry.name, permanentCountry: 'Bangladesh'})
    }
    useEffect(() => {
        const config = {
            method: 'get',
            url: 'https://api.countrystatecity.in/v1/countries',
            headers: {
                'X-CSCAPI-KEY': 'YUw0MzNzbHhOWHZoOElkZzliWFdRNDRXVWswZjdjaTVBVWkxMXg5dA=='
            }
        };
        async function fetchCountry() {
            try {
                const result = await axios(config);
                setCountries(result.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchCountry()
    }, [])
    useEffect(() => {
        const config = {
            method: 'get',
            url: `https://api.countrystatecity.in/v1/countries/${selectedCountry?.iso2}/states`,
            headers: {
                'X-CSCAPI-KEY': 'YUw0MzNzbHhOWHZoOElkZzliWFdRNDRXVWswZjdjaTVBVWkxMXg5dA=='
            }
        };
        async function fetchCity() {
            try {
                const result = await axios(config);
                setDistricts(result.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchCity()
    }, [selectedCountry?.iso2]);
    useEffect(()=>{
        if(isSuccess){
            toast.success('Personal Data Added Successfully');
            navigate('/dashboard')
        }
        if(isError){
            console.log(error)
            toast.error(error.data.message)
        }
    },[isError, isSuccess, navigate, error])
    return (
        <div>
            <h4 className='text-center'>Add Personal Details</h4>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Father Name:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Father Name"
                        {...register("father", { required: true })}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Mother Name:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Mother Name"
                        {...register("mother", { required: true })}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Date of birth:</Form.Label>
                    <Form.Control
                        type='date'
                        {...register("dateOfBirth", { required: true })}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Blood Group:</Form.Label>
                    <Form.Select
                        aria-label="Blood Group"
                        {...register("bloodGroup", { required: true })}
                    >
                        <option>Select Blood Group</option>
                        {
                            ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg, index) => <option key={index} value={bg}>{bg}</option>)
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Present Address:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Road/Flat/Area/Village"
                        {...register("presentRoad", { required: true })}
                    />
                    <Form.Select
                        aria-label="Present Country"
                        {...register("presentCountry", { required: true })}
                        onChange={e=>setSelectedCountry(JSON.parse(e.target.value))}
                        className='my-2'
                    >
                        <option disabled>Select Country</option>
                        {
                            countries?.map(country => <option key={country?.id} value={JSON.stringify(country)}>{country?.name}</option>)
                        }
                    </Form.Select>
                    {
                        districts?.length>0 && <Form.Select
                        aria-label="Present District"
                        {...register("presentDistrict", { required: true })}
                        className='my-2'
                    >
                        <option disabled>Select District</option>
                        {
                            districts.filter(dis => !dis.name.includes('Division'))?.map(district => <option disabled={district?.name.includes('Division')} key={district?.id} value={district?.name}>{district?.name}</option>)
                        }
                    </Form.Select>
                    }
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Permanent Address:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Road/Flat/Area/Village"
                        {...register("permanentRoad", { required: true })}
                    />
                    <Form.Select
                        aria-label="Permanent District"
                        {...register("permanentDistrict", { required: true })}
                        className='my-2'
                    >
                        <option disabled>Select District</option>
                        {
                            bdDistrict.districts?.map(dist => <option key={dist?.id} value={dist.name}>{dist?.name}</option>)
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>National Id No:</Form.Label>
                    <Form.Text className="text-muted">
                        We'll never share your National ID No with anyone else.
                    </Form.Text>
                    <Form.Control
                        type="number"
                        placeholder="Enter National ID No"
                        {...register("nId")}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>whatsApp:</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter WhatsApp Number"
                        {...register("whatsApp")}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Facebook:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Facebook ID"
                        {...register("facebook")}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>LinkedIn:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter LinkedIn ID"
                        {...register("linkedIn")}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Employment Status:</Form.Label>
                    <Form.Select
                        aria-label="Employment Status"
                        {...register("employmentStatus", { required: true })}
                    >
                        <option>Select Employmental Status</option>
                        <option value="employed">Employed</option>
                        <option value="unEmployed">Un-Employed</option>
                        <option value="business">Business</option>
                        <option value="on-board">On Board</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default AddPersonal;