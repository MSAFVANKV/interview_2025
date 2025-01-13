import {  TextField, Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
function ProductAddForm(props ) {
    const { values, handleChange, errors, touched } = props;

  return (
    <div className="add-container">
      <Box display="flex" flexDirection="column" gap={2}>
        {/* Basic Details */}
        <Typography variant="h6">Product Details</Typography>
        <TextField
          name="title"
          label="Title"
          value={values.title}
          onChange={handleChange}
          error={touched.title && !!errors.title}
          helperText={touched.title && errors.title}
        />
        <TextField
          name="amount"
          label="Amount"
          value={values.amount}
          onChange={handleChange}
          error={touched.amount && !!errors.amount}
          helperText={touched.amount && errors.amount}
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
    title: PropTypes.string,
    amount: PropTypes.string,
    mrp: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  touched: PropTypes.object,
};
