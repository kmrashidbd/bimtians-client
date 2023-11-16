import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Audio from "../../assets/images/audio_call.jpg";
import Video from "../../assets/images/video_call.jpg";
import { useNavigate } from "react-router-dom";

function CallConfarmModal({ showModal, setShowModal }) {
    const navigate = useNavigate();
    const handleClick = (state) =>{
        setShowModal({})
        navigate(`/calling/${showModal.id}`, {state})
    };
  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal({})}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Please Select Here
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column">
          <Button onClick={()=>handleClick("video")}><Image src={Video} width={30}/> Video Call</Button>
          <Button onClick={()=>handleClick("audio")} className="btn btn-info my-2"> <Image src={Audio} width={30}/> Audio Call</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default CallConfarmModal;
