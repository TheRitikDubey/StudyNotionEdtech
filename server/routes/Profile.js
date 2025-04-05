const express = require("express");
const router = express.Router();
const {auth, IsInstructor} = require("../Middleware/auth");

const {updateProfile,deleteProfile,getUserDetailsData , getEnrolledCourse, updateDisplayPicture, instructorDashboard} = require('../Controllers/Profile')
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
router.get("/instructorDashboard", auth, IsInstructor, instructorDashboard)

module.exports = router