import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import BannerForm from "./banner_form";
import { Delete_Single_Banner_Api, Fetch_Banners_Api } from "../../../routers/product-api";
import { makeToast, makeToastError } from "../../../lib/helper";
import DeleteIcon from '@mui/icons-material/Delete';

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

  // const handleDelete = async (bannerId) => {
  //   try {
  //     const res = await Delete_Single_Banner_Api(bannerId);
  //     if (res.status === 200) {
  //       fetchBaners(); // Refresh the banner list after deletion
  //       makeToast("Banner deleted successfully");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     makeToastError("Error deleting banner");
  //   }
  // };

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
        <div className=""
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "1rem",

        }}
        >
          {banners.length > 0 ? (
            banners.map((image, bannerIndex) => (
              <Box
              my="1rem"
              position="relative"
              key={bannerIndex} // Adding key to avoid warnings
            >
              <img
                src={image}
                alt={"Banner " + bannerIndex}
                style={{
                  maxWidth: "150px", // Ensures image fits within container
                  height: "auto",   // Maintains aspect ratio
                  objectFit: "contain", // Ensures image retains its natural size
                }}
              />
              {/* Delete button */}
              {/* <DeleteIcon
                 onClick={() => handleDelete(image)}
                 style={{
                   position: "absolute",
                   top: 0,
                   right: 0,
                   // padding: "0.5rem",
                   width:"20px",
                   zIndex: 10,
                   backgroundColor:"tomato"
                 }}
               
               /> */}
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
