const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
    trim: true,
  },
  lastName: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
  confirmPassword:{
    type: String,
    require: true,
    trim: true,
  },
  token:  {
    type: String
  },
  resetPasswordExpiry: {
    type: Date
  },
  accountType: {
    type: String,
    enum: ["Admin", "Student", "Instructor"],
    require: true,
  },
  additionalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Courses",
    },
  ],
  Image:{
    type: String,
  },
  courseProgress: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CourseProgress'
    }
  ]


});

module.exports = mongoose.model("User",userSchema)
