import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../modals/product.js";

export const createProduct = asyncHandler(async (req, res) => {
  // console.log("req.body;");

  try {
    const { productName, mrp, description, size, stock, variations } = req.body;
    // console.log(req.body, "req.body;");

    const existingProduct = await Product.findOne({ productName });

    if (existingProduct) {
      return res.status(400).json({ message: "Product name already exists" });
    }

    const basePath = `${req.secure ? "https" : "http"}://${req.get("host")}/`;

    // console.log(req.files);
    const thumbnail = req.files["thumbnail"]
      ? req.files["thumbnail"].map(
          (file) => `${basePath}${file.path.replace(/\\/g, "/")}`
        )
      : "";

    let variationsArray = [];
    if (variations) {
      try {
        variationsArray = JSON.parse(variations).map((variation, index) => {
          const photoPaths = req.files[`variations[${index}].photos`]
            ? req.files[`variations[${index}].photos`].map(
                (file) => `${basePath}${file.path.replace(/\\/g, "/")}`
              )
            : [];
          return {
            ...variation,
            photos: photoPaths,
          };
        });
      } catch (err) {
        return res.status(400).json({ msg: "Invalid variations format" });
      }
    }

    // Build the product object
    const productData = {
      productName,
      mrp,
      description,
      size,
      stock,
      thumbnail: thumbnail,
      variations: variationsArray,
      //   variations: variations.map((variation, index) => ({
      //     ...variation,
      //     photos: productImages || [],
      //   })),
    };

    // Create the product
    const newProduct = new Product(productData);
    await newProduct.save();

    return res.status(200).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred ",
      error: error.message,
    });
  }
});

// ========
export const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    if (!products) {
      return res.status(204).json({ message: "No products found" });
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// =================================================================
export const deleteProduct = asyncHandler(async (req, res) => {
  try {
    // console.log(req.params.productId, "req.params.productId");

    const product = await Product.findByIdAndDelete(req.params.productId);

    if (!product) {
      return res.status(204).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully and removed from all carts",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ========
export const updateProduct = asyncHandler(async (req, res) => {
  try {
    const productId = req.params.id;
    // console.log(productId, "productId");

    const {
      productName,

      description,

      mrp,
      variations,
    } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(204).json({ message: "Product not found" });
    }

    const basePath = `${req.secure ? "https" : "http"}://${req.get("host")}/`;

    const thumbnail = req.files["thumbnail"]
      ? req.files["thumbnail"].map(
          (file) => `${basePath}${file.path.replace(/\\/g, "/")}`
        )
      : product.thumbnail;

    let variationsArray = [];
    if (variations) {
      try {
        variationsArray = JSON.parse(variations).map((variation, index) => {
          const photoPaths = req.files[`variations[${index}].photos`]
            ? req.files[`variations[${index}].photos`].map(
                (file) => `${basePath}${file.path.replace(/\\/g, "/")}`
              )
            : variation.photos || [];
          return {
            ...variation,
            photos: photoPaths,
          };
        });
      } catch (err) {
        return res.status(400).json({ msg: "Invalid variations format" });
      }
    }

    product.productName = productName || product.productName;

    product.description = description || product.description;

    product.mrp = mrp || product.mrp;
    product.thumbnail = thumbnail;

    product.variations =
      variationsArray.length > 0 ? variationsArray : product.variations;

    if (productName && productName !== product.productName) {
      product.slug = slugify(productName, { lower: true, strict: true });
    }

    const updatedProduct = await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// =================================================================
export const getSingleProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);

    // console.log(product);

    if (!product) {
      return res.status(204).json({ message: "Product not found" });
    }

    return res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});
