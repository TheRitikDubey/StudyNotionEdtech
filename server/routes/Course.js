const express = require("express");
const router = express.Router();
const {
  auth,
  IsStudent,
  IsInstructor,
  IsAdmin,
} = require("../Middleware/auth");
const {
  getAllCourse,
  CreateCourse,
  getCourse,
  getCourseDetails,
} = require("../Controllers/Course");
const {
  createCategory,
  showAllCategory,
  categoryPageDetails,
} = require("../Controllers/Category");
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../Controllers/Section");
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../Controllers/SubSection");
const {
  createRating,
  getAllRatingAndReview,
  getAverageRating,
  getRatingAndReviewForCourse,
} = require("../Controllers/RatingAndReview");

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, IsInstructor, CreateCourse)
//Add a Section to a Course
router.post("/addSection", auth, IsInstructor, createSection)
// Update a Section
router.post("/updateSection", auth, IsInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", auth, IsInstructor, deleteSection)
// Edit Sub Section
router.post("/updateSubSection", auth, IsInstructor, updateSubSection)
// Delete Sub Section
router.post("/deleteSubSection", auth, IsInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, IsInstructor, createSubSection)
// Get all Registered Courses
router.get("/getAllCourses", getAllCourse)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, IsAdmin, createCategory)
router.get("/showAllCategories", showAllCategory)
router.post("/getCategoryPageDetails", categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, IsStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRatingAndReview)

module.exports = router
