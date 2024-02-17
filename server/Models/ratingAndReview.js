const mongoose = require("mongoose");

const ratingAndReveiwSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  Rating: {
    type: String,
  },
  Review: {
    type: String,
    trim: true,
  },
  course: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Course",
		index: true,
	},
});

module.exports = mongoose.model("RatingAndReview",ratingAndReveiwSchema)
