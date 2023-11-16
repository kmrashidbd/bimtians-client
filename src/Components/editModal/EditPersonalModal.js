import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useEditPersonalMutation } from '../../features/api/studentApi';

const EditPersonalModal = (props) => {
    const [err, setErr] = useState();
    const [countries, setCountries] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('')
    const [personalDetails, setPersonalDetails] = useState({
        father: '',
        mother: '',
        presentRoad: '',
        presentDistrict: '',
        presentCountry: selectedCountry.name,
        whatsApp: '',
        facebook: '',
        linkedIn: '',
        employmentStatus: ''
    })
    const [editPersonal, { isError, error, isSuccess }] = useEditPersonalMutation();
    const handleChange = (e) => {
        setPersonalDetails({
            ...personalDetails,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = e => {
        e.preventDefault();
        editPersonal(personalDetails);
        props.onHide();
    };
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
                setErr(err)
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
                setErr(err)
            }
        }
        fetchCity()
    }, [selectedCountry?.iso2]);
    useEffect(() => {
        setPersonalDetails({
            father: props.data.father,
            mother: props.data.mother,
            presentRoad: props.data.presentRoad,
            presentDistrict: props.data.presentDistrict,
            presentCountry: props.data.presentCountry,
            whatsApp: props.data.whatsApp,
            facebook: props.data.facebook,
            linkedIn: props.data.linkedIn,
            employmentStatus: props.data.employmentStatus
        })
    }, [props.data]);
    useEffect(() => {
        if (isSuccess) {
            toast.success('Personal Details update Successfully')
        }
        if (isError) {
            toast.error(error.data.message)
        }
    }, [isError, error, isSuccess])
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit Emergency Contact</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Father</Form.Label>
                        <Form.Control
                            name='father'
                            type="text"
                            placeholder="Enter Father Name"
                            value={personalDetails.father || ''}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mother</Form.Label>
                        <Form.Control
                            name='mother'
                            type="text"
                            placeholder="Enter Mother Name"
                            value={personalDetails.mother || ''}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Present Address:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Road/Flat/Area/Village"
                            value={personalDetails.presentRoad}
                            onChange={handleChange}
                        />
                        <Form.Select
                            aria-label="Present Country"
                            onChange={e => setSelectedCountry(JSON.parse(e.target.value))}
                            className='my-2'
                            value={personalDetails.presentCountry}
                            name='presentCountry'
                        >
                            <option disabled>Select Country</option>
                            {
                                countries?.map(country => <option key={country?.id} value={JSON.stringify(country)}>{country?.name}</option>)
                            }
                        </Form.Select>
                        {
                            districts?.length > 0 && <Form.Select
                                aria-label="Present District"
                                className='my-2'
                                onChange={handleChange}
                                value={personalDetails.presentDistrict}
                                name="presentDistrict"
                            >
                                <option disabled>Select District</option>
                                {
                                    districts.filter(dis => !dis.name.includes('Division'))?.map(district => <option disabled={district?.name.includes('Division')} key={district?.id} value={district?.name}>{district?.name}</option>)
                                }
                            </Form.Select>
                        }
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>WhatsApp</Form.Label>
                        <Form.Control
                            name='whatsApp'
                            type="text"
                            placeholder="Enter whatsapp number"
                            value={personalDetails.whatsApp}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Facebook</Form.Label>
                        <Form.Control
                            name='facebook'
                            type="text"
                            placeholder="Enter Facebook ID"
                            value={personalDetails.facebook}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Linked In</Form.Label>
                        <Form.Control
                            name='linkedIn'
                            type="text"
                            placeholder="Enter Linked in ID"
                            value={personalDetails.linkedIn}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                            aria-label="Employment Status"
                            name='employmentStatus'
                            onChange={handleChange}
                            value={personalDetails.employmentStatus}
                        >
                            <option>Select Employmental Status</option>
                            <option value="employed">Employed</option>
                            <option value="unEmployed">Un-Employed</option>
                            <option value="business">Business</option>
                            <option value="on-board">On Board</option>
                        </Form.Select>
                    </Form.Group>

                    <Button variant="info" type='submit'>
                        Update
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditPersonalModal;