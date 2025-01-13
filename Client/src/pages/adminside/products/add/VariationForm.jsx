// import { FieldArray, Form, Formik } from "formik";
// import { getValidationSchema } from "../productSchema";
// import { Button, TextField, Box, Typography, IconButton } from "@mui/material";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
// import { initialValues } from "../initialValues";

// function VariationForm({tab} ) {
//   const handleSubmit = (values) => {
//     console.log("Form Submitted:", values);
//   };

//   return (
//     <div className="variation-container">
//       <Formik
//         initialValues={initialValues}
//         validationSchema={getValidationSchema(2)}
//         onSubmit={handleSubmit}
//         enableReinitialize={true}
//       >
//         {({ values, handleChange, errors, touched }) => (
//           <Form>
//             <FieldArray name="variations">
//               {({ remove, push }) => (
//                 <>
//                   <Typography variant="h6">Variations</Typography>
//                   {values.variations.map((variation, index) => (
//                     <Box
//                       key={index}
//                       mb={2}
//                       display="flex"
//                       flexDirection="column"
//                       gap={2}
//                     >
//                       <TextField
//                         name={`variations.${index}.variationName`}
//                         label="Variation Name"
//                         value={variation.variationName}
//                         onChange={handleChange}
//                         error={
//                           touched.variations?.[index]?.variationName &&
//                           !!errors.variations?.[index]?.variationName
//                         }
//                         helperText={
//                           touched.variations?.[index]?.variationName &&
//                           errors.variations?.[index]?.variationName
//                         }
//                         fullWidth
//                       />
//                       <TextField
//                         name={`variations.${index}.colorName`}
//                         label="Color Name"
//                         value={variation.colorName}
//                         onChange={handleChange}
//                         error={
//                           touched.variations?.[index]?.colorName &&
//                           !!errors.variations?.[index]?.colorName
//                         }
//                         helperText={
//                           touched.variations?.[index]?.colorName &&
//                           errors.variations?.[index]?.colorName
//                         }
//                         fullWidth
//                       />

//                       {/* Sizes */}
//                       <FieldArray name={`variations.${index}.sizeArray`}>
//                         {({ remove: removeSize, push: pushSize }) => (
//                           <>
//                             {variation.sizeArray.map((size, sizeIndex) => (
//                               <Box
//                                 key={sizeIndex}
//                                 display="flex"
//                                 alignItems="center"
//                                 gap={2}
//                               >
//                                 <TextField
//                                   name={`variations.${index}.sizeArray.${sizeIndex}.size`}
//                                   label="Size"
//                                   value={size.size}
//                                   onChange={handleChange}
//                                 />
//                                 <TextField
//                                   name={`variations.${index}.sizeArray.${sizeIndex}.finalAmount`}
//                                   label="Final Amount"
//                                   value={size.finalAmount}
//                                   onChange={handleChange}
//                                 />
//                                 <TextField
//                                   name={`variations.${index}.sizeArray.${sizeIndex}.discount`}
//                                   label="Discount"
//                                   value={size.discount}
//                                   onChange={handleChange}
//                                 />
//                                 <IconButton
//                                   color="error"
//                                   onClick={() => removeSize(sizeIndex)}
//                                 >
//                                   <RemoveCircleIcon />
//                                 </IconButton>
//                               </Box>
//                             ))}
//                             <Button
//                               variant="outlined"
//                               startIcon={<AddCircleIcon />}
//                               onClick={() =>
//                                 pushSize({
//                                   size: "",
//                                   finalAmount: "",
//                                   discount: "",
//                                 })
//                               }
//                             >
//                               Add Size
//                             </Button>
//                           </>
//                         )}
//                       </FieldArray>
//                       <Button
//                         color="error"
//                         onClick={() => remove(index)}
//                         startIcon={<RemoveCircleIcon />}
//                       >
//                         Remove Variation
//                       </Button>
//                     </Box>
//                   ))}
//                   <Button
//                     variant="contained"
//                     onClick={() =>
//                       push({
//                         variationName: "",
//                         colorName: "",
//                         sizeArray: [
//                           { size: "", finalAmount: "", discount: "" },
//                         ],
//                       })
//                     }
//                     startIcon={<AddCircleIcon />}
//                   >
//                     Add Variation
//                   </Button>
//                 </>
//               )}
//             </FieldArray>

