import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useChangePhotoMutation } from '../../features/api/studentApi';

const EditPhotoModal = (props) => {
    const [image, setImage] = useState('');
    const [changePhoto, { isSuccess, isError, error, data }] = useChangePhotoMutation();
    const handleSubmit = e => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('photo', image);
        changePhoto(formData)
    };
    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message)
            props.onHide();
        }
        if (isError) {
            toast.error(error?.data?.message)
        }
    }, [isSuccess, isError, data, error, props])
    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Change Photo
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formFileSm" className="mb-3">
                            <Form.Label>Please Select Your Photo (upto 1 mb & jpg/jpeg/png types only)</Form.Label>
                            <Form.Control onChange={(e) => setImage(e.target.files[0])} type="file" size="sm" required />
                            {image.size > 1000000 && <p className='text-danger'>Photo size maximum 1 mb.</p>}
                        </Form.Group>
                        <Button disabled={image.size > 1000000} variant="secondary" type="submit">
                            Upload
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default EditPhotoModal;