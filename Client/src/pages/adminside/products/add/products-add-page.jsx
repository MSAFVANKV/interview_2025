import { useState } from "react";
import "../product.scss";
import ProductAddForm from "./ProductAddForm";
import VariationForm from "./VariationForm";
import { Form, Formik } from "formik";
import { initialValues } from "../initialValues";
import { getValidationSchema } from "../productSchema";
import { Box, Button } from "@mui/material";
import axios from "axios";
import { PRODUCT_ADD } from "../../../../routers/urlPth";
import { makeToast, makeToastError } from "../../../../lib/helper";

function ProductsAddPage() {
  const [switchTabs, setSwitchTabs] = useState("add");

  const handleSubmit = async (values, { resetForm }) => {
    if(switchTabs === "add"){
      return setSwitchTabs("variants")
    }
    // Create a FormData object to send the images
    const formData = new FormData();
    
    // Append product fields to the FormData
    formData.append('productName', values.productName);
    formData.append('mrp', values.mrp);
    formData.append('description', values.description);
    // values.variations.forEach((variation, index) => {
    //   formData.append(`variations[${index}].variationName`, variation.variationName);
    //   formData.append(`variations[${index}].colorName`, variation.colorName);
    //   // Append all variation photos
    //   variation.photos.forEach(photo => {
    //     formData.append(`variations[${index}].photos`, photo);
    //   });
    // });

    formData.append(
      "variations",
      JSON.stringify(values.variations)
    );
    values.variations.forEach((variation, index) => {
      // console.log(variation, "variation");

      if (
        variation &&
        variation.photos &&
        Array.isArray(variation.photos)
      ) {
        variation.photos.forEach((photos) => {
          formData.append(`variations[${index}].photos`, photos);
        });
      }
    });
  
    if (values.thumbnail) {
      formData.append("thumbnail", values.thumbnail); // append the file directly
    }
    
    // Handle thumbnail images
    // const thumbnailFile = document.querySelector("#thumbnail-upload").files[0];
    // if (thumbnailFile) {
    //   formData.append('thumbnail', thumbnailFile);
    // }

    // Send the data to the server
    try {
      const response = await axios.post(PRODUCT_ADD, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, // This sends cookies or credentials with the request
      });

      if(response.status === 200) {
        makeToast(`${response.data.message}`)
      }
      
      console.log('Product created:', response.data);
    } catch (error) {
      console.error('Error creating product:', error);
      if(error.response.data){
        makeToastError(`${error.response.data.message}`)
      }
      // makeToast(`${error.message}`)
    }finally{
      setSwitchTabs('add')
      window.scrollTo({
        top: 0, // Scroll to the top of the page
        behavior: 'smooth' // Smooth scrolling
      });
      
      resetForm()
    }
  };

  return (
    <div>
      <h3>Products Add Page</h3>
      <div className="bg-white product-tabs">
        <div
          className={`main-details ${switchTabs === "add" && "active-tab"}`}
          onClick={() => setSwitchTabs("add")}
        >
          ADD Details
        </div>
        <div
          className={`variants ${switchTabs === "variants" && "active-tab"}`}
          onClick={() => setSwitchTabs("variants")}
        >
          Variations
        </div>
      </div>

      <div className="bg-white product-container">
        <Formik
          initialValues={initialValues}
          validationSchema={getValidationSchema(switchTabs === "add" ? 1 : 2)}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ values, handleChange, errors, touched, setFieldValue }) => (
            <Form>
              {switchTabs === "add" ? (
                <ProductAddForm
                  values={values}
                  handleChange={handleChange}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  tab={switchTabs}
                />
              ) : (
                <div>
                  <VariationForm
                    values={values}
                    handleChange={handleChange}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                    tab={switchTabs}
                  />
                </div>
              )}
              <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt:"2rem"
              }}

              >
                  <Button type="submit" variant="contained" 
                   sx={{
                   width:"200px",

                    bgcolor:'#5F08B1'
                  }}
                  >
                Submit
              </Button>
              </Box>
            
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ProductsAddPage;
