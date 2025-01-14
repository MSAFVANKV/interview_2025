import React from "react";
import { Box, Typography,  Link } from "@mui/material";
import "./footer.scss";
import Grid from "@mui/material/Grid2";


function Footer() {
  return (
    <Box className="footer-container">
      <Grid container className="footer-content">
        <Grid item xs={12} md={4} className="footer-section">
          <Typography variant="h6" className="footer-heading">
            About Us
          </Typography>
          <Typography variant="body2" className="footer-text">
            We strive to provide the best services and products to our
            customers, ensuring satisfaction and value.
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} className="footer-section">
          <Typography variant="h6" className="footer-heading">
            Quick Links
          </Typography>
          <Box className="footer-links">
            <Link href="/admin/products/add" color="inherit" underline="hover">
              admin
            </Link>
            <Link href="/cart" color="inherit" underline="hover">
              Cart
            </Link>
           
          </Box>
        </Grid>
        <Grid item xs={12} md={4} className="footer-section">
          <Typography variant="h6" className="footer-heading">
            Contact
          </Typography>
          <Typography variant="body2" className="footer-text">
            Email: mskvphed@gmail.com
            <br />
            Phone: +91 7034359330
          </Typography>
        </Grid>
      </Grid>
      <Box className="footer-bottom">
        <Typography variant="body2" className="copyright-text">
          © Muhammed Safvan Kv 2025. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
