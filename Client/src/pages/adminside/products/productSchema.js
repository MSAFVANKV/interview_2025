import * as Yup from "yup";




export const ProductSchema = Yup.object().shape({
  productName: Yup.string().required("Title is required"),
    // amount: Yup.number().required("Amount is required").min(1, "Invalid amount"),
    mrp: Yup.number().required("MRP is required").min(1, "Invalid MRP"),
    description: Yup.string().required("Description is required"),
  
  });

  export const ProductVariationSchema = Yup.object().shape({
    variations: Yup.array().of(
        Yup.object().shape({
          variationName: Yup.string().required("Variation Name is required"),
          colorName: Yup.string().required("Color Name is required"),
          sizeArray: Yup.array().of(
            Yup.object().shape({
              size: Yup.string().required("Size is required"),
              finalPrice: Yup.number()
                .required("Final amount is required")
                .min(1, "Invalid amount"),
              discount: Yup.number()
                .required("Discount is required")
                .min(0, "Invalid discount"),
            })
          ),
        })
      ),
  });


  export const getValidationSchema = (step) => {
    console.log(step,'step');
    
    switch (step) {
      case 1:
        return ProductSchema;
     
        case 2:
          // Combine all schemas for a comprehensive validation
          return ProductSchema.concat(ProductVariationSchema);
      // Add cases for other schemas when implementing PriceStockSectionPage and ShippingSectionPage
    }
  };