import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import BannerForm from "./banner_form";
import { Fetch_Banners_Api } from "../../../routers/product-api";

function BannersPage() {
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    fetchBaners();
  }, []);

  const fetchBaners = async () => {
    try {
      const res = await Fetch_Banners_Api();
      if (res.status === 200) {
        const filterBanner = res.data.find((data) => {
          return data.banner;
        });
        // console.log(filterBanner);

        setBanners(filterBanner.banner);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h4>Banner Page</h4>
      <div className="page-outer">
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <h5>Add Banner</h5>
          <Button color="secondary" variant="contained">
            Show Banners
          </Button>
        </Box>

        {/* Form */}
        <div className="">
          <BannerForm fetchBaners={fetchBaners} />
        </div>
        {/* Banner Display */}
        <div className="">
          {banners.map((image, index) => (
            <div key={index}>
              <img src={image} alt={"as"} className="slider-image" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BannersPage;
