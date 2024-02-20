const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");

const {deleteProfile,updateProfile,getUserDetailsData} = require("../Controllers/Profile")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", auth, deleteProfile);
router.put("/updateProfile",auth,updateProfile);
router.get("getUserDetails",auth,getUserDetailsData)

// TO do by 22feb
// router.get("/getEnrolledCourses", auth, getEnrolledCourses)
// router.put("/updateDisplayPicture", auth, updateDisplayPicture)

module.exports = router