import React from 'react'
import { styled } from "@mui/material";
import Slider from "react-slick";
import { Icon } from "@iconify/react/dist/iconify.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Container = styled("div")`
//   min-height: 100vh;
  width: 100%;
  position: relative;
`;

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow custom-next" onClick={onClick}>
      <Icon icon="si:arrow-right-duotone" fontSize={25} />
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow custom-prev" onClick={onClick}>
      <Icon icon="si:arrow-left-duotone" fontSize={25} />
    </div>
  );
};


function HomeSlider1() {
    const images = [
        { src: "https://placehold.co/800x400", alt: "Banner 1" },
        { src: "https://placehold.co/800x400", alt: "Banner 2" },
        { src: "https://placehold.co/800x400", alt: "Banner 3" },
        { src: "https://placehold.co/800x400", alt: "Banner 4" },
        { src: "https://placehold.co/800x400", alt: "Banner 5" },
        { src: "https://placehold.co/800x400", alt: "Banner 6" },
      ];
    
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
      };
  return (
    <Container className="py-5 bg-white">
    <div className="slider-container ">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image.src} alt={image.alt} className="slider-image" />
          </div>
        ))}
      </Slider>
    </div>
  </Container>
  )
}

export default HomeSlider1