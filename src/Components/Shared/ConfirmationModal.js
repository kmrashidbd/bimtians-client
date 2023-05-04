import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ConfirmationModal = ({ modalData, setModalOpen, action, title, text }) => {
    return (
        <Modal show={modalData} onHide={()=>setModalOpen('')}>
            <Modal.Header closeButton>
                <Modal.Title>{title} Confirmation Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are You Really Want To {text}?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>setModalOpen('')}>
                    No
                </Button>
                <Button variant="primary" onClick={()=>{
                    action(modalData)
                    setModalOpen('')
                }}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmationModal;