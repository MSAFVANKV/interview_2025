
import { Box } from "@mui/material";

function ProductCardImg({ image,activeIndex }) {
  return (
    <Box>
      <img src={image[activeIndex]} alt="Main Product" className="main-product-image" />
    </Box>
  );
}

export default ProductCardImg;
