// import React from "react";
// import PropTypes from "prop-types";
// import { TextField } from "@mui/material";

// function MyInput({
//   label,
//   sx, // Accept sx as a prop
//   placeholder = "",
//   type = "text",
//   variant = "outlined", // Default variant
//   fullWidth = true,
//   value,
//   onChange,
//   error = false,
//   helperText = "",
//   className = "",
// }) {
//   return (
//     <div className={`my-input ${className}`}>
//       <TextField
//         label={label}
//         placeholder={placeholder}
//         type={type}
//         variant={variant}
//         fullWidth={fullWidth}
//         value={value}
//         onChange={onChange}
//         error={error}
//         helperText={helperText}
//         sx={sx} // Pass sx to the TextField
//       />
//     </div>
//   );
// }

// // Define prop types for better validation
// MyInput.propTypes = {
//   label: PropTypes.string,
//   placeholder: PropTypes.string,
//   type: PropTypes.string,
//   variant: PropTypes.oneOf(["outlined", "filled", "standard"]),
//   fullWidth: PropTypes.bool,
//   value: PropTypes.string,
//   onChange: PropTypes.func,
//   error: PropTypes.bool,
//   helperText: PropTypes.string,
//   className: PropTypes.string,
//   sx: PropTypes.object, // Define sx as a prop
// };

// export default MyInput;
import React from 'react'

function MyInput({type="text",placeholder}) {
  return (
    <div>
        <input type={type} className='my-input' placeholder={placeholder} />
    </div>
  )
}

export default MyInput