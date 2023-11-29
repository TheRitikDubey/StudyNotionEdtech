const mongoose = require("mongoose");

const tagsSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Tags", tagsSchema);
