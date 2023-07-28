const mongoose = require("mongoose");

const Zone = mongoose.model(
  "Zone",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    }
  }, {
    timestamps: true
  })
);

module.exports = Zone;