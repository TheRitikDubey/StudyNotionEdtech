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
  }
});

module.exports = mongoose.model("RatingAndReview",ratingAndReveiwSchema)
