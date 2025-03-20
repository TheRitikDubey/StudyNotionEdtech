const express = require("express");
const router = express.Router();
const {auth} = require("../Middleware/auth");

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

const { publicMailSender } = require("../Controllers/ContactUs")


// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signUp)

// Route for sending OTP to the user's email
router.post("/sendotp", sendOtp)

// Route for Changing the password
router.post("/changepassword", auth, changePassword)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

// ********************************************************************************************************
//                                      Public Mail Service
// ********************************************************************************************************
router.post("/sendMail", publicMailSender)
// Export the router for use in the main application
module.exports = router