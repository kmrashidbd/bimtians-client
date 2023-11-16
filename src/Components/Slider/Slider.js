import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const Slider = ({data}) => {
    return (
        <Carousel>
            {
                data?.map(item=><Carousel.Item key={item.img}>
                    <img
                        className="d-block w-100"
                        src={item.img}
                        alt={item.alt}
                        height='450px'
                    />
                    <Carousel.Caption>
                        {
                            item.title && <h3>{item.title}</h3>
                        }
                    </Carousel.Caption>
                </Carousel.Item>)
            }
        </Carousel>
    );
};

export default Slider;