import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2"; // Import Grid for layout
import { Box, IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/userSide/action/cartSlice";

const products = [
  {
    id: 1,
    title: "Lizard",
    amount: "300",
    mrp: "500",
    discount: "100",
    discounttype: "amount",
    description:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
    image: "/static/images/cards/contemplative-reptile.jpg",
  },
  {
    id: 2,
    title: "Iguana",
    amount: "300",
    mrp: "500",
    discount: "100",
    discounttype: "amount",
    description:
      "Iguanas are herbivorous lizards native to Central and South America, often found in tropical rainforests.",
    image: "/static/images/cards/iguana.jpg",
  },
  {
    id: 3,
    title: "Gecko",
    amount: "300",
    mrp: "500",
    discount: "100",
    discounttype: "amount",
    description:
      "Geckos are small, mostly nocturnal reptiles known for their vocalizations and ability to climb smooth surfaces.",
    image: "/static/images/cards/gecko.jpg",
  },
  {
    id: 4,
    title: "Chameleon",
    amount: "300",
    mrp: "500",
    discount: "100",
    discounttype: "amount",
    description:
      "Chameleons are a distinctive and highly specialized clade of Old World lizards with the ability to change color.",
    image: "/static/images/cards/chameleon.jpg",
  },
];

export default function LatestsProducts() {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    console.log(product,'add cart');
    
    dispatch(
      addToCart({
        id: product.id,
        name: product.title,
        mrp:product.mrp,
        amount: product.amount,
        quantity: 1, // Default quantity
      })
    );
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
        gap: "15px",
      }}
    >
      <Typography variant="h5" component="h2">
        Latests Products
      </Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid container xs={12} sm={6} md={2} key={product.id}>
            <Card sx={{ maxWidth: 310, minWidth: 300 }}>
              <CardMedia
                component="img"
                alt={product.title}
                height="140"
                image={product.image}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{ textDecoration: "line-through", color: "gray" }}
                  >
                    ₹{product.mrp}
                  </Typography>
                  <Typography gutterBottom variant="body2" component="div">
                    ₹{product.amount}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="div"
                    color="green"
                  >
                    {product.discounttype === "amount" ? "₹" : "$"}
                    {product.discount}
                  </Typography>
                </Box>
                {/* <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {product.description}
                </Typography> */}
              </CardContent>
              <CardActions>
                {/* <Button size="small">Share</Button> */}
                {/* <Button size="small">Learn More</Button> */}
                <IconButton color="primary" aria-label="add to shopping cart"
                sx={{
                    width:"100%",
                    border:"1px solid #ccc",
                    padding:"0.5rem",
                    borderRadius:"10px"
                }}
                onClick={() => handleAddToCart(product)}
                >
                  <AddShoppingCartIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
