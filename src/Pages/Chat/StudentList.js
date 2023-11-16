import React, { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Offcanvas from "react-bootstrap/Offcanvas";
import Loading from "../../Components/Shared/Loading";
import Female from "../../assets/images/female.jpg";
import Male from "../../assets/images/male.png";
import { useGetAllStudentQuery } from "../../features/api/chatApi";
import { toast } from "react-toastify";

const StudentList = ({ selectedStudent, setSelectedStudent, onlineUsers }) => {
  const { data, isError, error, isLoading, isSuccess } =
    useGetAllStudentQuery();
  const [students, setStudents] = useState([]);
  const [show, setShow] = useState(false);
  const handleSubmit = (e) => {
    const result = data?.filter((student) =>
      student?.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setStudents(result);
  };
  const handleClick = (student) =>{
    if(student.id === selectedStudent?.id){
        toast.error("This BIMTIan already in your chat list")
    }else{
        setSelectedStudent(student)
        setShow(false)
    }    
  }
  useEffect(() => {
    if (isSuccess) {
      setStudents(data);
    }
    if (isError) {
      console.log(error);
    }
  }, [isError, error, data, isSuccess]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Button variant="primary" onClick={() => setShow(true)} className="me-2">
        Show Students
      </Button>
      <Offcanvas
        data-bs-scroll="true"
        show={show}
        onHide={() => setShow(false)}
      >
        <Offcanvas.Header
          closeButton
          className="d-flex flex-column align-items-start"
        >
          <Offcanvas.Title>Student List</Offcanvas.Title>
          <Form.Control
            className="my-2"
            onChange={handleSubmit}
            type="text"
            placeholder="Searh Student By Name"
            required
          />
        </Offcanvas.Header>
        <Offcanvas.Body>
          {students?.length > 0 ? (
            <ListGroup as="ul" className="sticky-top">
              {students?.map((student) => (
                <ListGroup.Item
                  variant="success"
                  active={student?.id === selectedStudent?.id}
                  as="li"
                  onClick={() => handleClick(student)}
                  key={student?.id}
                >
                  <Image
                    src={
                      student?.photo
                        ? student?.photo
                        : student?.gender === "male"
                        ? Male
                        : Female
                    }
                    width="35px"
                    thumbnail
                  />{" "}
                  {student?.name}{" "}
                  {onlineUsers?.find(
                    (user) => user?.userId === student?.id
                  ) && <Badge bg="info">Online</Badge>}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p className="fw-bold text-danger">No Student Found</p>
          )}
          <Button
            variant="secondary"
            onClick={() => setShow(false)}
            className="me-2 mt-2"
          >
            Close
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default StudentList;
