
import { Box } from "@mui/material";

function ProductCardImg({ image }) {
  return (
    <Box>
      <img src={image} alt="Main Product" className="main-product-image" />
    </Box>
  );
}

export default ProductCardImg;
