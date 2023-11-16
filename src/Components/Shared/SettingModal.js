import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from "react-router-dom";
import {
  useAddGroupChatUserMutation,
  useDeleteChatUserMutation,
  useDeleteGroupMutation,
  useGetAllStudentQuery,
  useGetChatByIdQuery,
  useGetGroupChatUserQuery,
  useUpdateGroupMutation,
} from "../../features/api/chatApi";
import Loading from "./Loading";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import AlertConfirmation from "./AlertConfirmation";

function SettingModal({ showModal, setShowModal, chat }) {
  const { loggedInStudent } = useSelector((state) => state.student);
  const [searchResult, setSearchResult] = useState([]);
  const [waitingList, setWaitingList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupChatName, setGroupChatName] = useState("");
  const [isDelete, setDelete] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const { data: students, isLoading } = useGetAllStudentQuery();
  const [updateGroup] = useUpdateGroupMutation();
  const [deleteChatUser] = useDeleteChatUserMutation();
  const [addGroupChatUser] = useAddGroupChatUserMutation();
  const {data: chatData, isLoading: chatDataLoading, isSuccess} = useGetChatByIdQuery(chat.id);
  const [deleteGroup] = useDeleteGroupMutation();
  const { data, isLoading: groupUserLoading } = useGetGroupChatUserQuery( chat.id );
  const handleSearch = (value) => {
    if (value.length > 0) {
      const result = students?.filter((student) =>
        student?.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResult(result);
    } else {
      setSearchResult([]);
    }
  };
  const handleSelectUser = (student) => {
    const exist = data?.find((st) => st.student.id === student.id);
    if (exist) {
      toast.warn("BIMTians already added");
    } else {
      if(!waitingList.includes(student)){
        setWaitingList([...waitingList, student])
      }else{
        toast.warn("BIMTians already added in waiting list");
      }
    }
  };
  const handleSubmit = () => {
    if(waitingList.length>0){
      waitingList.forEach(student=>{
        addGroupChatUser({ user: student.id, chatId: chat.id })
        // setSelectedUsers([...selectedUsers, student]);
      })
      setWaitingList([]);
    }else{
      toast.error('something wrong!')
    }
  };
 
  const handleWaitingList = student =>{
    const newList = waitingList.filter(st=>st.id !== student.id);
    setWaitingList(newList)
  }
  const handleRemove = (student) => {
    if (loggedInStudent?.id === student.id) {
      toast.error("You cannot remove your self");
    }else{
      deleteChatUser({id: student.id, chatId: chat.id})
    }
  };
  useEffect(()=>{
    if(isDelete){
      deleteGroup(chat?.id);
      setShowModal(false);
      window.location.reload();
    }
  },[isDelete])
  useEffect(()=>{
    if(isSuccess){
      setGroupChatName(chat?.groupName)
    }
  },[isSuccess])
 
  const handleDeleteGroup = (id) => {
    setAlertOpen(true);
  }
  if (isLoading || groupUserLoading || chatDataLoading) {
    return <Loading />;
  }
  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
    {isAlertOpen && <AlertConfirmation setAlertOpen={setAlertOpen} setDelete={setDelete} />}
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {chatData?.groupName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group
          className="mb-3 d-flex "
          controlId="exampleForm.ControlInput1"
        >
          <Form.Control
            type="text"
            placeholder="Enter Group Name"
            value={groupChatName}
            onChange={(e) => setGroupChatName(e.target.value)}
          />
          <Button className="ms-2" onClick={()=>updateGroup({id:chat.id, name: {name: groupChatName}})}>Update</Button>
        </Form.Group>
        {loggedInStudent.id === chat.groupAdminId && (
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Search BIMTians to Add this Group</Form.Label>
            <Form.Control
              type="text"
              placeholder="Bimtians Name"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </Form.Group>
        )}
        {searchResult.length > 0 && (
          <ListGroup as="ul" className="sticky-top">
            {searchResult
              ?.filter((st) => !data.includes(st))
              .map((student) => (
                <ListGroup.Item
                  variant="success"
                  onClick={() => handleSelectUser(student)}
                  as="li"
                  key={student?.id}
                  style={{cursor: 'pointer'}}
                >
                  {student?.name}{" "}
                </ListGroup.Item>
              ))}
          </ListGroup>
        )}
        {
          waitingList.length>0 && <>
            <p>Waiting List</p>
            <Stack direction="horizontal" gap={2}>
          {waitingList?.map((st) => (
            <Badge key={st.id} bg="primary">
              <Link
                to={`/bimtian/${st?.name.replace(/\s+/g, "-")}?${
                  st?.id
                }`}
              >
                <span className="text-white">{st?.name}</span>
              </Link>
              {loggedInStudent.id === chat.groupAdminId && (
                <button
                  onClick={() => handleWaitingList(st)}
                  className="btn btn-xs btn-danger"
                >
                  x
                </button>
              )}
            </Badge>
          ))}
        </Stack>
          </>
        }
        <p>Group Users List</p>
        <Stack direction="horizontal" gap={2}>
          {data?.map((st) => (
            <Badge key={st.student.id} bg="primary">
              <Link
                to={`/bimtian/${st?.student?.name.replace(/\s+/g, "-")}?${
                  st?.student?.id
                }`}
              >
                <span className="text-white">{st?.student?.name}</span>
              </Link>
              {loggedInStudent.id === chat.groupAdminId && (
                <button
                  onClick={() => handleRemove(st.student)}
                  className="btn btn-xs btn-danger"
                >
                  x
                </button>
              )}
            </Badge>
          ))}
        </Stack>
      </Modal.Body>
      <Modal.Footer>
        {loggedInStudent?.id === chat.groupAdminId && (
          <>
            {waitingList.length>0 && <Button onClick={handleSubmit}>Add To Group</Button>}
            <Button className="btn btn-danger" onClick={()=>handleDeleteGroup(chat.id)}>Delete Group</Button>
          </>
        )}
        {loggedInStudent.id !== chat.groupAdminId && (
          <Button
            className="btn btn-danger"
            onClick={() => console.log("leave clicked")}
          >
            Leave
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default SettingModal;
