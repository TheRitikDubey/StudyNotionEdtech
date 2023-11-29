const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    require: true,
  },
  courseDescription: {
    type: String,
    require: true,
  },
  courseInstructor: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  whatYouWillLearn: {
    type: Stirng,
    required: true,
    trim: true,
  },
  courseContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],
  ratingReveiew: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingAndReview",
    }
  ],
  price: {
    type: Number,
    required: true,
  },
  tag:{
    type: String,
    require: true,
  },
  thumbnail: {
    type: String,
  },
  studentsEnrolled: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
  ]

});

module.exports = mongoose.model("Course", courseSchema);
