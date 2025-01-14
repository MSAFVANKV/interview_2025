import mongoose from "mongoose";
import slugify from "slugify";

const variationSizeSchema = new mongoose.Schema({
  size: { type: String, required: false },
  stock: { type: Number, required: false },
  discount: { type: Number, default: 0 },
  finalPrice: { type: Number, required: false },
  discountType: {
    type: String,
    enum: ["percentage", "amount"],
    required: false,
  },
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

  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  description: { type: String },

  mrp: { type: Number },
  keyWords: { type: [String], index: true },

  published: { type: Boolean },
  specialFeatures: { type: String },
  featured: { type: Boolean },
  deliveryCharge: { type: Number },
  todaysDeal: { type: Boolean, default: false },
  thumbnail: { type: [String] },

  variations: [variationSchema],
  salesCount: {
    type: Number,
    default: 0,
  },
  rating: { type: Number, default: 0 },
  numberOfReviews: { type: Number, default: 0 },
});

productSchema.pre("validate", function (next) {
  if (this.isModified("productName")) {
    this.slug = slugify(this.productName, { lower: true, strict: true });
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
