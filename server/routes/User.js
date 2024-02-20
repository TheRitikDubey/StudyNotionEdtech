const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");

const {
  sendOtp,
  login,
  changePassword,
  signUp,
} = require("../Controllers/auth");

const {
  resetPassword,
  resetPasswordToken,
} = require("../Controllers/ResetPassword");


// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signup)

// Route for sending OTP to the user's email
router.post("/sendotp", sendotp)

// Route for Changing the password
router.post("/changepassword", auth, changePassword)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

// Export the router for use in the main application
module.exports = router