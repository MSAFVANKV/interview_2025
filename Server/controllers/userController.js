import asyncHandler from "../middlewares/asyncHandler.js";
import userModel from "../modals/userModel.js";
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
import jwt from "jsonwebtoken"; // Import jsonwebtoken for token generation

export const loginUser = asyncHandler(async (req, res) => {
  // console.log('sdasda');

  try {
    const { email, password, username } = req.body; // Include username for new users

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the inputs.",
      });
    }

    // Check if the user already exists
    let user = await userModel.findOne({ email });

    if (!user) {
      // User doesn't exist, create a new user and hash password
      const hashedPassword = await bcrypt.hash(password, 10); // Hash password with salt rounds

      // Create a new user object
      user = new userModel({
        email,
        password: hashedPassword, // Save the hashed password
      });

      // Save the new user
      await user.save();
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET_USER,
        { expiresIn: "30d" }
      );
      res.cookie("us-tkn", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Ensure HTTPS in production
        sameSite: "Lax", // Use 'Lax' for CSRF protection and compatibility
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        path: "/", // Apply to all paths
        domain: "cybpress-frontent.onrender.com", // Match backend domain
      });

      res.setHeader("Authorization", `Bearer ${token}`);

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        user,
        token,
      });
    }

    // If user exists, compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET_USER,
        { expiresIn: "30d" }
      );
      // console.log(process.env.FRONT_DOMAIN4,'process.env.FRONT_DOMAIN4');

      res.cookie("us-tkn", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Ensure HTTPS in production
        sameSite: "Lax", // Use 'Lax' for CSRF protection and compatibility
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        path: "/", // Apply to all paths
        domain: "cybpress-frontent.onrender.com", // Match backend domain
      });

      res.setHeader("Authorization", `Bearer ${token}`);

      return res.status(200).json({
        success: true,
        message: "User Logged successfully",
        user,
        token,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

export const getUserData = asyncHandler(async (req, res) => {
  try {
    // The token has already been verified in the middleware (authenticateUser)
    const user = req.user;

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error in getUserData:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching user data.",
      error: error.message,
    });
  }
});

// ==== logut function ===
export const logoutUser = asyncHandler(async (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie("us-tkn", {
      httpOnly: true,
      domain: process.env.FRONT_DOMAIN4,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    console.error("Error during logout:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred during logout.",
      error: error.message,
    });
  }
});
