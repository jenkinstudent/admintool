const mongoose = require("mongoose");

const ApprovalLevels = mongoose.model(
  "ApprovalLevels",
  new mongoose.Schema({
    min: {
      type: Number,
      required: true,
    },
    max: {
        type: Number,
        required: true,
    }
  }, {
    timestamps: true
  })
);

module.exports = ApprovalLevels;