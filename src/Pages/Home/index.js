import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Slider from '../../Components/Slider/Slider';
import LoginComp from '../../Pages/Login/LoginComp';
import Campus from '../../assets/images/Campus.jpeg';
import Rainy from '../../assets/images/Rainy.jpeg';
import Jetty from '../../assets/images/bimt_jetty_gate_new.jpg';
import Welcome from '../../assets/images/welcome.gif';

const Home = () => {
    const token = localStorage.getItem('authToken');
    const sliderData = [
        {
            img: Campus,
            title: 'BIMT Campus',
            alt: 'campus'
        },
        {
            img: Jetty,
            title: 'BIMT Gate',
            alt: 'jetty'
        },
        {
            img: Rainy,
            title: 'BIMT Rainy Time',
            alt: 'rainy'
        }
    ];
    return (
        <div className='my-2'>
            <Row xs={1} md={2} className="g-4">
                <Col md={7}>
                    <Slider data={sliderData} />
                </Col>
                <Col md={5} className='d-flex align-items-center justify-content-center'>
                    {!token ? <LoginComp /> : <img className='img-fluid' src={Welcome} alt='Welcome' />}
                </Col>
            </Row>
        </div>
    );
};

export default Home;