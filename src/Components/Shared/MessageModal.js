import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useGetAllStudentQuery } from '../../features/api/chatApi';
import ListGroup from 'react-bootstrap/ListGroup';
import Loading from './Loading';
import { toast } from 'react-toastify';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';

function MessageModal({showModal, setShowModal, setGroupChatName, handleSubmit, selectedUsers, setSelectedUsers}) {
    const [search, setSearch] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const { data, isLoading } = useGetAllStudentQuery();
    const handleSearch = (value) =>{
        const result = data?.filter(student => student?.name.toLowerCase().includes(value.toLowerCase()));
        setSearchResult(result)
        setSearch(true)
    };
    const handleGroup = student =>{
      if(selectedUsers.includes(student)){
        toast.error('Student Already Added')
      }else{
        setSelectedUsers([...selectedUsers, student])
      }
    };
    const handleRemove = student =>{
      const newStudentList = selectedUsers.filter(st=>st.id !== student.id);
      setSelectedUsers(newStudentList)
    }
    if(isLoading){
        return <Loading />
    }
  return (
    <Modal
      show={showModal} 
      onHide={() => setShowModal(false)}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Group Chat
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Group Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Group Name" onChange={(e) => setGroupChatName(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Search BIMTians</Form.Label>
        <Form.Control type="text" placeholder="Bimtians Name" onChange={(e) => handleSearch(e.target.value)}/>
      </Form.Group>
        {
            searchResult.length>0 && <ListGroup as="ul" className='sticky-top'>
            {
                searchResult?.filter(st=>!selectedUsers.includes(st)).slice(0,5).map(student => <ListGroup.Item 
                                                                                                    variant='success' 
                                                                                                    onClick={()=>handleGroup(student)}  
                                                                                                    as="li" 
                                                                                                    key={student?.id}
                                                                                                  >{student?.name} </ListGroup.Item>)
            }
        </ListGroup>
        }
        <Stack direction="horizontal" gap={2}>
          {selectedUsers?.map(st=><Badge key={st.id} bg="primary">{st.name} <button 
                                                                                onClick={()=>handleRemove(st)} 
                                                                                className='btn btn-xs btn-danger'
                                                                              >x</button></Badge>)}
        </Stack>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Create Group Chat</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default MessageModal