export  const initialValues = {
  productName: "",
    amount: "",
    thumbnail: null,  
    mrp: "",
    description: "",
    variations: [
      {
        variationName: "",
        colorName: "",
        colorCode: "",
        photos:[],
        sizeArray: [{ size: "", finalPrice: "", discount: "",stock:"" }],
      },
    ],
  };
  // deaafult values