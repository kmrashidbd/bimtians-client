import React, { useEffect, useRef, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import Loading from '../../Components/Shared/Loading';
import { host } from '../../Components/Shared/host';
import { useAllMessageQuery, useSentMessageMutation } from '../../features/api/chatApi';
import Messeges from './Messeges';
import NotSelected from './NotSelected';
import StudentList from './StudentList';


const Chat = () => {
    const socket = useRef();
    const scrollRef = useRef();
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { loggedInStudent } = useSelector(state => state.student);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [currentMessages, setCurrentMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [sendMessage, { isLoading, isError, isSuccess, data, error }] = useSentMessageMutation();
    const { data: messages, isLoading: msgLoading, isSuccess: msgSuccess } = useAllMessageQuery(selectedStudent?.id);
    const handleSubmit = e => {
        e.preventDefault();
        sendMessage({ id: selectedStudent.id, message })
        e.target.reset()
        socket.current.emit('send-message', {
            receiver: selectedStudent.id,
            sender: loggedInStudent.id,
            msg: message
        })

        const msgs = [...messages];
        msgs.push({fromSelf: true, message})
        setCurrentMessages(msgs)
    }
    useEffect(() => {
        if (isSuccess) {
            console.log(data)
        }
        if (isError) {
            console.log(error)
        }
    }, [isSuccess, isError, data, error])
    useEffect(()=>{        
        if(msgSuccess){
            setCurrentMessages(messages)
        }
    },[messages, msgSuccess])
    useEffect(() => {
        if (loggedInStudent) {
            socket.current = io(host);
            socket.current.emit('add-user', loggedInStudent.id)
            socket.current.on('get-users', users=>{
                setOnlineUsers(users)
            })
        }
    }, [loggedInStudent])

    useEffect(()=>{
        if(socket.current){
            socket.current.on("msg-receive", (msg)=>{
                setArrivalMessage({fromSelf: false, message: msg})
            })
        }
    },[])

    useEffect(()=>{
        arrivalMessage && setCurrentMessages((prev)=>[...prev, arrivalMessage])
    },[arrivalMessage])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour: 'smooth'})
    },[messages])

    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <h4 className='text-center text-decoration-underline'>Chating Page</h4>
            <Row>
                <Col sm='3' className='mx-2 sticky-top'>
                    <StudentList selectedStudent={selectedStudent} setSelectedStudent={setSelectedStudent} onlineUsers={onlineUsers} />
                </Col>
                <Col sm='8' data-bs-spy="scroll">
                    {
                        selectedStudent ? <Messeges selectedStudent={selectedStudent} setMessage={setMessage} handleSubmit={handleSubmit} socket={socket} data={currentMessages} isLoading={msgLoading} scrollRef={scrollRef} /> : <NotSelected />
                    }
                </Col>
            </Row>
        </div>
    );
};

export default Chat;