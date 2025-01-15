import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchSingleProduct } from "../../../redux/userSide/action/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ProductCardImg from "./product_card_img";
import "./userProd.scss";
import { makeToast, makeToastError, makeToastWarning } from "../../../lib/helper";
import { addToCart } from "../../../redux/userSide/action/cartSlice";
import { fetchUserDetails } from "../../../redux/userSide/action/authSlice";

function ProductUsePage() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { isLogged } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // console.log(selectedImage,'selectedImage');
  

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (products?.variations?.length > 0) {
      setSelectedImage(products.variations[0]); // Default to the first variation
    }
  }, [products]);

  const handleImageClick = (imgUrl) => {
    setSelectedImage(imgUrl);
  };
  const handleSelectImg = (index) => {
    setActiveIndex(index);
  };

  // Handle the case where `products` is still being fetched or not available
    useEffect(()=>{
      dispatch(fetchUserDetails())
    },[dispatch])


  const handleAddToCart = async (product, sizeData) => {
  //  makeToastError('asdasd');
    
    if (!isLogged) {
      navigate("/login"); // Use navigate to redirect to login
      makeToastWarning("Please Login");
      return;
    }
    const { _id, productName, mrp, thumbnail } = product;
    const { size, finalPrice } = sizeData;

    try {
      // Dispatch action and wait for the result if it's a promise
      await dispatch(
        addToCart({
          id:_id,
          productName: productName,
          mrp,
          finalPrice: finalPrice,
          size,
          thumbnail:thumbnail,
          quantity: 1,
        })
      );
      // Make toast after the action is completed
      makeToast("Successfully added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      makeToastError("Failed to add to cart");
    }
  };

  if (!products) {
    return <div>Loading...</div>;
  }



  return (
    <div className="user-product-container">
      <div className="product-img">
        {selectedImage && <ProductCardImg image={selectedImage?.photos} activeIndex={activeIndex} />}

        <Box className="thumbnail-container">
          {/* Safely check if variations and photos are available */}
          {products?.variations?.length > 0 &&
           selectedImage?.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Variation ${index}`}
                className="thumbnail-image"
                onClick={() => handleSelectImg(index)}
              />
            ))}
        </Box>
      </div>

      <div className="product-details">
        <Typography variant="h4">{products.productName}</Typography>
        <Typography variant="body1">{products.description}</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" >Price: ₹{products.mrp}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2"> ₹{selectedImage?.sizeArray[0]?.finalPrice}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2"  color="green"> ₹{selectedImage?.sizeArray[0]?.discount}</Typography>
          </Grid>
        </Grid>
        {/* == */}
        {/* variant images===== */}
        <Grid item xs={12} md={6} display="flex" flexWrap="wrap">
          {
            products.variations.map((variation, idx) => (
              <Box key={idx}>
                <img key={idx} src={variation?.photos[0]} alt={`Variation ${idx}`}
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "cover",
                    borderRadius: "5px",
                    margin: "5px",
                    border: selectedImage?._id === variation._id ? `2px solid ${variation.colorCode}` : "none",
                  }}

                  onClick={()=>{
                    handleImageClick(variation)
                  }}
                />

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
            onClick={() => {
              if (selectedImage?.sizeArray?.length > 0) {
                handleAddToCart(products, selectedImage?.sizeArray[0]);
              } else {
                makeToastError("No size data available for this variation.");
              }
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
