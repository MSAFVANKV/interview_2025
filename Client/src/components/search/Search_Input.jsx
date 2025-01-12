import React, { useState } from "react";
import { IconButton } from "@mui/material";
import styled from "@emotion/styled"; // Use @emotion/styled for styling
import LocalMallIcon from "@mui/icons-material/LocalMall";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MyInput from "../myUi/MyInput";
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
        <IconButton>
          <LocalMallIcon sx={{ color: "white" }} />
        </IconButton>
        <IconButton>
          <FavoriteIcon sx={{ color: "white" }} />
        </IconButton>
      </IconButton>
    </Container>
  );
}

export default SearchInput;
