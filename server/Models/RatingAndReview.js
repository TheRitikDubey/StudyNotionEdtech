const mongoose = require("mongoose");

const ratingAndReveiwSchema = new mongoose.Schema({
  User: {
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
  Course: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Course",
		index: true,
	},
});

module.exports = mongoose.model("RatingAndReview",ratingAndReveiwSchema)
