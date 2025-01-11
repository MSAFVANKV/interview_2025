import { CardMedia, styled } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import React from "react";

const Container = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 10px;
   @media (max-width: 960px) {
    display: none;  /* Hides container on screens smaller than md (960px) */
  }
`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
//   borderRadius:"100%",
  cursor:"pointer",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const CategoryImage = styled(CardMedia)`
  height: 100%;
  width: 100%;
  aspect-ratio: 1;  /* Ensures the image is square */
  object-fit: cover;
`;

function CategoyBar() {
  const categories = [
    { image: "https://placehold.co/400x300", name: "Category 1" },
    { image: "https://placehold.co/400x300", name: "Category 2" },
    { image: "https://placehold.co/400x300", name: "Category 3" },
    { image: "https://placehold.co/400x300", name: "Category 4" },
    { image: "https://placehold.co/400x300", name: "Category 5" },
    { image: "https://placehold.co/400x300", name: "Category 6" },
    
  ];

  return (
    <Container>
      <Box>
        <Grid container spacing={2}>
          {categories.map((category, index) => (
            <Grid item xs={2} key={index}>
              <Item>
                <CategoryImage image={category.image} title={category.name} />
                <div
                style={{
                    fontSize:"10px",
                    textAlign:"center",
                    marginTop:"3px"
                }}
                >{category.name}</div>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default CategoyBar;
