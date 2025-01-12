import React from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import styled from "@emotion/styled";
import "./CartPage.scss"; // Import your Sass file
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../../redux/userSide/action/cartSlice";


const CartPage = () => {
  const dispatch = useDispatch();

  // Access the cart store
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity less than 1
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  return (
    <div className="cart-page ">
      <div className="cart-container">
        {/* <div className="cart-item">
          <div className="item-details">
            <img
              src="https://via.placeholder.com/100"
              alt="product"
              className="product-image"
            />
            <div className="item-info">
              <Link to={`/products/slug`}>
                <Typography
                  variant="h6"
                  className="product-title"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: "0.9rem",
                    maxWidth: "60% ",
                  }}
                >
                  URACCA Women Ethnic wear Plain Palazzo | Rayon | Full Length
                  Regular Fit | Stylish Bottom Wear Casual Solid
                </Typography>
              </Link>

              <Typography variant="body2" color="green">
                In stock
              </Typography>
              <Typography variant="body2">5 Left</Typography>
              <Typography variant="body2" className="price">
                ₹440.00
              </Typography>

             add quntity =======
              <div className="quantity-controls">
                <Button variant="outlined">-</Button>
                {/* <TextField type="number" value={1} className="quantity-input" aria-readonly 
                sx={{
                    border:"none"
                }}
                /> *
                <Typography
                  variant="body2"
                  className="quantity-input"
                  color="green"
                >
                  2
                </Typography>
                <Button variant="outlined">+</Button>
              </div>
              ====== 

             <Box>
             <Button variant="text" color="primary">
                Add to wishlist
              </Button>
              <Button variant="text" color="secondary">
                Remove
              </Button>
             </Box>
            </div>
         
          </div>
        </div> */}
         {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="item-details">
                <img
                  src="https://via.placeholder.com/100" // Replace with actual product image URL if available
                  alt={item.name}
                  className="product-image"
                />
                <div className="item-info">
                  <Link to={`/products/${item.id}`}>
                    <Typography
                      variant="h6"
                      className="product-title"
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "0.9rem",
                        maxWidth: "60%",
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Link>
                  <Typography variant="body2" color="green">
                    In stock
                  </Typography>
                  <Typography variant="body2">Quantity: {item.quantity}</Typography>
                  <Typography variant="body2" className="price">
                    ₹{item.price}
                  </Typography>

                  {/* Quantity Controls */}
                  <div className="quantity-controls">
                    <Button
                      variant="outlined"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </Button>
                    <Typography
                      variant="body2"
                      className="quantity-input"
                      color="green"
                    >
                      {item.quantity}
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </Button>
                  </div>

                  <Box>
                    <Button
                      variant="text"
                      color="secondary"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </Box>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Typography variant="h6">Your cart is empty!</Typography>
        )}
      </div>
      

      <div className="price-details">
        <Typography variant="h5">Price Details:</Typography>
        <div className="price-row">
          <Typography>Price (1 item):</Typography>
          <Typography>₹440.00</Typography>
        </div>
        <div className="price-row">
          <Typography>Discount:</Typography>
          <Typography color="green">-₹149.00</Typography>
        </div>
        <div className="price-row">
          <Typography>Shipping:</Typography>
          <Typography>No shipping charge</Typography>
        </div>
        {/* <div className="price-row">
          <Typography>Used Coupons:</Typography>
          <Typography>-0</Typography>
        </div>
        <TextField
          placeholder="Add your coupon here.."
          variant="outlined"
          className="coupon-input"
        />
        <Button variant="contained" className="apply-button">
          Apply
        </Button> */}
        <Typography variant="h6" className="total-amount">
          Total Amount: ₹440.00
        </Typography>
        <Button variant="contained" color="success" className="checkout-button">
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
