import { useState } from "react";
import "../product.scss";
import ProductAddForm from "./ProductAddForm";
import VariationForm from "./VariationForm";
import { Form, Formik } from "formik";
import { initialValues } from "../initialValues";
import { getValidationSchema } from "../productSchema";
import { Box, Button } from "@mui/material";

function ProductsAddPage() {
  const [switchTabs, setSwitchTabs] = useState("add");

  const handleSubmit = (values) => {
    console.log("Form Submitted:", values);
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
          {({ values, handleChange, errors, touched }) => (
            <Form>
              {switchTabs === "add" ? (
                <ProductAddForm
                  values={values}
                  handleChange={handleChange}
                  errors={errors}
                  touched={touched}
                  tab={switchTabs}
                />
              ) : (
                <div>
                  <VariationForm
                    values={values}
                    handleChange={handleChange}
                    errors={errors}
                    touched={touched}
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
