import React from 'react';
import { Carousel } from 'antd';
import LogoImage from "../assets/splash_logo.png"
import SideImage01 from "../assets/slide_image_01.png"
import SideImage02 from "../assets/slide_image_02.png"
import SideImage03 from "../assets/slide_image_03.png"
import "../style/ImageSlider.scss"


const ImageSlider = () => {
    return (
        <Carousel>
            <div className='ImageSlide' style={{ textAlign: 'center' }}>
                <img src={SideImage01} alt="Image 1"  className="center-image" />
            </div>
            <div className='ImageSlide'>
                <img src={SideImage02} alt="Image 2" className="center-image"/>
            </div>
            <div className='ImageSlide'>
                <img src={SideImage03} alt="Image 3" className="center-image"/>
            </div>
        </Carousel>
    );
};

export default ImageSlider;