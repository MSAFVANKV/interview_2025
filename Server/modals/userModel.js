import mongoose from "mongoose";



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
