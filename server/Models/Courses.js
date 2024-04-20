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
  instructor: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
  whatYouWillLearn: {
    type: String,
    required: true,
    trim: true,
  },
  courseContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],
  ratingReview: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingAndReview",
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  studentsEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  tag: {
    type: [String],
    require: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  instructions: {
    type: [String],
  },
  status: {
    type: String,
    enum: ["Draft", "Published"],
  },
});

module.exports = mongoose.model("Course", courseSchema);
