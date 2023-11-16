import React from 'react'
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function AlertConfirmation({setAlertOpen, setDelete}) {
  const handleClick = () =>{
    setAlertOpen(false);
    setDelete(true);
  }
  return (
    <Alert  variant="warning">
        <Alert.Heading>Are You Realy Want to Delete this Group?</Alert.Heading>
        <p className='text-danger fw-bold'>
          If you confirm once, this group and all messages will delete permanently from your chat.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button variant='outline-danger' className='me-2' onClick={handleClick}>Delete</Button>
          <Button onClick={()=>setAlertOpen(false)} variant="outline-success">
            Close me
          </Button>
        </div>
      </Alert>

  )
}

export default AlertConfirmation