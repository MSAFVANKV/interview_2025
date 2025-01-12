import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  buildingNo: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
    required: true,
  },

  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  postOffice: {
    type: String,
    required: true,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
});

const userSchema = new mongoose.Schema(
  {
    // username: {
    //   type: String,
    //   required: true,
    // },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: false,
      minLength: 10,
    },

    password: {
      type: String,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    otp: String,
    isVerified: {
      type: Boolean,
      default: false,
    },


    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    // addresses: [addressSchema],
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
