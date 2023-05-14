import React from 'react';
import { Carousel } from 'antd';
import LogoImage from "../assets/splash_logo.png"


const ImageSlider = () => {
    return (
        <Carousel>
            <div>
                <img src={LogoImage} alt="Image 1" style={{width: "1018px", height: "400px"}} />
            </div>
            <div>
                <img src={LogoImage} alt="Image 2" />
            </div>
            <div>
                <img src={LogoImage} alt="Image 3" />
            </div>
        </Carousel>
    );
};

export default ImageSlider;