//             {/* Submit Button */}
//             <Box mt={3}>
//               <Button type="submit" variant="contained" color="primary">
//                 Submit
//               </Button>
//             </Box>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// }

// export default VariationForm;
// =================================================================
import { FieldArray } from "formik";
import { Button, TextField, Box, Typography, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

function VariationForm({ values, handleChange, errors, touched }) {
  return (
    <div className="variation-container">
      <FieldArray name="variations">
        {({ remove, push }) => (
          <>
            <Typography variant="h6">Variations</Typography>
            {values.variations?.map((variation, index) => (
              <Box key={index} mb={2} display="flex" flexDirection="column" gap={2}>
                <TextField
                  name={`variations.${index}.variationName`}
                  label="Variation Name"
                  value={variation.variationName}
                  onChange={handleChange}
                  error={
                    touched.variations?.[index]?.variationName &&
                    !!errors.variations?.[index]?.variationName
                  }
                  helperText={
                    touched.variations?.[index]?.variationName &&
                    errors.variations?.[index]?.variationName
                  }
                  fullWidth
                />
                <TextField
                  name={`variations.${index}.colorName`}
                  label="Color Name"
                  value={variation.colorName}
                  onChange={handleChange}
                  error={
                    touched.variations?.[index]?.colorName &&
                    !!errors.variations?.[index]?.colorName
                  }
                  helperText={
                    touched.variations?.[index]?.colorName &&
                    errors.variations?.[index]?.colorName
                  }
                  fullWidth
                />

                {/* Size Array */}
                <FieldArray name={`variations.${index}.sizeArray`}>
                  {({ remove: removeSize, push: pushSize }) => (
                    <>
                      {variation.sizeArray?.map((size, sizeIndex) => (
                        <Box key={sizeIndex} display="flex" alignItems="center" gap={2}>
                          <TextField
                            name={`variations.${index}.sizeArray.${sizeIndex}.size`}
                            label="Size"
                            value={size.size}
                            onChange={handleChange}
                          />
                          <TextField
                            name={`variations.${index}.sizeArray.${sizeIndex}.finalAmount`}
                            label="Final Amount"
                            value={size.finalAmount}
                            onChange={handleChange}
                          />
                          <TextField
                            name={`variations.${index}.sizeArray.${sizeIndex}.discount`}
                            label="Discount"
                            value={size.discount}
                            onChange={handleChange}
                          />
                          <IconButton
                            color="error"
                            onClick={() => removeSize(sizeIndex)}
                          >
                            <RemoveCircleIcon />
                          </IconButton>
                        </Box>
                      ))}
                      <Button
                        variant="outlined"
                        startIcon={<AddCircleIcon />}
                        onClick={() =>
                          pushSize({ size: "", finalAmount: "", discount: "" })
                        }
                      >
                        Add Size
                      </Button>
                    </>
                  )}
                </FieldArray>
                <Button
                  color="error"
                  onClick={() => remove(index)}
                  startIcon={<RemoveCircleIcon />}
                >
                  Remove Variation
                </Button>
              </Box>
            ))}
            <Button
              variant="contained"
              onClick={() =>
                push({
                  variationName: "",
                  colorName: "",
                  sizeArray: [{ size: "", finalAmount: "", discount: "" }],
                })
              }
              startIcon={<AddCircleIcon />}
            >
              Add Variation
            </Button>
          </>
        )}
      </FieldArray>
    </div>
  );
}

export default VariationForm;


