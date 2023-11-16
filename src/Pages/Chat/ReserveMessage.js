import React from 'react';
import Form from 'react-bootstrap/Form';
import Loading from '../../Components/Shared/Loading';

const ReservedMesseges = ({ setMessage, handleSubmit, data, isLoading, scrollRef }) => {
    if (isLoading) {
        return <Loading />
    }
    return (
        <div data-bs-spy="scroll">
            <div ref={scrollRef}>
                {data.length > 0 ? data?.map(msg => <p
                    className={msg.fromSelf.toString() === "true" && 'text-end'}
                    key={msg.msg}>
                    <span
                        className={`${msg.fromSelf.toString() === "true" ? 'bg-primary' : 'bg-secondary'} text-white px-2 rounded`}>
                        {msg.msg}
                    </span>
                </p>) : <p className='text-danger text-center fw-bold'>No Message Found</p>}
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-1" onChange={(e) => setMessage(e.target.value)}>
                    <Form.Label>Write Message:</Form.Label>
                    <Form.Control required as="textarea" rows={3} placeholder='Type Your Message' />
                </Form.Group>
                <div className='d-flex justify-content-end'><input type='submit' className='btn btn-primary' value='Send' /></div>
            </Form>
        </div>
    );
};

export default ReservedMesseges;