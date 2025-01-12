import React, { useState } from "react";
import { Badge, IconButton } from "@mui/material";
import styled from "@emotion/styled"; // Use @emotion/styled for styling
import LocalMallIcon from "@mui/icons-material/LocalMall";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MyInput from "../myUi/MyInput";
import useNavigateClicks from "../../hooks/navigate-clicks";
import { useSelector } from "react-redux";
// Styled container using @emotion/styled
const Container = styled("div")`
  display: flex;
  align-items: center;
  gap: 5px;
   @media screen and (max-width: 700px) {
    display: none;
  }
`;

function SearchInput() {
  const [value, setValue] = useState("");
  const {handleClick} = useNavigateClicks()
  const cartItems = useSelector((state) => state.cart.items);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Container>
      <MyInput
        label="Search"
        placeholder="Type here..."
        type="search"
        variant="outlined"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{
          backgroundColor: "white",
          "& .MuiOutlinedInput-root": {
            borderColor: "green",
          },
          display:{
            md:"block"
          }
        }}
      />

      <IconButton>
        <IconButton
        onClick={()=>{
          handleClick("/cart")
        }}
        >
            <Badge 
            badgeContent={cartItems.length} // Display the number of items in the cart
            color="secondary" // Badge color
          >
                <LocalMallIcon sx={{ color: "white" }} />
          </Badge>
     
        </IconButton>
        <IconButton
         onClick={()=>{
          handleClick("/wishlist")
        }}
        >
          <FavoriteIcon sx={{ color: "white" }} />
        </IconButton>
      </IconButton>
    </Container>
  );
}

export default SearchInput;
