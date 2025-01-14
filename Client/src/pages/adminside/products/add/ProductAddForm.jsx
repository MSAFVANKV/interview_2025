import { TextField, Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import {  useState } from "react";
import { makeToastError } from "../../../../lib/helper";


function ProductAddForm(props) {
  const { values, handleChange, errors, touched } = props;
 
  const [imagePreview, setImagePreview] = useState(values.thumbnail || null);



  

  // console.log(values,'values prod --');

  // console.log(imagePreview,'imagePreview prod --');

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Check if the file is an image
      if (file.type.startsWith("image/")) {
        // Update the image preview
        setImagePreview(URL.createObjectURL(file));
        // Pass the file to the form values (if needed for submission)
        handleChange({
          target: { name: "thumbnail", value: file },
        });
      } else {
        makeToastError("Only image files are allowed.");
      }
    }
  };

  return (
    <div className="add-container">
      <Box display="flex" flexDirection="column" gap={2}>
        {/* Basic Details */}
        <Typography variant="h6">Product Details</Typography>
        <TextField
          name="productName"
          label="Title"
          value={values.productName}
          onChange={handleChange}
          error={touched.productName && !!errors.productName}
          helperText={touched.productName && errors.productName}
        />
      
        <TextField
          name="mrp"
          label="MRP"
          value={values.mrp}
          onChange={handleChange}
          error={touched.mrp && !!errors.mrp}
          helperText={touched.mrp && errors.mrp}
        />
        <TextField
          name="description"
          label="Description"
          multiline
          rows={4}
          value={values.description}
          onChange={handleChange}
          error={touched.description && !!errors.description}
          helperText={touched.description && errors.description}
        />
        {/* Thumbnail Image Upload */}
        <Box>
          <TextField
            type="file"
            name="thumbnail"
            label="Thumbnail"
            onChange={handleFileChange}
            error={touched.thumbnail && !!errors.thumbnail}
            helperText={touched.thumbnail && errors.thumbnail}
            slotProps={{
              inputLabel: {
                shrink: true, // This replicates the "shrink" behavior for the label
              },
            }}
            sx={{ width: "100%" }} // Optional, to ensure the file input stretches fully
          />
          {imagePreview && (
            <Box mt={2}>
              <Typography variant="body2">Image Preview:</Typography>
              <img
                // Only create an object URL if imagePreview is a file
                src={
                  imagePreview instanceof File
                    ? URL.createObjectURL(imagePreview)
                    : imagePreview
                }
                alt="Thumbnail Preview"
                style={{
                  width: "100px",
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginTop: "10px",
                }}
              />
            </Box>
          )}
        </Box>
        {/* <Button type="submit" variant="contained" color="primary">
          Submit
        </Button> */}
      </Box>
    </div>
  );
}

export default ProductAddForm;
ProductAddForm.propTypes = {
  values: PropTypes.shape({
    productName: PropTypes.string,
    amount: PropTypes.string,
    mrp: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  touched: PropTypes.object,
};
