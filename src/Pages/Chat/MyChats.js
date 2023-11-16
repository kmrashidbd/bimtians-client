import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useCreateGroupChatMutation, useFetchChatQuery } from '../../features/api/chatApi';
import Loading from '../../Components/Shared/Loading';
import {toast} from 'react-toastify';
import MessageModal from '../../Components/Shared/MessageModal';
import ScrollableFeed from "react-scrollable-feed";

export default function MyChats({loggedInStudent, setSelectedChat}) {
  const {data, isLoading} = useFetchChatQuery();
  const [showModal, setShowModal] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [createGroupChat, {isLoading: groupChatLoading, isSuccess: groupChatSuccess}] = useCreateGroupChatMutation();
  const handleSubmit = async () =>{
    if(!groupChatName){
      toast.error("Please Add Group Name")
    }else if(!selectedUsers || selectedUsers.length<2){
      toast.error("Please Add 2 or more BIMTians")
    }else{
      const userIds = selectedUsers.map(st=>st.id);
      await createGroupChat({
        name: groupChatName,
        users: JSON.stringify(userIds)
      })   
      setShowModal(false) 
    }
  };
  useEffect(()=>{
    setGroupChatName("")
    setSelectedUsers([])
  },[groupChatSuccess])
  if(isLoading || groupChatLoading){
    return <Loading />
  };
  // console.log(data)
  return (
      <div className='mt-2 bg-secondary p-2 rounded'>
        <div className='d-flex justify-content-between mb-2 align-items-center'>
          <h6 className='text-decoration-underline text-light'>My Chats</h6>
          <button className='btn btn-info' onClick={()=>setShowModal(true)}>Create Group Chat</button>
        </div>
        <Card>
          <ListGroup variant="flush">
          <ScrollableFeed>
            {
              data?.length > 0 ? data?.map(chat=><ListGroup.Item key={chat?.id} style={{cursor: "pointer"}} onClick={()=>setSelectedChat(chat)}>
                {chat?.isGroupChat ? chat?.groupName : loggedInStudent?.email === chat?.receiver?.email ? chat?.sender?.name : chat?.receiver?.name}
                <p className='fs-6 fw-lighter'>{chat?.latest_message ? chat?.latest_message?.senderName : "No Message Found"}</p>
                <p className='fst-italic'>{chat?.latest_message?.message.length > 50 ? chat?.latest_message?.message.substring(0, 51) + "..." : chat?.latest_message?.message}</p>
              </ListGroup.Item>) : <h5 className='text-center'>There are no chat</h5>
            }
            </ScrollableFeed>
          </ListGroup>
        </Card>
        {
          showModal && <MessageModal 
                          showModal={showModal} 
                          setShowModal={setShowModal} 
                          setGroupChatName={setGroupChatName}
                          selectedUsers={selectedUsers}
                          setSelectedUsers={setSelectedUsers}
                          handleSubmit={handleSubmit}
                        />
        }
      </div>
  )
}
