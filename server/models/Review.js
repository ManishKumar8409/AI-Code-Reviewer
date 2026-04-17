const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId: String,
  code: String,
  language: String,
  result: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Review", reviewSchema);