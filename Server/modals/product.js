import mongoose from "mongoose";
import slugify from "slugify";

const variationSizeSchema = new mongoose.Schema({
  size: { type: String, required: false },
  stock: { type: Number, required: false },
  discount: { type: Number, default: 0 },
  finalPrice: { type: Number, required: false },
  sku: { type: String },
});

const variationSchema = new mongoose.Schema({
  variationName: { type: String },
  colorName: { type: String },
  colorCode: { type: String },
  sizeArray: [variationSizeSchema],
  photos: { type: [String], default: [] },
});

const productSchema = new mongoose.Schema({
  productName: { type: String },

  slug: { type: String, unique: true },

  description: { type: String },

  mrp: { type: Number },

  thumbnail: { type: [String] },

  variations: [variationSchema],
  salesCount: {
    type: Number,
    default: 0,
  },
});

productSchema.pre("validate", function (next) {
  if (this.isModified("productName")) {
    this.slug = slugify(this.productName, { lower: true, strict: true });
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
