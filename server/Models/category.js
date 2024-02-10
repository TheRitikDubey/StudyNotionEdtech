const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  course: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  }],
  name: {
    type: String,
  },
  description: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
