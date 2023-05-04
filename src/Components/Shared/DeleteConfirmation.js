import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DeleteConfirmation = ({data, handleDelete, setDelete}) => {
    return (
        <Modal show={data} onHide={()=>setDelete('')}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are You Sure? You want To Delete!</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={()=>{
                    handleDelete(data)
                    setDelete('')
                }}>
                    Yes
                </Button>
                <Button variant="info" onClick={()=>setDelete('')}>
                    No
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteConfirmation;