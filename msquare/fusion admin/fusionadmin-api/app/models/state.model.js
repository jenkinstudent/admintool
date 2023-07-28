const mongoose = require("mongoose");

const State = mongoose.model(
  "State",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    }
  }, {
    timestamps: true
  })
);

module.exports = State;