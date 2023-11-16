import React, { createRef, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import StudentList from "./StudentList";
import MyChats from "./MyChats";
import NotSelected from "./NotSelected";
import Messeges from "./Messeges";
import { useSelector } from "react-redux";
import {
  useAccessChatMutation,
  useGetAllMessageQuery,
  useGetChatByIdQuery,
  useGetGroupChatUserQuery,
  useGetNotificationQuery,
  usePostNotificationMutation,
  useSendMessageMutation,
} from "../../features/api/chatApi";
import Gear from "../../assets/images/gear.png";
import SettingModal from "../../Components/Shared/SettingModal";
import io from "socket.io-client";
import { host } from "../../Components/Shared/host";
import Loading from "../../Components/Shared/Loading";
import Notification from "../../Components/Notification/Notification";
import BackButton from '../../assets/images/back_button.svg';
import Image from "react-bootstrap/Image";
import Call from "../../assets/images/call.png";
import CallConfarmModal from "../../Components/modals/CallConfarmModal";

let socket, selectedChatCompare;

export default function () {
  const [messages, setMessages] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedChat, setSelectedChat] = useState({});
  const [settingModal, setSettingModal] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const { loggedInStudent } = useSelector((state) => state.student);
  const [accessChat] = useAccessChatMutation();
  const [sendMessage, { data: sendedData, isSuccess: sendedSuccess }] = useSendMessageMutation();
  const { data: chat, isLoading } = useGetChatByIdQuery(selectedChat.id);
  const [message, setMessage] = useState("");
  const { data, isSuccess, refetch } = useGetAllMessageQuery(selectedChat?.id);
  const [postNotification] = usePostNotificationMutation();
  const {data: notifications, isLoading: notificationLoading, refetch: notificationRefetch} = useGetNotificationQuery(loggedInStudent?.id);
  const [isCalling, setCalling] = useState({});
  useEffect(() => {
    if (isSuccess) {
      setMessages(data);
    }
  });
  useEffect(() => {
    if (sendedSuccess) {     
      const newMessage = {
        ...sendedData,
        sender: selectedChat?.sender?.name,
        isGroupChat: selectedChat?.isGroupChat,
        groupName: selectedChat?.groupName,
      }; 
      socket.emit("new message", newMessage);
      postNotification(newMessage);
      setMessages([...messages, sendedData]);      
    }
  }, [sendedSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    if (selectedChat?.id) {
      sendMessage({
        chatId: selectedChat?.id,
        message,
      });
    }
  };
  useEffect(() => {
    socket = io(host);
    socket.emit("setup", loggedInStudent);
    socket.on("connected", (users) => {
      setOnlineUsers(users)
    });
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, [loggedInStudent]);

  useEffect(() => {
    if (selectedStudent?.id) {
      accessChat(selectedStudent?.id);
    }
  }, [selectedStudent?.id]);
  useEffect(() => {
    socket.emit("join chat", selectedChat.id);
    selectedChatCompare = selectedChat;
  }, [selectedChat]);
  useEffect(() => {
    socket.on("message recieved", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare.id !== newMessageReceived.chat
      ) {
        const exists = notifications?.find(not=>not.chatId === newMessageReceived.chat);
        if (!exists) {          
          notificationRefetch();
        }else{
          console.log('already added')
        }
      } else {
        refetch();
      }
    });
  });
  const handleSetting = (chat) => {
    setSettingModal(true);
  };
  if (isLoading || notificationLoading) {
    return <Loading />;
  }
  // console.log(socketConnected)
  return (
    <div className="my-2">
      <Row>
        <Col sm="3" className={`${selectedChat?.id ? 'd-none':'d-block'} d-lg-block mx-2`}>
          <StudentList
            selectedStudent={selectedStudent}
            setSelectedStudent={setSelectedStudent}
            onlineUsers={onlineUsers}
          />
          <MyChats
            setSelectedChat={setSelectedChat}
            loggedInStudent={loggedInStudent}
          />
        </Col>
        <Col sm="8" className={`${selectedChat?.id ? 'd-block':'d-none'} d-lg-block`}>
          <div className="d-flex justify-content-evenly">
            <Image onClick={()=>setSelectedChat({})} src={BackButton} alt="back" width={40} className="d-lg-none" style={{cursor: "pointer"}}/>
            <h5>
              {selectedChat?.id && selectedChat?.isGroupChat
                ? chat?.groupName
                : loggedInStudent?.email === selectedChat?.receiver?.email
                ? selectedChat?.sender?.name
                : selectedChat?.receiver?.name}
            </h5>
            <h4 className="text-center text-decoration-underline d-none d-lg-block">
              BIMTians Talker
            </h4>
            {/* {selectedChat?.id && <Image src={Call} width={40} style={{ cursor: "pointer"}} onClick={()=>setCalling(selectedChat)}/>} */}
            <Notification notifications={notifications} setSelectedChat={setSelectedChat} />
            {selectedChat?.isGroupChat && (
              <img
                onClick={() => handleSetting(selectedChat)}
                style={{ cursor: "pointer" }}
                src={Gear}
                width="40px"
              />
            )}
          </div>
          {selectedChat?.id ? (
            <Messeges
              selectedStudent={selectedStudent}
              notifications={notifications}
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              handleSubmit={handleSubmit}
              loggedInStudent={loggedInStudent}
              message={message}
              messages={messages}
              setMessage={setMessage}
            />
          ) : (
            <NotSelected />
          )}
        </Col>
      </Row>
      {settingModal && (
        <SettingModal
          showModal={settingModal}
          setShowModal={setSettingModal}
          chat={selectedChat}
        />
      )}
      {
        isCalling.id && <CallConfarmModal socket={socket} showModal={isCalling} setShowModal={setCalling}/>
      }
    </div>
  );
}
