import { Box, Button } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { Create_Banners_Api } from "../../../routers/product-api";
import { makeToast, makeToastError } from "../../../lib/helper";

function BannersPage() {
  const initialValues = {
    banner: [], // Initial empty array for multiple file uploads
  };

  const handleImageChange = (event, fieldName, setFieldValue, values) => {
    const files = event.target.files;

    if (files) {
      const selectedFiles = Array.from(files);
      setFieldValue(fieldName, [...values.banner, ...selectedFiles]); // Append new files to the existing ones
    }
  };

  const handleImageDelete = (index, fieldName, setFieldValue, values) => {
    const updatedBanners = values.banner.filter((_, i) => i !== index); // Remove the image at the specified index
    setFieldValue(fieldName, updatedBanners); // Update Formik's field value
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
        <Box>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values, { resetForm }) => {
              console.log("Form submitted", values);

              const formData = new FormData();
              values.banner.forEach((file) => {
                formData.append("banner", file); // Use 'banner' instead of 'banner[${index}]'
              });

              try {
                const response = await Create_Banners_Api(formData);
                if (response.status === 200) {
                  makeToast(`${response.data.message}`);
                }
              } catch (error) {
                if (error.response.data) {
                  makeToastError(`${error.response.data.message}`);
                }
              } finally{
                resetForm();
              }
            }}
          >
            {({ values, setFieldValue }) => (
              <Form>
                {/* File Input */}
                <Box mb={2}>
                  <label htmlFor="bannerUpload">
                    <Button variant="outlined" component="span">
                      Upload Banner
                    </Button>
                  </label>
                  <input
                    id="bannerUpload"
                    name="banner"
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: "none" }}
                    onChange={(event) =>
                      handleImageChange(event, "banner", setFieldValue, values)
                    }
                  />
                </Box>

                {/* Display Selected File Names */}
                {/* {values.banner.length > 0 && (
                  <Box mb={2}>
                    <ul style={{
                      display:"flex",
                      flexWrap:"wrap",
                      gap:"5px"
                    }}>
                      {values.banner.map((file, index) => (
                        <li key={index}>{file?.name}</li>
                      ))}
                    </ul>
                  </Box>
                )} */}
                {values.banner.length > 0 && (
                  <Box mb={2} display="flex" flexWrap="wrap" gap={2}>
                    {values.banner.map((file, index) => (
                      <Box key={index} position="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                        <Button
                          size="small"
                          color="error"
                          variant="contained"
                          style={{
                            position: "absolute",
                            top: "-5px",
                            right: "-5px",
                            minWidth: "30px",
                            padding: "0",
                          }}
                          onClick={() =>
                            handleImageDelete(
                              index,
                              "banner",
                              setFieldValue,
                              values
                            )
                          }
                        >
                          X
                        </Button>
                      </Box>
                    ))}
                  </Box>
                )}

                {/* Submit Button */}
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </div>
    </div>
  );
}

export default BannersPage;
