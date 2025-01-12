import React, { useEffect } from "react";
import Slider from "react-slick";
import { Icon } from "@iconify/react/dist/iconify.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./home.scss";
import { styled } from "@mui/material";
import HomeSlider1 from "../../../components/Home/Home-slider_1";
import LatestsProducts from "../../../components/Home/Latest_Products";
import { fetchUserDetails } from "../../../redux/userSide/action/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Container = styled("div")`
  min-height: 100vh;
  width: 100%;
  position: relative;
`;


function HomePage() {
  const dispatch = useDispatch();
  const {user, isLogged} = useSelector((state) => state.auth)
  console.log(user,'userhome');
  


  useEffect(()=>{
    dispatch(fetchUserDetails())
  },[])
  

  return (
    <Container className="py-5 bg-white">
     <HomeSlider1 />

     {/* latest products start ====== */}
     <LatestsProducts />
    </Container>
  );
}

export default HomePage;
