import { useState } from "react";

import styled from "@emotion/styled"; // Use @emotion/styled for styling

import MyInput from "../myUi/MyInput";

import AccountMenu from "../appBars/AccountMenu";
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
  // const {handleClick} = useNavigateClicks()
  // const cartItems = useSelector((state) => state.cart.items);

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };
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
          display: {
            md: "block",
          },
        }}
      />

      {/* 
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
        </IconButton> */}
      <AccountMenu />
    </Container>
  );
}

export default SearchInput;
