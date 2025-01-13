import { useEffect } from "react";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./home.scss";
import { styled } from "@mui/material";
import HomeSlider1 from "../../../components/Home/Home-slider_1";
import LatestsProducts from "../../../components/Home/Latest_Products";
import { fetchUserDetails } from "../../../redux/userSide/action/authSlice";
import { useDispatch } from "react-redux";

const Container = styled("div")`
  min-height: 100vh;
  width: 100%;
  position: relative;
`;


function HomePage() {
  const dispatch = useDispatch();
  // const {user} = useSelector((state) => state.auth)

  


  useEffect(()=>{
    dispatch(fetchUserDetails())
  },[dispatch])
  

  return (
    <Container className="py-5 bg-white">
     <HomeSlider1 />

     {/* latest products start ====== */}
     <LatestsProducts />
    </Container>
  );
}

export default HomePage;
