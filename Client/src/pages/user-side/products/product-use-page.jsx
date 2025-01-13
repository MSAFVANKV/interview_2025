import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchSingleProduct } from "../../../redux/userSide/action/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ProductCardImg from "./product_card_img";
import "./userProd.scss";

function ProductUsePage() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (products && products.thumbnail && products.thumbnail.length > 0) {
      setSelectedImage(products.thumbnail[0]); // Default to first image
    }
  }, [products]);

  const handleImageClick = (imgUrl) => {
    setSelectedImage(imgUrl);
  };

  // Handle the case where `products` is still being fetched or not available
  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-container">
      <div className="product-img">
        {selectedImage && <ProductCardImg image={selectedImage} />}

        <Box className="thumbnail-container">
          {/* Safely check if variations and photos are available */}
          {products?.variations?.length > 0 &&
            products.variations[0]?.photos?.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Variation ${index}`}
                className="thumbnail-image"
                onClick={() => handleImageClick(photo)}
              />
            ))}
        </Box>
      </div>

      <div className="product-details">
        <Typography variant="h4">{products.productName}</Typography>
        <Typography variant="body1">{products.description}</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Price: ₹{products.mrp}</Typography>
          </Grid>
        </Grid>
        {/* == */}
        {/* variant images===== */}
        <Grid item xs={12} md={6}>
           {
              products.variations.map((variation,idx) =>(
                <Box key={idx}>
                  {
                  variation.photos.map((photos,idx)=>(
                    <img key={idx} src={photos} alt={`Variation ${idx}`}
                    style={{
                      width:"40px",
                      height:"40px",
                      objectFit:"cover",
                      borderRadius:"5px",
                      margin:"5px"
                    }}
                    />
                  ))
                  }

                </Box>
              ))
           }
          </Grid>
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              bgcolor: "green",
            }}
          >
            Add to Cart
          </Button>
        </Grid>
        {/* <Box mt={2}>
          <Typography variant="h6">Special Features:</Typography>
          <Typography>{products.specialFeatures}</Typography>
        </Box> */}
      </div>
    </div>
  );
}

export default ProductUsePage;
