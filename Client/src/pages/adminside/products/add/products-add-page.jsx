import { useEffect, useMemo, useState } from "react";
import "../product.scss";
import ProductAddForm from "./ProductAddForm";
import VariationForm from "./VariationForm";
import { Form, Formik } from "formik";
import { initialValues as defaultInitialValues } from "../initialValues";
import { getValidationSchema } from "../productSchema";
import { Box, Button } from "@mui/material";
import { makeToast, makeToastError } from "../../../../lib/helper";
import { useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../../../../redux/userSide/action/productSlice";
import {
  Create_Product_Api,
  Update_Single_Product_Api,
} from "../../../../routers/product-api";

function ProductsAddPage() {
  const [switchTabs, setSwitchTabs] = useState("add");
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  // console.log(products,'products');

  const slugId = searchParams.get("edit");

  useEffect(() => {
    if (slugId) {
      dispatch(fetchSingleProduct(slugId));
      // fetchSingleProduct();
    }
  }, [slugId]);

  const initialValues = useMemo(() => {
    return products
      ? {
          productName: products.productName || "",
          amount: products.amount || "",
          thumbnail: products.thumbnail || null,
          mrp: products.mrp || "",
          description: products.description || "",
          variations: products.variations || [
            {
              variationName: "",
              colorName: "",
              colorCode: "",
              photos: [],
              sizeArray: [
                { size: "", finalPrice: "", discount: "", stock: "" },
              ],
            },
          ],
        }
      : defaultInitialValues;
  }, [products]);

  const handleSubmit = async (values, { resetForm }) => {
    if (switchTabs === "add") {
      return setSwitchTabs("variants");
    }
    // Create a FormData object to send the images
    const formData = new FormData();

    // Append product fields to the FormData
    formData.append("productName", values.productName);
    formData.append("mrp", values.mrp);
    formData.append("description", values.description);
    formData.append("variations", JSON.stringify(values.variations));
    values.variations.forEach((variation, index) => {
      // console.log(variation, "variation");

      if (variation && variation.photos && Array.isArray(variation.photos)) {
        variation.photos.forEach((photos) => {
          formData.append(`variations[${index}].photos`, photos);
        });
      }
    });

    if (values.thumbnail) {
      formData.append("thumbnail", values.thumbnail); // append the file directly
    }

    // Send the data to the server
    try {
      const response = !slugId
      ? await Create_Product_Api(formData) // Pass formData directly
      : await Update_Single_Product_Api(formData, slugId);
      // const response = await axios.post(PRODUCT_ADD, formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      //   withCredentials: true, // This sends cookies or credentials with the request
      // });

      if (response.status === 200) {
        if (slugId) {
          dispatch(fetchSingleProduct(slugId));
          // fetchSingleProduct();
        }
        makeToast(`${response.data.message}`);
      }

      // console.log('Product created:', response.data);
    } catch (error) {
      console.error("Error creating product:", error);
      if (error.response.data) {
        makeToastError(`${error.response.data.message}`);
      }
      // makeToast(`${error.message}`)
    } finally {
      setSwitchTabs("add");
      window.scrollTo({
        top: 0, // Scroll to the top of the page
        behavior: "smooth", // Smooth scrolling
      });

      resetForm();
    }
  };

  return (
    <div>
      <h3>Products Add Page</h3>
      {/* product tabs starts ==== */}
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
                  mt: "2rem",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width: "200px",

                    bgcolor: "#5F08B1",
                  }}
                >
                  {slugId ? "Edit" : "Submit"}
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
