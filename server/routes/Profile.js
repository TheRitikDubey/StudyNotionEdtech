const express = require("express");
const router = express.Router();
const {auth} = require("../Middleware/auth");

const {updateProfile,deleteProfile,getUserDetailsData , getEnrolledCourse, updateDisplayPicture} = require('../Controllers/Profile')
// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delete User Account
router.delete("/deleteProfile", auth, deleteProfile);
router.put("/updateProfile",auth,updateProfile);
router.get("/getUserDetails",auth,getUserDetailsData)

// TO do by 22feb
router.get("/getEnrolledCourses", auth, getEnrolledCourse)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)

module.exports = router