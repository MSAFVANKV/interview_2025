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
//                                   name={`variations.${index}.sizeArray.${sizeIndex}.finalPrice`}
//                                   label="Final Amount"
//                                   value={size.finalPrice}
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
//                                   finalPrice: "",
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
//                           { size: "", finalPrice: "", discount: "" },
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
import { useEffect, useState } from "react";
import { makeToastError } from "../../../../lib/helper";

function VariationForm({ values, handleChange, errors, touched }) {
  const [imagePreviews, setImagePreviews] = useState(
    values.variations.map(() => []) // Initialize an empty preview array for each variation
  );

  // useEffect(() => {
  //   const newPreviews = values.variations.map(
  //     (variation) => variation.photos.map((photo) => URL.createObjectURL(photo)) // Convert photos to object URLs
  //   );
  //   setImagePreviews(newPreviews);
  // }, [values.variations]);
  useEffect(() => {
    const newPreviews = values.variations.map((variation) =>
      variation.photos.map((photo) => {
        // Check if the photo is a File object or a string
        if (photo instanceof File) {
          // If it's a File, create an object URL
          return URL.createObjectURL(photo);
        } else if (typeof photo === 'string') {
          // If it's already a string (URL or image path), return it as is
          return photo;
        }
        return null; // In case of an unexpected value, return null
      })
    );
    setImagePreviews(newPreviews);
  }, [values.variations]);
  

  const handleFileChange = (index, event) => {
    const files = Array.from(event.target.files); // Get all selected files

    if (files.length > 0) {
      // Check if all files are images
      const validImages = files.filter((file) =>
        file.type.startsWith("image/")
      );
      if (validImages.length === files.length) {
        const updatedPreviews = [...imagePreviews];
        const newPreviews = validImages.map((file) =>
          URL.createObjectURL(file)
        ); // Create previews for each valid image
        updatedPreviews[index] = [...updatedPreviews[index], ...newPreviews];
        setImagePreviews(updatedPreviews);

        // Pass the files to the form values
        const newPhotos = validImages.map((file) => file); // Only store valid images
        handleChange({
          target: {
            name: `variations.${index}.photos`,
            value: [...values.variations[index].photos, ...newPhotos],
          },
        });
      } else {
        makeToastError("Only image files are allowed.");
      }
    }
  };

  const handleDeleteImage = (variationIndex, imageIndex) => {
    // Remove the deleted image from the preview and the form values
    const updatedPreviews = [...imagePreviews];
    updatedPreviews[variationIndex].splice(imageIndex, 1);
    setImagePreviews(updatedPreviews);

    const updatedPhotos = [...values.variations[variationIndex].photos];
    updatedPhotos.splice(imageIndex, 1);
    handleChange({
      target: {
        name: `variations.${variationIndex}.photos`,
        value: updatedPhotos,
      },
    });
  };
  return (
    <div className="variation-container">
      <FieldArray name="variations">
        {({ remove, push }) => (
          <>
            <Typography variant="h6">Variations</Typography>
            {values.variations?.map((variation, index) => (
              <Box
                key={index}
                mb={2}
                display="flex"
                flexDirection="column"
                gap={2}
              >
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
                <input
                  type="color"
                  name={`variations.${index}.colorCode`}
                  value={variation.colorCode}
                  onChange={(event) => {
                    const newColorCode = event.target.value;
                    // const newColorName = event.target.value.replace("#", "").toUpperCase();
                    handleChange({
                      target: {
                        name: `variations.${index}.colorCode`,
                        value: newColorCode,
                      },
                    });
                  }}
                  style={{
                    width: "100%",
                  }}
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
                      <h4>Details</h4>
                      {variation.sizeArray?.map((size, sizeIndex) => (
                        <Box
                          key={sizeIndex}
                          display="flex"
                          flexDirection="column"
                          alignItems=""
                          gap={2}
                        >
                          <TextField
                            name={`variations.${index}.sizeArray.${sizeIndex}.size`}
                            label="Size"
                            value={size.size}
                            onChange={handleChange}
                          />
                          <TextField
                            name={`variations.${index}.sizeArray.${sizeIndex}.finalPrice`}
                            label="Final Amount"
                            value={size.finalPrice}
                            onChange={handleChange}
                          />
                          <TextField
                            name={`variations.${index}.sizeArray.${sizeIndex}.discount`}
                            label="Discount"
                            value={size.discount}
                            onChange={handleChange}
                          />
                          <TextField
                            name={`variations.${index}.sizeArray.${sizeIndex}.stock`}
                            label="Stock"
                            value={size.stock}
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
                          pushSize({ size: "", finalPrice: "", discount: "" })
                        }
                      >
                        Add Size
                      </Button>
                    </>
                  )}
                </FieldArray>

                {/* Multiple Image Upload for Variation */}
                <Box mt={2}>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(event) => handleFileChange(index, event)}
                    style={{ display: "none" }}
                    id={`variation-${index}-image-upload`}
                  />
                  <label htmlFor={`variation-${index}-image-upload`}>
                    <Button variant="contained" component="span">
                      Upload Images
                    </Button>
                  </label>

                  {imagePreviews[index] && (
                    <Box mt={2} display="flex" gap={2}>
                      <Typography variant="body2">Image Previews:</Typography>
                      {imagePreviews[index].map((preview, imageIndex) => (
                        <Box key={imageIndex} position="relative">
                          <img
                            src={
                              preview instanceof File
                                ? URL.createObjectURL(preview)
                                : preview
                            }
                            alt={`Variation Image Preview ${imageIndex}`}
                            style={{
                              width: "100px",
                              height: "auto",
                              objectFit: "cover",
                              borderRadius: "8px",
                              marginTop: "10px",
                            }}
                          />
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteImage(index, imageIndex)}
                            style={{
                              position: "absolute",
                              top: 0,
                              right: 0,
                              backgroundColor: "rgba(255, 255, 255, 0.7)",
                            }}
                          >
                            <RemoveCircleIcon />
                          </IconButton>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>

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
                  colorCode: "",
                  photos: [], // Initialize photos as an empty array
                  sizeArray: [{ size: "", finalPrice: "", discount: "" }],
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
