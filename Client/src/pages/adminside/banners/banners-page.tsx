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
        setBanners(res.data);
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
          {banners.length > 0 ? (
            banners.map((banner, bannerIndex) => (
              <Box
               my="1rem"
                display="flex"
                flexWrap="wrap"
                gap="8px"
                key={bannerIndex} // Adding key to avoid warnings
              >
                {banner?.banner?.map((img, index) => (
                  <img
                    src={img} // Assuming img is the correct URL
                    alt={`Banner ${index}`}
                    key={index} // Adding key for each image
                    height={50}
                    width={50}
                  />
                ))}
              </Box>
            ))
          ) : (
            <p>No banners available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BannersPage;
