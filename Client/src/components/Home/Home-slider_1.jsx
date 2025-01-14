import React, { useEffect, useState } from 'react'
import { styled } from "@mui/material";
import Slider from "react-slick";
import { Icon } from "@iconify/react/dist/iconify.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Fetch_Banners_Api } from '../../routers/product-api';

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
    const [banners, setBanners] = useState([]);
    useEffect(() => {
      fetchBaners();
    }, []);
  
    const fetchBaners = async () => {
      try {
        const res = await Fetch_Banners_Api();
        if (res.status === 200) {
          const filterBanner = res.data.find((data)=>{return data.banner})
          console.log(filterBanner);
          
          setBanners(filterBanner.banner);
        }
      } catch (error) {
        console.log(error);
      }
    };
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
        autoplay: true,
        speed: 500,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
      };
  return (
    <Container className="py-5 bg-white">
    <div className="slider-container ">
      <Slider {...settings}>
        {banners.map((image, index) => (
          <div key={index}>
            <img src={image} alt={'as'} className="slider-image" />
          </div>
        ))}
      </Slider>
    </div>
  </Container>
  )
}

export default HomeSlider1