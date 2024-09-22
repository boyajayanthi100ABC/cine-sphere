import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import "./Carousel.css";
import axios from 'axios';

const handleDragStart = (e) => e.preventDefault();



const Carousel = ({id}) => {
    const [credits, setCredits] = useState();
    const items = credits?.map((c) => (
        <div className="carouselItem">
        <img src="path-to-img" onDragStart={handleDragStart} role="presentation" className="carouselItem__img"/>,
         {/* <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
         <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />, */}
        </div>
    ));

    const responsive = {
        0: {
          items: 3,
        },
        512: {
          items: 5,
        },
        1024: {
          items: 7,
        },
      };

    const fetchCredits = async () => {
        const {data} = await axios.get();
        setCredits(data.cast);
    }

    useEffect(() => {
        // fetchCredits();
    }, []);

return <AliceCarousel 
autoPlay 
responsive={responsive}
infinite 
disableDotsControls
disableButtonsControls
mouseTracking items={items} />;

}

export default Carousel;