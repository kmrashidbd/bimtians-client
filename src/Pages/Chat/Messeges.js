import React, { useEffect, useState } from 'react'
import ReactScrollableFeed from "react-scrollable-feed";
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Female from "../../assets/images/female.jpg";
import Male from "../../assets/images/male.png";

function Messeges({handleSubmit, loggedInStudent, message, setMessage, messages}) {
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
 
// console.log(messages)

  return (
    <div className='mt-2' data-bs-scroll="true" >
        <div >
            {
              messages?.length>0 ? messages?.map(msg=><div
                key={msg?.id}
                className={msg?.sender?.name  ? (msg?.sender?.name === loggedInStudent?.name ? 'text-end': 'd-flex align-items-center'): ''}
                >
                  {
                    msg?.sender?.name !== loggedInStudent?.name && <Image src={msg?.sender?.photo ? msg?.sender?.photo : msg?.sender?.gender === "male" ? Male : Female} alt={msg?.sender?.name} width={40} roundedCircle/>
                  }                  
                  <p>
                    <span className={`p-2 rounded bg-primary text-white opacity-75`}>{msg?.message}</span>
                  </p>
                </div>) : <h6 className='text-center text-danger fw-bold my-4'>No Message Found</h6>
            }
        </div>
        <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-1">
                    <Form.Label>Write Message:</Form.Label>
                    <Form.Control value={message}  required as="textarea" rows={3} onChange={(e) => setMessage(e.target.value)} placeholder='Type Your Message' />
                </Form.Group>
                <div className='d-flex justify-content-end'><input type='submit' className='btn btn-info text-white' value='Send' /></div>
            </Form>
    </div>
  )
}

export default Messeges