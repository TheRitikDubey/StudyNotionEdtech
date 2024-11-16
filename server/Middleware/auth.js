const jwt = require("jsonwebtoken");
const user = require("../Models/User");
require("dotenv").config();

// Auth
exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        status: 401,
        message: "Did not receive token from the request in the middleware",
      });
    }
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    } catch (err) {
      console.log(err);
      return res.status(401).json({
        success: false,
        message: "Token verification  is failed",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    
    return res.status(401).json({
      success: false,
      message: "Something error occured while validating token",
    });
  }
};

// IsStudent middleware
exports.IsStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for students only",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "User role can not verified please try again",
    });
  }
};

// IsInstructor middleware
exports.IsInstructor = async (req, res, next) => {
  try {
    console.log(req.user?.accountType);
    if (req.user?.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Instructor only",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "User role can not verified please try again",
    });
  }
};

// Admin middleware
exports.IsAdmin = async (req, res, next) => {
  try {
    console.log("check the account type",req.user.accountType);
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Admin only",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "User role can not verified please try again",
    });
  }
};
